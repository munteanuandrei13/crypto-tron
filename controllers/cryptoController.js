const Wallet = require('../models/walletModel');
const TronWeb = require('tronweb');
const { response } = require('express')

const fullNode = 'https://api.shasta.trongrid.io';
const solidityNode = 'https://api.shasta.trongrid.io';
const eventServer = 'https://api.shasta.trongrid.io';

exports.getContract = async(req, res, next) => {
		const tronWeb = new TronWeb(fullNode, solidityNode, eventServer);

		let abi = [{"entrys":[{"name":"incrementCount","stateMutability":"nonpayable","type":"function"},{"outputs":[{"type":"uint256"}],"name":"count","stateMutability":"view","type":"function"}]}]

		let response = await tronWeb.contract(abi, "TVEZvm3LhximKrqyTKFPsSGt1pChXxCQSs");

		res.status(200).json({
				status: 'success',
				data: response
		});
}

exports.getCount = async(req, res, next) => {
		const tronWeb = new TronWeb(fullNode,solidityNode,eventServer, "89E36BAD2A7F2CA27DE6AD664D9E110420DEFA4AD0BC827D97F4C528F3D25D12");

		let contract = await tronWeb.contract().at('TVEZvm3LhximKrqyTKFPsSGt1pChXxCQSs');

		contract["count"]().call().then(response => {
				res.status(200).json({
						status: 'success',
						data: {response, countToDecimal: tronWeb.toDecimal(response._hex)}
				});
		}).catch(err => {
				console.log(err)
				res.status(200).json({
						status: 'failure',
						data: err
				});
		})
}

exports.incrementCount = async(req, res, next) => {
		const tronWeb = new TronWeb(fullNode,solidityNode,eventServer, "89E36BAD2A7F2CA27DE6AD664D9E110420DEFA4AD0BC827D97F4C528F3D25D12");

		let contract = await tronWeb.contract().at('TVEZvm3LhximKrqyTKFPsSGt1pChXxCQSs');
		contract.incrementCount().send({
				feeLimit: 100_000_000,
				callValue: 0,
		}).then(response => {
				res.status(200).json({
						status: 'success',
						data: response
				});
		}).catch(err => {
				res.status(200).json({
						status: 'failure',
						data: err
				});
		})
}

exports.getAccount = async(req, res, next) => {
		let wallet = await Wallet.findOne({});

		const tronWeb = new TronWeb(fullNode,solidityNode,eventServer);

		tronWeb.trx.getAccount(wallet.addressBase58).then(response => {
				res.status(200).json({
						status: 'success',
						data: response
				});
		}).catch(err => {
				res.status(200).json({
						status: 'failure',
						data: err
				});
		})

		return;
}

exports.getWallet = async(req, res, next) => {
		let wallet = await Wallet.findOne({publicKey: req.publicKey}).limit(1);

		if (!wallet) {
				return res.status(404).json({
						status: 'failure', data: {
								message: "No wallets in DB. Please generate one using /api/generate-wallet"
						}
				});
		}

		res.status(200).json({
				status: 'success', data: {
						wallet
				}
		});
}

exports.generateWallet = async(req, res, next) => {
		let generatedWallet = TronWeb.utils.accounts.generateAccount();

		const newWallet = await Wallet.create({
				publicKey: generatedWallet.publicKey,
				privateKey: generatedWallet.privateKey,
				addressHex: generatedWallet.address.hex,
				addressBase58: generatedWallet.address.base58
		});

		res.status(200).json({
				status: 'success', data: {
						newWallet
				}
		});
}