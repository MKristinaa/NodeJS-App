const Bid = require('../models/bid');

// Add new bid
exports.newBid = async (req, res, next) => {
    try {
        const { price, qualifications, offerDescription, taskId, user } = req.body;

        const bid = await Bid.create({
            price,
            qualifications,
            offerDescription,
            taskId,
            user
        });

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

        // Koristimo deleteOne() umesto remove()
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
        const userId = req.params.userId; // Dobijamo korisnički ID iz parametara

        // Pretražujemo bidove koji odgovaraju korisničkom ID-u
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

