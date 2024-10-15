const express = require("express");
const User = require("./db");

const app = express();

app.use(express.json());

app.post('/signup',async (req,res)=>{
    const {name,email,password} = req.body;
    try{
        const user = new User({
            name: name,email: email,password: password
        })
        user.save()
        res.json({
            msg: 'success'
        })
    } catch(error){
        res.statusCode(400).json({
            msg: 'error occur'
        })
    }
})

app.post('/signin',async(req,res)=>{
    const {email,password} = req.body;
    try{
        const user = await User.findOne({email:email,password:password})
        if(!user){
            res.statusCode(404).json({
                msg: "user not exist"
            })
        }
        
    }catch (error){
        res.statusCode(500).json({
            msg: "internal server error"
        })
    }
})

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});


