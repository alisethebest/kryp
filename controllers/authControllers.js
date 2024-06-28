
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userModal = require("../model/user");
const multer = require("multer");
const {generateToken} = require('../utils/index')
const upload = multer({ dest: "public/profile/" });


const signUp = async (req, res) => {
  const { firstName, lastName, email, password, confirmPassword } = req.body;
  try {
    const existingUser = await userModal.findOne({ email: email });
    let status = 200
    let message = ''
    let token = null
    if (existingUser) {
      message = "User already exists"
      status = 400
      // return res.status(400).json({
      //   message: "User already exists",
      //   status: 400
      // });
    }
    else if(confirmPassword !== password)
    {
      message = "Password and confirm password must be match!"
      status = 400
      // return res.status(400).json({
      //   message: "Password and confirm password must be match!",
      //   status: 400
      // });
    }
    else
    {
      const hashPassword = await bcrypt.hash(password, 10);

      const result = await userModal.insertMany({
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: hashPassword,
        role: "user",
        picture: req.file ? `public/profile/${req.file.filename}` : '',
        registration_date: new Date().toISOString()
      });
      token = generateToken(result)
      message = "User signUp successfully"
      status = 201
    }
    res.status(status).json({ success: true, message: 'User signUp successfully', token: token, status: status });
  } catch (error) {
    console.log('error: ', error)
    res.status(500).json({success: false, message: "Something went wrong", status: 500 });
  }
};

const signIn = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await userModal.findOne({ email: email });
    if (!existingUser) {
      return res.status(404).json({ message: "User not found" });
    }

    const matchPassword = await bcrypt.compare(password, existingUser.password);
    if (!matchPassword) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    let token = generateToken(existingUser)

    return res.status(200).json({ user: existingUser, token: token, success: true, status: 200 });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};

const uploadProfilePic = async () => {
  const storage = upload
}

module.exports =  { signUp, signIn };
