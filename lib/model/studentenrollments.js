const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const formschema = new Schema({
    email:{
        type: String,
        required: true
    },
    username:{
        type: String,
        required: true
    },
    course:{
        type: [String], // Modified to accept an array of strings
        required: true
    },
    },{timestamps:true});

export default mongoose.models.studentenrollments || mongoose.model('studentenrollments',formschema)