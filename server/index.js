// ======= Dependencies =======
require('dotenv').config();

console.log('✅ Loaded environment variables:');
console.log('DB_USER:', process.env.DB_USER);
console.log('DB_PASSWORD:', process.env.DB_PASSWORD ? '(hidden)' : 'NOT SET');
console.log('DB_NAME:', process.env.DB_NAME);
console.log('DB_HOST:', process.env.DB_HOST);

const express = require('express');
const { Sequelize, DataTypes } = require('sequelize');
const mysql = require('mysql2/promise');
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

// ======= Sequelize (General DB) =======
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD || null,
  {
    host: process.env.DB_HOST,
    dialect: 'mysql',
  }
);

// ======= MySQL2 (Mentor/Mentee/Trainer Logic) =======
const mysqlDb = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// ======= Sequelize Models =======
const User = sequelize.define('User', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  phone: {
    type: DataTypes.STRING,
  },
}, {
  timestamps: false,
});

const Opportunity = sequelize.define('Opportunity', {
  title: DataTypes.STRING,
  description: DataTypes.TEXT,
  category: DataTypes.STRING,
  fileUrl: DataTypes.STRING,
});

// ======= File Upload =======
const upload = multer({ dest: 'uploads/' });

// ======= JWT Auth Middleware =======
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

// ======= Root Test Route =======
app.get('/', (req, res) => {
  res.send('API is working');
});

// ======= Status Route =======
app.get('/api/status', (req, res) => {
  res.json({ status: 'ok' });
});

// ======= Test Routes =======
app.get('/api/test', (req, res) => res.json({ message: 'API is working' }));
app.get('/api/hello', (req, res) => res.json({ message: 'Hello from the backend!' }));

// Lightweight register test
app.post('/api/register-test', (req, res) => {
  const { email, password } = req.body;
  res.json({
    message: 'User register-test endpoint hit successfully',
    email,
  });
});

// ======= User Register Route =======
app.post('/api/register', async (req, res) => {
  const { name, email, phone } = req.body;

  try {
    const existingUser = await User.findOne({ where: { email } });

    if (existingUser) {
      return res.status(200).json({
        message: 'User already registered. Logging you in.',
        alreadyRegistered: true,
        userId: existingUser.id,
        name: existingUser.name,
        email: existingUser.email,
        phone: existingUser.phone,
      });
    }

    const newUser = await User.create({ name, email, phone });

    res.status(201).json({
      message: 'User registered successfully.',
      userId: newUser.id,
      name: newUser.name,
      email: newUser.email,
      phone: newUser.phone,
    });
  } catch (error) {
    console.error('❌ Error registering user:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// ======= Auth Routes (Users) =======
app.post('/api/auth/register', async (req, res) => {
  const { email } = req.body;
  try {
    await User.create({ email });
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: 'Email already exists' });
  }
});

app.post('/api/auth/login', async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ where: { email } });
  if (!user) return res.status(404).json({ error: 'User not found' });

  res.json({ message: 'Login successful', userId: user.id });
});

// ======= Opportunities =======
app.get('/api/opportunities', async (req, res) => {
  const opportunities = await Opportunity.findAll();
  res.json(opportunities);
});

app.post('/api/opportunities', authMiddleware, upload.single('file'), async (req, res) => {
  const { title, description, category } = req.body;
  const fileUrl = req.file ? `/uploads/${req.file.filename}` : '';
  const opportunity = await Opportunity.create({ title, description, category, fileUrl });
  res.status(201).json(opportunity);
});

// ======= Mentor Routes =======
app.post('/api/mentor/register', async (req, res) => {
  const { name, email, password } = req.body;
  const hashed = await bcrypt.hash(password, 10);
  await mysqlDb.query(
    'INSERT INTO mentor_signing (name, email, password) VALUES (?, ?, ?)',
    [name, email, hashed]
  );
  res.json({ message: 'Mentor registered successfully' });
});

app.post('/api/mentor/login', async (req, res) => {
  const { email, password } = req.body;
  const [rows] = await mysqlDb.query('SELECT * FROM mentor_signing WHERE email = ?', [email]);
  if (rows.length === 0) return res.status(401).json({ error: 'Invalid credentials' });

  const mentor = rows[0];
  const isMatch = await bcrypt.compare(password, mentor.password);
  if (!isMatch) return res.status(401).json({ error: 'Invalid credentials' });

  res.json({ mentorId: mentor.id, name: mentor.name });
});

app.get('/api/mentors', async (req, res) => {
  const [mentors] = await mysqlDb.query('SELECT id, name, email FROM mentor_signing');
  res.json(mentors);
});

app.get('/api/mentor/:id/dashboard', async (req, res) => {
  const mentorId = req.params.id;
  const [mentees] = await mysqlDb.query('SELECT * FROM user_mentee WHERE mentor_id = ?', [mentorId]);
  res.json({ menteeCount: mentees.length, mentees });
});

