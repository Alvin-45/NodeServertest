const users = require('../Model/userModel')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const JWT_SECRET='supersecretkey12345';
exports.register = async (req, res) => {
    console.log("Inside Register Function");
    const { firstName,lastName, email, password,phone } = req.body
    console.log(firstName,lastName, email, password,phone);
    try {
        const existingUser = await users.findOne({ email });
        if (existingUser) {
            res.status(406).json("User Already exist!!!")
        } else {
            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = new users({
                firstName,
                lastName,
                email,
                password: hashedPassword,
                phone
            })
            await newUser.save();
            const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET)
            res.status(200).json({token})
            
        }

    } catch (err) {
        res.status(401).json(err)
    }
}
exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await users.findOne({ email });
      if (!user) {
         res.status(400).json({ message: 'Invalid email or password' });
      }
  
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
         res.status(400).json({ message: 'Invalid email or password' });
      }
  
      const token = jwt.sign({ userId: user._id },JWT_SECRET, { expiresIn: '1h' });
      console.log(`token=${token}`);
      res.json({ token });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  
  exports.listUsers = async (req, res) => {
    try {
      const user = await users.find({}, '-password');
      res.json(user);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  
  exports.getUserDetails = async (req, res) => {
    try {
      const user = await users.findById(req.params.id, '-password');
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json(user);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };