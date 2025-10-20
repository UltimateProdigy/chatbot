require("dotenv").config();

const express = require("express");
const axios = require("axios");
const router = express.Router();

router.post("/paystack/charge", async (req, res) => {
  const { amount, email } = req.body;
  const secretKey = process.env.PAYSTACK_SECRET_KEY;

  try {
    const response = await axios.post(
      "https://api.paystack.co/transaction/initialize",
      {
        email,
        amount,
      },
      {
        headers: {
          Authorization: `Bearer ${secretKey}`,
          "Content-Type": "application/json",
        },
      }
    );

    res.json(response.data);
  } catch (error) {
    console.error(
      "Error initializing payment:",
      error.response ? error.response.data : error.message
    );
    res.status(500).json({ error: "Payment initialization failed." });
  }
});

module.exports = router;
