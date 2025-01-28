const Bid = require('../models/bid');
const Task = require('../models/task');
const User = require('../models/user');

// Add new bid
exports.newBid = async (req, res, next) => {
    try {
        const { price, qualifications, offerDescription, taskId, user, deadline, proposedTimes, lessonDuration, lessonMode } = req.body;

        // Prvo, proveravamo da li je zadatak validan
        const task = await Task.findById(taskId);

        if (!task) {
            return res.status(404).json({
                success: false,
                message: 'Task not found'
            });
        }

        // Proveravamo da li su specifična polja postavljena na osnovu tipa zadatka
        const bidData = {
            price,
            qualifications,
            offerDescription,
            taskId,
            user,
            deadline: deadline || null, // Nullable
            proposedTimes: proposedTimes || [], // Nullable, empty array if not provided
            lessonDuration: lessonDuration || null, // Nullable
            lessonMode: lessonMode || null, // Nullable
        };

        // Create bid
        const bid = await Bid.create(bidData);

        res.status(201).json({
            success: true,
            bid
        });
    } catch (error) {
        next(error);
    }
};


// Get all bids
exports.getBids = async (req, res, next) => {
    try {
        const bids = await Bid.find();

        res.status(200).json({
            success: true,
            count: bids.length,
            bids
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Get single bid
exports.getSingleBid = async (req, res, next) => {
    try {
        const bid = await Bid.findById(req.params.id);

        if (!bid) {
            return res.status(404).json({
                success: false,
                message: 'Bid not found'
            });
        }

        res.status(200).json({
            success: true,
            bid
        });
    } catch (error) {
        next(error);
    }
};

// Update bid
exports.updateBid = async (req, res, next) => {
    try {
        const updatedData = {
            price: req.body.price,
            qualifications: req.body.qualifications,
            offerDescription: req.body.offerDescription
        };

        const updatedBid = await Bid.findByIdAndUpdate(req.params.id, updatedData, {
            new: true,
            runValidators: true
        });

        if (!updatedBid) {
            return res.status(404).json({
                success: false,
                message: 'Bid not found'
            });
        }

        res.status(200).json({
            success: true,
            bid: updatedBid
        });
    } catch (error) {
        next(error);
    }
};

// Delete bid
exports.deleteBid = async (req, res, next) => {
    try {
        const bid = await Bid.findById(req.params.id);

        if (!bid) {
            return res.status(404).json({
                success: false,
                message: 'Bid not found'
            });
        }

        await Bid.deleteOne({ _id: req.params.id });

        res.status(200).json({
            success: true,
            message: 'Bid deleted'
        });
    } catch (error) {
        next(error);
    }
};


// Get bids by task ID
exports.getBidsByTaskId = async (req, res, next) => {
    try {
        const taskId = req.params.taskId;

        const bids = await Bid.find({ taskId });

        if (bids.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'No bids found for this task'
            });
        }

        res.status(200).json({
            success: true,
            bids
        });
    } catch (error) {
        next(error);
    }
};

// Get bids by user ID
exports.getBidsByUserId = async (req, res, next) => {
    try {
        const userId = req.params.userId; 

        const bids = await Bid.find({ user: userId });

        if (bids.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'No bids found for this user'
            });
        }

        res.status(200).json({
            success: true,
            bids
        });
    } catch (error) {
        next(error);
    }
};



// Get tasks by user ID along with bid statuses
exports.getTasksByUserIdThroughBids = async (req, res, next) => {
    try {
        const userId = req.params.userId;

        const bids = await Bid.find({ user: userId });

        if (bids.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'No bids found for this user',
            });
        }

        const taskIds = bids.map((bid) => bid.taskId);

        if (taskIds.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'No taskIds found in bids for this user',
            });
        }

        const tasks = await Task.find({ _id: { $in: taskIds } });

        if (tasks.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'No tasks found for these bids',
            });
        }

        const tasksWithStatus = tasks.map((task) => {
            const relatedBid = bids.find((bid) => bid.taskId.toString() === task._id.toString());
            return {
                task,
                status: relatedBid?.status,
            };
        });

        res.status(200).json({
            success: true,
            tasks: tasksWithStatus,
        });
    } catch (error) {
        next(error);
    }
};



// Funkcija za formatiranje datuma u obliku "Dan, Mesec Godina"
const formatDate = (date) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' }; // Samo dan, mesec i godina
    return new Date(date).toLocaleDateString('sr-RS', options); // 'sr-RS' za srpski jezik
};

exports.getUsersByTaskId = async (req, res, next) => {
    try {
        const taskId = req.params.taskId;

        // Pronađi sve licitacije za dati zadatak
        const bids = await Bid.find({ taskId });

        if (bids.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'No bids found for this task',
            });
        }

        // Prikupljanje korisničkih ID-ova iz licitacija
        const userIds = bids.map(bid => bid.user);

        // Pronađi korisnike čiji su ID-ovi u licitacijama
        const users = await User.find({ _id: { $in: userIds } });

        if (users.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'No users found for these bids',
            });
        }

        // Kombinuj korisnike sa njihovim bidovima u jedan objekat
        const combinedData = users.map(user => {
            const bid = bids.find(bidItem => bidItem.user.toString() === user._id.toString());

            return {
                _id: bid._id,
                user: user._id,
                selectedImage: user.selectedImage.url,
                name: `${user.name} ${user.lastname}`,
                city: user.city,
                role: user.role,
                email: user.email,
                bidPrice: bid.price, 
                offerDescription: bid.offerDescription, 
                qualifications: bid.qualifications, 
                status: bid.status, 
                taskId: bid.taskId,
                createdAtBid: formatDate(bid.createdAt), // Formatiraj datum
                deadline: bid.deadline ? formatDate(bid.deadline) : null, // Formatiraj deadline ako postoji
                proposedTimes: bid.proposedTimes?.length ? bid.proposedTimes : [], 
                lessonDuration: bid.lessonDuration ?? null, 
                lessonMode: bid.lessonMode ?? null, 
                createdAtUser: formatDate(user.createdAt) // Formatiraj datum kada je korisnik kreiran
            };
        });

        res.status(200).json({
            success: true,
            count: combinedData.length,
            data: combinedData
        });
    } catch (error) {
        next(error);
    }
};



// Update bid status (accept/reject)
exports.updateBidStatus = async (req, res, next) => {
    try {
        const bidId = req.params.id;
        const { status } = req.body;  // status može biti 'accepted' ili 'rejected'

        if (status !== 'prihvaćeno' && status !== 'odbijeno') {
            return res.status(400).json({
                success: false,
                message: 'Invalid status. Use "accepted" or "rejected".'
            });
        }

        const updatedBid = await Bid.findByIdAndUpdate(
            bidId,
            { status },
            { new: true, runValidators: true }
        );

        if (!updatedBid) {
            return res.status(404).json({
                success: false,
                message: 'Bid not found'
            });
        }

        res.status(200).json({
            success: true,
            bid: updatedBid
        });
    } catch (error) {
        next(error);
    }
};


// Proveri da li je ulogovani korisnik ostavio bid za dati task
exports.hasUserBidForTask = async (req, res, next) => {
    try {
        const userId = req.params.userId;  
        const taskId = req.params.taskId;

        // Proveri da li postoji bid sa datim userId i taskId
        const bid = await Bid.findOne({ user: userId, taskId });

        if (bid) {
            return res.status(200).json({
                success: true,
                hasBid: true
            });
        } else {
            return res.status(200).json({
                success: true,
                hasBid: false
            });
        }
    } catch (error) {
        next(error);
    }
};
