const express = require("express");
const { userAuth } = require("../middlewares/auth");
const paymentRouter = express.Router();
const Payment = require("../models/payment");
const User = require("../models/user");

// 🚨 Razorpay is disabled temporarily
// const razorpayInstance = require("../utils/razorpay");
// const { membershipAmount } = require("../utils/constants");
// const { validateWebhookSignature } = require("razorpay/dist/utils/razorpay-utils");

// -------------------------------------------
//  PAYMENT DISABLED: CREATE ORDER
// -------------------------------------------
paymentRouter.post("/payment/create", userAuth, async (req, res) => {
  try {
    return res.status(200).json({
      msg: "Payment system is disabled temporarily",
      isPaymentEnabled: false,
    });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
});

// -------------------------------------------
//  PAYMENT DISABLED: WEBHOOK
// -------------------------------------------
paymentRouter.post("/payment/webhook", async (req, res) => {
  try {
    return res.status(200).json({
      msg: "Webhook disabled",
      isPaymentEnabled: false,
    });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
});

// -------------------------------------------
//  VERIFY PREMIUM (kept working)
// -------------------------------------------
paymentRouter.get("/premium/verify", userAuth, async (req, res) => {
  const user = req.user.toJSON();

  return res.json({ ...user, isPaymentEnabled: false });
});

module.exports = paymentRouter;
