const mongoose=require('mongoose');
const users_collection1=require('./userdata')

mongoose.connect('mongodb://localhost:27017/facebookuserdata')
.then(()=>{console.log('mongoose connection successful at port 27017 ')})
.catch((err)=>{console.log(err)})