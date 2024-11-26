// userController.js
import pool from '../db.js';
import bcrypt from 'bcrypt';
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: process.env.SMTP_PORT || 587,
  secure: false,
  auth: {
    user: 'anasna6005@gmail.com',
    pass: 'ciut ohmh iatk ofgg',
  },
});


const SALT_ROUNDS = 10;

export const insertUser = async (name, email, password) => {
  try {
    // Check if the email already exists
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (result.rows.length > 0) {
      throw new Error('Email is already in use');
    }

    // Hash the password using bcrypt
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    // Insert the user data into the database
    const insertResult = await pool.query(
      'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *',
      [name, email, hashedPassword]
    );

    return insertResult.rows[0]; // Return the created user
  } catch (err) {
    console.log(err);
    throw new Error(`Database error: ${err.message}`);
  }
};

export const loginController = async (email, password) => {
  try {
    // Check if the user exists in the database
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (result.rows.length === 0) {
      const error = new Error('Invalid email');
      error.status = 401; // Unauthorized
      throw error;
    }

    const user = result.rows[0];
    // Verify the password using bcrypt
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      const error = new Error('Invalid password');
      error.status = 401; // Unauthorized
      throw error;
    }

    return { message: 'Login successful', user: { email: user.email, name: user.name } };
  } catch (err) {
    console.error('Error caught in loginController:', err.message); // Log only the message for clarity
    // Re-throw the error so it propagates to the route handler
    throw err;
  }
};


export const sendEmailOTP = async (email) => {
  try {
    if (!email) {
      return { error: 'Email is required' }
    }

    // Generate OTP
    const otp = generateOTP();

    // Email details
    const mailOptions = {
      from: 'anasna6005@gmail.com',
      to: email,
      subject: 'Your OTP Code',
      text: `Your OTP code is ${otp}. It will expire in 5 minutes.`,
    };

    // Send email
    await transporter.sendMail(mailOptions);
    console.log("Mail sent successfully," , otp);
    return({ message: 'OTP sent successfully', otp});
  } catch (error) {
    console.error('Error sending OTP:', error);
    res.status(500).json({ error: 'Failed to send OTP' });
  }
};



const generateOTP = () => {
  return Math.floor(1000 + Math.random() * 9000); // Generates a random number between 1000 and 9999
};
