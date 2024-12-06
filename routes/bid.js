const express = require('express');
const router = express.Router();

const { 
    getBids, 
    newBid, 
    getSingleBid, 
    updateBid, 
    deleteBid, 
    getBidsByTaskId, 
    getBidsByUserId,
    getTasksByUserIdThroughBids,
    getUsersByTaskId,
    updateBidStatus
} = require('../controllers/bidController');

router.route('/bids').get(getBids);
router.route('/bid/new').post(newBid);
router.route('/bid/:id').get(getSingleBid);
router.route('/bid/update/:id').put(updateBid);
router.route('/bid/delete/:id').delete(deleteBid);
router.route('/bids/task/:taskId').get(getBidsByTaskId);
router.route('/bids/user/:userId').get(getBidsByUserId);
router.route('/bids2/user/:userId').get(getTasksByUserIdThroughBids);

// Dodavanje nove rute
router.route('/bids/task/:taskId/users').get(getUsersByTaskId);

// Ruta za update statusa bid-a
router.route('/bids/:id/status').put(updateBidStatus);


module.exports = router;
