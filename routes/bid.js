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
    updateBidStatus,
    hasUserBidForTask,
    getBidByUserAndTask
} = require('../controllers/bidController');

router.route('/bids').get(getBids);
router.route('/bid/new').post(newBid);
router.route('/bid/:id').get(getSingleBid);
router.route('/bid/update/:id').put(updateBid);
router.route('/bid/delete/:id').delete(deleteBid);
router.route('/bids/task/:taskId').get(getBidsByTaskId);
router.route('/bids/user/:userId').get(getBidsByUserId);
router.route('/bids2/user/:userId').get(getTasksByUserIdThroughBids);

router.route('/bids/task/:taskId/users').get(getUsersByTaskId);

router.route('/bids/:id/status').put(updateBidStatus);
router.route('/bids/task/:taskId/:userId/hasUserBid').get(hasUserBidForTask);

router.route('/bid/task/:taskId/user/:userId').get(getBidByUserAndTask);


module.exports = router;
