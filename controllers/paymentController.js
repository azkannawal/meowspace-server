const midtransClient = require('midtrans-client');
require('dotenv').config();

exports.createTransaction = async (req, res) => {
  try {
    const { orderId, grossAmount, fullName, email } = req.body;

    const snap = new midtransClient.Snap({
      isProduction: false,
      serverKey: process.env.MIDTRANS_SERVER_KEY,
    });

    const parameter = {
      transaction_details: {
        order_id: orderId,
        gross_amount: grossAmount,
      },
      customer_details: {
        first_name: fullName,
        email,
      },
      callbacks: {
        finish: "https://example.com/finish-success"
      }
    };

    const transaction = await snap.createTransaction(parameter);
    res.status(201).json({ snapToken: transaction.token });
  } catch (err) {
    res.status(500).json({ message: 'Gagal membuat transaksi', error: err.message });
  }
};
