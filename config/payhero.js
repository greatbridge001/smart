require("dotenv").config();

const payheroConfig = {
  username:  process.env.PAYHERO_USERNAME,
  password:  process.env.PAYHERO_PASSWORD,
  channelId: process.env.PAYHERO_CHANNEL_ID,
  baseUrl:   "https://backend.payhero.co.ke/api/v2",

  getAuthHeader() {
    const token = Buffer.from(`${this.username}:${this.password}`).toString("base64");
    return `Basic ${token}`;
  },
};

module.exports = payheroConfig;