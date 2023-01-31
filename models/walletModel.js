const mongoose = require('mongoose');
const { Schema } = mongoose;

const walletSchema = new Schema({
		publicKey:  String,
		privateKey: String,
		addressHex: String,
		addressBase58: String,
});

const Wallet = mongoose.model('Wallet', walletSchema);

module.exports = Wallet;