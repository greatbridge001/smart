require("dotenv").config();
const express = require("express");
const cors    = require("cors");

const paymentRoutes = require("./routes/payment");
const healthRoutes  = require("./routes/health");

const app  = express();
const PORT = process.env.PORT || 3000;

// CORS
const allowed = [
  process.env.FRONTEND_URL,
  "http://localhost:5500",
  "http://127.0.0.1:5500",
].filter(Boolean);

app.use(cors({
  origin: (origin, cb) => {
    if (!origin || allowed.includes(origin) || process.env.NODE_ENV !== "production") return cb(null, true);
    cb(new Error(`CORS: ${origin} not allowed`));
  },
  methods: ["GET","POST","OPTIONS"],
  allowedHeaders: ["Content-Type","Authorization"],
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Logger
app.use((req, _res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
});

// Routes
app.use("/", healthRoutes);
app.use("/", paymentRoutes);

app.get("/", (_req, res) => res.json({ message:"SmartFuture Career Hub API ✅", version:"1.0.0" }));

// 404
app.use((_req, res) => res.status(404).json({ success:false, message:"Not found." }));

// Error
app.use((err, _req, res, _next) => {
  console.error(err.message);
  res.status(500).json({ success:false, message:"Internal server error." });
});

app.listen(PORT, () => {
  console.log(`\n🚀 API running on port ${PORT}`);
  console.log(`   PayHero Channel: ${process.env.PAYHERO_CHANNEL_ID || "NOT SET ⚠️"}\n`);
});