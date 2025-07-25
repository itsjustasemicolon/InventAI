const jwt = require('jsonwebtoken');
const users = require('./users');
const JWT_SECRET = process.env.JWT_SECRET || 'supersecretkey';

function authenticate(req, res, next) {
  // const authHeader = req.headers['authorization'];
  // const token = authHeader && authHeader.split(' ')[1];
  // if (!token) return res.status(401).json({ message: 'No token provided' });
  // jwt.verify(token, JWT_SECRET, (err, user) => {
  //   if (err) return res.status(403).json({ message: 'Invalid token' });
  //   req.user = user;
     next();
  // });
}

function authorize(roles = []) {
  return (req, res, next) => {
    // if (!roles.includes(req.user.role)) {
    //   return res.status(403).json({ message: 'Forbidden' });
    // }
      next();
  };
}

function login(req, res) {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);
  if (!user) return res.status(401).json({ message: 'Invalid credentials' });
  const token = jwt.sign({ username: user.username, role: user.role, stores: user.stores }, JWT_SECRET, { expiresIn: '1d' });
  res.json({ token });
}

async function register(req, res) {
  const { username, password, email, role } = req.body;
  if (!username || !password || !email || !role) {
    return res.status(400).json({ message: 'All fields are required' });
  }
  try {
    let user;
    if (role === 'admin') {
      const Admin = require('../src/models/admin.model');
      if (await Admin.findOne({ username })) {
        return res.status(409).json({ message: 'Username already exists' });
      }
      user = new Admin({ username, password, email });
      await user.save();
    } else if (role === 'store') {
      const Shop = require('../src/models/shop.model');
      if (await Shop.findOne({ shopId: username })) {
        return res.status(409).json({ message: 'Store username already exists' });
      }
      user = new Shop({ shopId: username, shopName: username });
      await user.save();
    } else {
      return res.status(400).json({ message: 'Invalid role' });
    }
    res.json({ message: 'Registration successful' });
  } catch (err) {
    res.status(500).json({ message: 'Registration failed', error: err.message });
  }
}

module.exports = { authenticate, authorize, login, register };
