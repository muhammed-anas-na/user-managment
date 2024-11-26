import pkg from 'validator';
const { isEmail } = pkg;


// Middleware for validating the signup and login fields
export const validateSignup = (req, res, next) => {
  const { name, email, password, confirmPassword } = req.body;
  const errors = [];

  // Validate Name
  if (!name || name.length < 3) {
    errors.push('Name must be at least 3 characters long.');
  }

  // Validate Email
  if (!email || !isEmail(email)) {
    errors.push('Invalid email address.');
  }

  // Validate Password
  if (!password || password.length < 6) {
    errors.push('Password must be at least 6 characters long.');
  }

  // Confirm Password
  if (password !== confirmPassword) {
    errors.push('Password and confirm password must match.');
  }

  // If there are errors, return a bad request response with error messages
  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  // If validation passes, proceed to the next middleware
  next();
};

export const validateLogin = (req, res, next) => {
  const { email, password } = req.body;
  const errors = [];

  // Validate Email
  if (!email || !isEmail(email)) {
    errors.push('Invalid email address.');
  }

  // Validate Password
  if (!password || password.length < 6) {
    errors.push('Password must be at least 6 characters long.');
  }

  // If there are errors, return a bad request response with error messages
  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  // If validation passes, proceed to the next middleware
  next();
};
