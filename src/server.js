const express=require('express')
var bodyParser=require("body-parser");
const path=require("path");
const port=3000;
const app=express();
const bcrypt=require("bcryptjs");
//const user_collection1=require('./userdata');
const user_collection1=require('./userdatabase/userdata')
require("./userdatabase/mongoose_connection");

app.use(
    bodyParser.urlencoded({
        extended:true,
    })
);

app.use(express.json());

let mainfolder=path.join(__dirname,'../')
app.use(express.static(mainfolder));

app.get('/',(req,res)=>{
    //res.send('Hello world')
    // console.log(__dirname);
    res.sendFile(mainfolder+'/login.html')
})

app.get('/register',(req,res)=>{
    //res.send('Hello world')
    // console.log(__dirname);
    res.sendFile(mainfolder+'/login.html')
})

app.get('/login',(req,res)=>{
    res.sendFile(mainfolder+'/login.html')
})

app.post('/register',(req,res)=>{
    let req_userdata = new user_collection1(req.body);
    // console.log(req_userdata);
    req_userdata.save();
    res.sendFile(mainfolder+'/login.html')
})


app.post('/login',async (req,res)=>{
    let usermail=req.body.usermail;
    let userpassword=req.body.userpassword;
    let req_userdata=await user_collection1.findOne({usermail:usermail})
    if(req_userdata!=null){
        const bcrypt_password_match=await bcrypt.compare(
            userpassword,
            req_userdata.userpassword
        )
        if(bcrypt_password_match==true){
            res.send("SuccessFully logged In")
        }else{
            res.send('Invalid Password')
        }
    }else{
        res.send('Invalid email')
    }
})

app.listen(port,()=>{
    console.log(`listening to port${port}`);
})