const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
dotenv.config();
const { valid, isvalidEmail,passwordRegex } = require("../vaIidators/validator.js")

const JWT_SECRET = process.env.JWT_SECRET;
//======[API:FOR CREATING USER DB]======
const register = async (req, res) => {
    try{
        const { email, password } = req.body;

        if (Object.keys(req.body).length == 0)
            return res.status(400).send({ status: false, message: "Data in request body is required...!" })
    
        try {
    
            if (!email ||!valid(email) || !isvalidEmail(email))
                return res.status(400).send({ status: false, Message: "email is required in a valid format...!" })
    
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                return res.status(400).json({ message: "User already exists" });
            }
            if (!valid(password))
                return res.status(400).send({ status: false, message: "Password must be present" });
            if (!passwordRegex(password))
                return res.status(400).send({ status: false, message: "Please enter a password which contains min 8 letters & max 15 letters, at least a symbol, upper and lower case letters and a number" });
            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = new User({
                email,
                password: hashedPassword,
            });
            await newUser.save();
    
            res.status(201).json({ message: "User registered successfully" });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Internal server error" });
        }
    }catch(err){
        
       return res.send(err.message)
    }
};

const login = async (req, res) => {

    try{
 // validation for empty body
 if (Object.keys(req.body).length == 0)
    return res.status(400).send({ status: false, message: "Request body cannot remain empty" });
const { email, password } = req.body;
// validation for email
if (!valid(email) || !valid(password))
    return res.status(400).send({ status: false, message: "Credential must be present" });

// find email in DB

try {
    const user = await User.findOne({ email });
    if (!user)
        return res.status(400).send({ status: false, message: "Credential is not correct", });

    const isPasswordValid = await bcrypt.compare(password.trim(), user.password);
    if (!isPasswordValid) {
        return res.status(401).json({ message: "Invalid password" });
    }
    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });

    res.json({
        message: "Authenticated successfully",
        token,
    });
} catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
}
    }catch(err){
        
       return res.send(err.message)
    }
   
};

/** authorize the route */
const authenticateJWT = (req, res, next) => {
    try{
        const token = req.headers["authorization"]?.split(" ")[0];

        if (!token) {
            return res.status(403).json({ error: "No token provided." });
        }
    
        jwt.verify(token, JWT_SECRET, (err, user) => {
            if (err) {
                return res.status(403).json({ error: "Invalid token." });
            }
    // console.log(user)
            req.user = user;

            next();
        });
    }catch (error) {
        if (error.message == "jwt expired") return res.status(401).send({ status: false, message: "please login one more time, token is expired" });
        
        if (error.message == 'invalid token') return res.status(401).send({ status: false, message: "invalid token" });

        if (error.message == "invalid signature") return res.status(401).send({ status: false, message: "invalid signature" });

        return res.status(500).send({ status: false, message: error.message });
    }
   
};

/**protected route which checks the route is protected or not */
const protectRoute = async (req, res) => {
try{
    const  {iat,exp} = req.user
    // Convert to milliseconds
const iat_timestampInMilliseconds = iat * 1000;
const exp_timestampInMilliseconds = exp * 1000;

// Create a Date object
const iat_date = new Date(iat_timestampInMilliseconds);
const exp_date = new Date(exp_timestampInMilliseconds);

// Format the date to IST
const options = { timeZone: "Asia/Kolkata", year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", second: "2-digit" };
const iat_istDate = new Intl.DateTimeFormat("en-IN", options).format(iat_date);
const exp_istDate = new Intl.DateTimeFormat("en-IN", options).format(exp_date);

console.log("IST Date:", iat_istDate,exp_istDate);
    res.json({ message: "This is a protected route for time duration", Createtime:iat_istDate,Expiretime:exp_istDate });
}catch(err){

   return res.send(err.message)
}
}

module.exports = {
    register,
    login,
    authenticateJWT,
    protectRoute
};
