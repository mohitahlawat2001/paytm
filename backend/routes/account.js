const {Router} = require('express');
const router = Router();
const { Account } = require("../db");
const authMiddleware = require('../middleware');
const mongoose = require('mongoose');

router.get("/balance", authMiddleware, async (req, res) => {
    try {
        const account = await Account.findOne({ userId: req.headers.userId });
        // console.log(account);
        res.json({
            balance: account.balance
        });
    } catch (error) {
        res.status(500).json({
            msg: error.message
        });
    }
});

router.post("/transfer", authMiddleware, async (req, res) => {
    try {
    const { amount, to } = req.body;

    const session = await mongoose.startSession();
    session.startTransaction();
    const balanceBeforeTransfer = await Account.findOne({ userId: req.headers.userId });
    const balanceBeforeTransferTo = await Account.findOne({ userId: to });

    const account = await Account.findOne({ userId: req.headers.userId }).session(session);

    if (!account || account.balance < amount) {
        await session.abortTransaction();
        return res.status(400).json({
            msg: "Insufficient balance"
        });
    }

    const toAccount = await Account.findOne({ userId: to }).session(session);

    if (!toAccount) {
        await session.abortTransaction();
        return res.status(400).json({
            msg: "Account does not exist"
        });
    }

    await Account.updateOne({ userId: req.headers.userId }, { $inc: { balance: -amount } }).session(session);
    await Account.updateOne({ userId: to }, { $inc: { balance: amount } }).session(session);

    await session.commitTransaction();
    session.endSession();

    const balanceAfterTransfer = await Account.findOne({ userId: req.headers.userId });
    const balanceAfterTransferTo = await Account.findOne({ userId: to });


    res.json({
        msg: "Transfer success",
        balanceLeft: balanceAfterTransfer.balance,
        balanceBeforeTransfer: balanceBeforeTransfer.balance,
        balanceAfterTransfer: balanceAfterTransfer.balance,
        balanceBeforeTransferTo: balanceBeforeTransferTo.balance,
        balanceAfterTransferTo: balanceAfterTransferTo.balance

    });
    } catch (error) {
        res.status(500).json({
            msg: error.message
        });
    }
});



module.exports = router;