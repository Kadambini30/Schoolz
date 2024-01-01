const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const formschema = new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    course:{
        type: [String],
    },
    dob:{
        type:String,
    },
    phone:{
        type:String,
    },
    profilepic:{
        type:String,
    },
    address:{
        type:String,
    },
    city:{
        type:String,
    },
    state:{
        type:String,
    },
    pincode:{
        type:String,
    },
    location:{
        type:String,
    },
    className:{
        type:String,
    },
    school:{
        type:String,
    },
},{timestamps:true});

export default mongoose.models.students || mongoose.model('students',formschema)