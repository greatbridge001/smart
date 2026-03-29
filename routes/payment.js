const express = require("express");
const router  = express.Router();
const { initiateSTKPush, paymentCallback, checkPaymentStatus } = require("../controllers/paymentController");

router.post("/stk-push",          initiateSTKPush);
router.post("/payment-callback",  paymentCallback);
router.get("/payment-status/:ref",checkPaymentStatus);

module.exports = router;