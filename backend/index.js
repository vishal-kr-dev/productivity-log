const express = require('express');
const cors = require('cors');
const connectDB = require('./connection');
const User = require('./model');
const jwt = require("jsonwebtoken")

const app = express();
app.use(express.json());
app.use
app.use(cors());
const PORT = 3000;
const JWT_SECRET = 'Hakuna-matata';

// Connect to DB

connectDB('mongodb+srv://abhish:6YAt8eAogRGC5dhR@cluster0.jv7k7a6.mongodb.net/assignment');

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

         const token = jwt.sign({ id: username, password}, JWT_SECRET);

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


app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));


