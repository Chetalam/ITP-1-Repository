// ======= Dependencies =======
require('dotenv').config();

console.log('✅ Loaded environment variables:');
console.log('DB_USER:', process.env.DB_USER);
console.log('DB_PASSWORD:', process.env.DB_PASSWORD);
console.log('DB_HOST:', process.env.DB_HOST);
console.log('DB_NAME:', process.env.DB_NAME);
console.log('DB_PORT:', process.env.DB_PORT);

const express = require('express');
const { Sequelize, DataTypes } = require('sequelize');
const cors = require('cors');
const multer = require('multer');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// ======= Middleware =======
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ======= Database Connection =======
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD || '', // Ensure it's not undefined
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT, // Keep port support
    dialect: 'mysql',
    logging: false
  }
);

// ======= Models =======
const User = sequelize.define('User', {
  name: DataTypes.STRING,
  email: { type: DataTypes.STRING, unique: true },
  password: DataTypes.STRING,
  role: { type: DataTypes.ENUM('user', 'admin'), defaultValue: 'user' }
});

const Opportunity = sequelize.define('Opportunity', {
  title: DataTypes.STRING,
  description: DataTypes.TEXT,
  category: DataTypes.STRING,
  fileUrl: DataTypes.STRING
});

// ======= File Upload =======
const upload = multer({ dest: 'uploads/' });

// ======= Auth Middleware =======
const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: 'No token provided' });
  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch {
    res.status(403).json({ error: 'Invalid token' });
  }
};

// ======= Sample Routes =======
app.get('/api/test', (req, res) => {
  res.json({ message: 'API is working' });
});

app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello from the backend!' });
});

app.get('/api/message', (req, res) => {
  res.json({ message: 'Message from /api/message endpoint' });
});

// ======= Auth Routes =======

// Registration
app.post('/api/auth/register', async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashed });
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: 'Email already exists' });
  }
});

// Login
app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ where: { email } });
  if (!user) return res.status(404).json({ error: 'User not found' });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });

  const token = jwt.sign(
    { userId: user.id, role: user.role },
    process.env.JWT_SECRET
  );
  res.json({ token });
});

// ======= Opportunities Routes =======

// Get All Opportunities
app.get('/api/opportunities', async (req, res) => {
  const opportunities = await Opportunity.findAll();
  res.json(opportunities);
});

// Create Opportunity (Protected)
app.post('/api/opportunities', authMiddleware, upload.single('file'), async (req, res) => {
  const { title, description, category } = req.body;
  const fileUrl = req.file ? `/uploads/${req.file.filename}` : '';
  const opportunity = await Opportunity.create({ title, description, category, fileUrl });
  res.status(201).json(opportunity);
});

// ======= Start Server =======
sequelize.sync().then(() => {
  console.log('✅ Database synchronized');
  app.listen(PORT, () => {
    console.log(`✅ Server is running on http://localhost:${PORT}`);
  });
});