// ======= Mentee Routes =======
app.post('/api/mentee/register', async (req, res) => {
  const { name, email, password } = req.body;
  const hashed = await bcrypt.hash(password, 10);
  await mysqlDb.query(
    'INSERT INTO user_mentee (name, email, password) VALUES (?, ?, ?)',
    [name, email, hashed]
  );
  res.json({ message: 'Mentee registered successfully' });
});

app.post('/api/mentee/login', async (req, res) => {
  const { email, password } = req.body;
  const [rows] = await mysqlDb.query('SELECT * FROM user_mentee WHERE email = ?', [email]);
  if (rows.length === 0) return res.status(401).json({ error: 'Invalid credentials' });

  const mentee = rows[0];
  const isMatch = await bcrypt.compare(password, mentee.password);
  if (!isMatch) return res.status(401).json({ error: 'Invalid credentials' });

  res.json({ menteeId: mentee.id, name: mentee.name });
});

app.post('/api/mentee/:id/apply', async (req, res) => {
  const menteeId = req.params.id;
  const { mentorId } = req.body;
  await mysqlDb.query('UPDATE user_mentee SET mentor_id = ? WHERE id = ?', [mentorId, menteeId]);
  res.json({ message: 'Applied to mentor successfully' });
});

// ======= Trainer Routes =======
app.post('/api/trainer/register', async (req, res) => {
  const { name, email, password } = req.body;
  const hashed = await bcrypt.hash(password, 10);
  const [existing] = await mysqlDb.query('SELECT id FROM trainers WHERE email = ?', [email]);
  if (existing.length) return res.status(400).json({ error: 'Email already registered' });

  await mysqlDb.query(
    'INSERT INTO trainers (name, email, password_hash) VALUES (?, ?, ?)',
    [name, email, hashed]
  );
  res.json({ message: 'Trainer registered successfully' });
});

app.post('/api/trainer/login', async (req, res) => {
  const { email, password } = req.body;
  const [rows] = await mysqlDb.query('SELECT * FROM trainers WHERE email = ?', [email]);
  if (!rows.length) return res.status(401).json({ error: 'Invalid email or password' });

  const trainer = rows[0];
  const valid = await bcrypt.compare(password, trainer.password_hash);
  if (!valid) return res.status(401).json({ error: 'Invalid email or password' });

  res.json({ trainerId: trainer.id, name: trainer.name });
});

app.get('/api/trainers', async (req, res) => {
  const [trainers] = await mysqlDb.query('SELECT id, name FROM trainers ORDER BY name ASC');
  res.json(trainers);
});

app.post('/api/trainee/:traineeId/apply', async (req, res) => {
  const { trainerId } = req.body;
  const traineeId = req.params.traineeId;

  const [trainerRows] = await mysqlDb.query('SELECT id FROM trainers WHERE id = ?', [trainerId]);
  if (!trainerRows.length) return res.status(400).json({ error: 'Trainer not found' });

  const [existingRows] = await mysqlDb.query(
    'SELECT id FROM applications WHERE trainee_id = ? AND trainer_id = ?',
    [traineeId, trainerId]
  );
  if (existingRows.length) return res.status(400).json({ error: 'You have already applied to this trainer' });

  await mysqlDb.query(
    'INSERT INTO applications (trainee_id, trainer_id) VALUES (?, ?)',
    [traineeId, trainerId]
  );
  res.json({ message: 'Application submitted' });
});

// ======= Donor Routes =======
app.post('/api/donor/register', (req, res) => {
  const { name, email, password } = req.body;
  console.log('Donor register:', name, email);
  res.json({ message: 'Donor registered successfully', donorId: 1 });
});

app.post('/api/donor/login', (req, res) => {
  const { email, password } = req.body;
  console.log('Donor login:', email);
  res.json({ message: 'Donor login successful', donorId: 1 });
});

app.get('/api/donor', (req, res) => {
  res.json([{ id: 1, name: 'Donor A' }, { id: 2, name: 'Donor B' }]);
});

// ======= Scholar Routes =======
app.post('/api/scholar/register', (req, res) => {
  const { name, email, password } = req.body;
  console.log('Scholar register:', name, email);
  res.json({ message: 'Scholar registered successfully', scholarId: 1 });
});

app.post('/api/scholar/login', (req, res) => {
  const { email, password } = req.body;
  console.log('Scholar login:', email);
  res.json({ message: 'Scholar login successful', scholarId: 1 });
});

app.post('/api/scholar/:scholarId/apply', (req, res) => {
  const { scholarId } = req.params;
  const { donorId } = req.body;
  console.log(`Scholar ${scholarId} applying to donor ${donorId}`);
  res.json({ message: `Scholar ${scholarId} applied to donor ${donorId}` });
});

// ======= Start Server =======
sequelize.sync().then(() => {
  console.log('✅ Sequelize DB synced');
  app.listen(PORT, () => {
    console.log(`✅ Server is running on http://localhost:${PORT}`);
  });
});
