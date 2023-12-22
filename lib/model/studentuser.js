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
},{timestamps:true});

export default mongoose.models.students || mongoose.model('students',formschema)