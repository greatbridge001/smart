const axios         = require("axios");
const payheroConfig = require("../config/payhero");

function validatePhone(phone) {
  return /^254[17]\d{8}$/.test(String(phone).trim());
}

async function initiateSTKPush(req, res) {
  try {
    const { phone, amount } = req.body;

    if (!phone || !amount)      return res.status(400).json({ success:false, message:"Phone and amount required." });
    if (!validatePhone(phone))  return res.status(400).json({ success:false, message:"Invalid phone. Use 2547XXXXXXXX format." });

    const amt = Number(amount);
    if (isNaN(amt) || amt < 1) return res.status(400).json({ success:false, message:"Amount must be a positive number." });

    if (!payheroConfig.username || !payheroConfig.password || !payheroConfig.channelId) {
      console.error("PayHero credentials missing.");
      return res.status(500).json({ success:false, message:"Payment service not configured." });
    }

    const payload = {
      amount:             amt,
      phone_number:       phone,
      channel_id:         Number(payheroConfig.channelId),
      provider:           "m-pesa",
      external_reference: `SF-${Date.now()}`,
      // ════════════════════════════════════════════════════
      // ⚠️  This uses RENDER_BACKEND_URL from your .env
      //     Make sure it matches your actual Render URL
      // ════════════════════════════════════════════════════
      callback_url: `${process.env.RENDER_BACKEND_URL}/payment-callback`,
    };

    console.log(`[PayHero] STK Push → ${phone} KES ${amt}`);

    const response = await axios.post(
      `${payheroConfig.baseUrl}/payments`,
      payload,
      {
        headers: {
          Authorization:  payheroConfig.getAuthHeader(),
          "Content-Type": "application/json",
        },
        timeout: 30000,
      }
    );

    console.log("[PayHero] Response:", response.data);

    return res.status(200).json({
      success: true,
      message: "STK Push sent. Please enter your M-Pesa PIN.",
      data:    response.data,
    });

  } catch (err) {
    console.error("[PayHero] Error:", err?.response?.data || err.message);
    return res.status(err?.response?.status || 500).json({
      success: false,
      message: err?.response?.data?.message || "Payment request failed. Try again.",
    });
  }
}

async function paymentCallback(req, res) {
  try {
    console.log("[PayHero] Callback:", JSON.stringify(req.body, null, 2));
    res.status(200).json({ status:"received" });
  } catch (err) {
    console.error("[PayHero] Callback error:", err.message);
    res.status(500).json({ status:"error" });
  }
}

async function checkPaymentStatus(req, res) {
  try {
    const { ref } = req.params;
    const response = await axios.get(
      `${payheroConfig.baseUrl}/payments/${ref}`,
      { headers: { Authorization: payheroConfig.getAuthHeader() }, timeout:15000 }
    );
    return res.status(200).json({ success:true, data: response.data });
  } catch (err) {
    return res.status(err?.response?.status||500).json({ success:false, message:"Could not check status." });
  }
}

module.exports = { initiateSTKPush, paymentCallback, checkPaymentStatus };
```

---

## 🔑 WHERE TO PUT YOUR CREDENTIALS

Here is every place you must update — nothing else needs to change:

**1. `backend/.env` — your PayHero credentials (3 values)**
```
PAYHERO_USERNAME=    ← your PayHero username
PAYHERO_PASSWORD=    ← your PayHero password
PAYHERO_CHANNEL_ID=  ← your PayHero channel ID
RENDER_BACKEND_URL=  ← e.g. https://smartfuture-api.onrender.com
FRONTEND_URL=        ← e.g. https://smartfuture.netlify.app