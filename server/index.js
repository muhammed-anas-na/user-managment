import express from 'express';
import bodyParser from 'body-parser';
import { validateSignup, validateLogin } from './middleware/AuthValidate.js'; // Import the validation middleware
import { insertUser, loginController, sendEmailOTP } from './controller/userController.js';
import cors from 'cors'
import session from 'express-session';


const app = express();
const port = 3000;
app.use(cors({
  origin: 'http://localhost:4200',
  credentials: true, 
}));
// Middleware to parse JSON request bodies
app.use(bodyParser.json());
app.use(
  session({
    secret: 'your_secret_key', // Replace with a secure key
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false, maxAge: 300000 }, // 5 minutes
  })
);

// Signup route (POST /signup) with validation middleware
app.post('/api/auth/otp', validateSignup, async(req, res) => {
  const { name, email, password } = req.body;
  console.log("Signup Route ==>" , req.body);
  req.session.user = req.body;
  const {otp} = await sendEmailOTP(email);
  req.session.otp = otp;
  console.log("Session==>" , req.session);
  res.status(200).json({ message: 'Otp Send Successfully' });
});

app.post('/api/auth/signup', async(req,res)=>{
  console.log("On singup" , req.body);
  const {otp} = req.body;
  console.log("otp user entered ==>" , otp , req.session.otp);
  if(otp != req.session.otp){
    console.log("Wrong otp")
    return res.status(401).json({message:"wrong otp"})
  }
  const {email,name, password} = req.session.user;
  await insertUser(name,email,password);
  res.json({message:"Successfully added"});
})

// Login route (POST /login) with validation middleware
app.post('/api/auth/login', validateLogin, async (req, res, next) => {
  const { email, password } = req.body;

  try {
    // Pass the email and password to the controller
    const response = await loginController(email, password);
    // If successful, return the response
    res.status(200).json({ success: true, data: response });
  } catch (err) {
    // Pass the error to the error-handling middleware
    next(err);
  }
});



app.use((err, req, res, next) => {
  console.error('Error received in middleware:', err.message); // Log the error message

  const statusCode = err.status || 500; // Default to 500 if no status is set
  res.status(statusCode).json({
    success: false,
    error: {
      message: err.message || 'Internal Server Error', // User-friendly message for the UI
      status: statusCode,
    },
  });
});


// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
