const express = require('express');
const router = express.Router();
const cryptoController = require('../controllers/cryptoController');

router.route('/generate-wallet').get(cryptoController.generateWallet);
router.route('/get-wallet').get(cryptoController.getWallet);
router.route('/get-account').get(cryptoController.getAccount);

router.route('/contract/get-contract').get(cryptoController.getContract);
router.route('/contract/get-count').get(cryptoController.getCount);
router.route('/contract/increment-count').get(cryptoController.incrementCount);

module.exports = router;