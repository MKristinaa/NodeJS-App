const express = require('express');
const router = express.Router();


const { 
    getBids, 
    newBid, 
    getSingleBid, 
    updateBid, 
    deleteBid, 
    getBidsByTaskId, 
    getBidsByUserId
} = require('../controllers/bidController');

router.route('/bids').get(getBids);
router.route('/bid/new').post(newBid);
router.route('/bid/:id').get(getSingleBid);
router.route('/bid/update/:id').put(updateBid);
router.route('/bid/delete/:id').delete(deleteBid);
router.route('/bids/task/:taskId').get(getBidsByTaskId);
router.route('/bids/user/:userId').get(getBidsByUserId);


module.exports = router;
