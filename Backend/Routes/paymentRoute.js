const express = require("express");
const { initiatePayment, AddOrder, getOrder } = require("../Controller/PaymentController");


const router = express.Router(); 

router.post("/khalti", initiatePayment);
router.post("/Add-Order", AddOrder);
router.get("/get-Order", getOrder);


module.exports = router;
 