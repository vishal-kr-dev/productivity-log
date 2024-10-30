const express = require('express');
const cors = require('cors');
const connectDB = require('./connection');
const User = require('./model/userModel');
const jwt = require("jsonwebtoken");
const authMiddleware = require('./Middlewares/authMiddleware');
const Session = require('./model/sessionModel');

const app = express();
app.use(express.json());
app.use
app.use(cors());
const PORT = 3000;
require('dotenv').config();
const mongoDbUri = process.env.MONGODB_URI;
const JWT_SECRET = process.env.JWT_SECRET;


// Connect to DB

connectDB(mongoDbUri);

app.post("/signup", async (req, res) => {
    try {
        const { name, username, year, password, confirmPassword } = req.body;
        console.log("Data: ", { name, username, year, password, confirmPassword });

        // Basic validation
        
        if (!name || !username || !year || !password || !confirmPassword) {
            return res.status(400).json({ message: "All fields are required." });
        }

        if (password !== confirmPassword) {
            return res.status(400).json({ message: "Passwords do not match." });
        }
        const existingUser = await User.findOne({username});

        if(existingUser)
            return res.status(409).json({
                message: "Username already exist"
        })


        // Create a new user instance
        const newUser = new User({
            name,
            username,
            year,
            password,
            confirmPassword // confirmPassword will be removed in pre-save hook
        });

        // Save user to the database
        await newUser.save();

        res.status(201).json({ message: "User created successfully." });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error." });
    }

})

app.post("/login", async(req, res)=> {
    try{
        const { username, password } = req.body;
        console.log("username: ", username);
        console.log("password: ", password);

        if(!username || !password)
            return res.status(400).json({ message: "Username and Password are required"});
         //Find the User by Username
         const user = await User.findOne({username});

         if(!user)
            return res.status(401).json({ message: "Invalid Username or Password "});
        
         // Check if the password matches the stored Password

         if(password != user.password)
            return res.status(401).json({ message: "Invalid Usernae or Password"});
        
         // Generate jwt token

         const token = jwt.sign({ username: username, password: password}, JWT_SECRET);
         console.log(token);

         // Successful Login

         res.status(200).json({
            token: token,
            message: "Login Sucesssfull"
         })


    }catch(error){
        res.status(500).json({
            message: "Internal Server Error"
        })
        console.log("Error while Signing up", error);
    }
})

app.get("/", async (req, res) => {
    return res.status(200).json({
        message: "The server is up and running"
    })

})

app.post("/addSession", authMiddleware, async(req, res) => {
    const {createdAt, duration, type, comments} = req.body;
    const body = req.body;
    console.log(body);
    const {username, password} = req.user;
    const user = req.user;
    console.log(user);
    // console.log(body);

    try{
        console.log("After this");
        const userExist = await User.findOne({ username: username });
        console.log("This is the userExists", userExist);
        console.log("User Exists");
        if(!userExist){
            console.log("User does not exist");
            return res.status(404).json({ message: "User not found"})
        }

        const newSession = new Session({
            username: userExist._id,
            user: username,
            duration: duration,
            type: type,
            comments: comments
        })
        await newSession.save();
        console.log("This executed");
        return res.status(200).json({ message: "Session Saved Succesfully"});
    }catch(err){
        console.log(err)
    }
    
    
    
    // res.status(200).json({ message: "Success"});
})

app.get("/getSession", authMiddleware, async(req, res) => {
    const { username } = req.user;
    console.log("This is the endpoint");
    // console.log(user);
    console.log("This is getting");
    try{
        const userExist = await User.findOne({ username: username });
        console.log("User Exist", userExist);
        const session = await Session.find({ username: userExist._id})
        console.log(session);

        if(!userExist){
            return res.status(404).json({ message: "User not found"});
        }
        const sessionsArray = Array.isArray(session) ? session : []; 

        res.status(200).json(
            session
        );



    }catch(error){
        console.log(error)
    }

})


app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));


