const mongoose = require('mongoose')

//Connect to MongoDB using connection string
mongoose.connect('mongodb+srv://Aswini:Aswini123$$@cluster0.yuoksvv.mongodb.net/course_selling_app_2')


//Define schemas
const AdminSchema = new mongoose.Schema({
    //Schema definition here
    username : String,
    password : String
});


const UserSchema = new mongoose.Schema({
    //Schema definition here
    username : String,
    password : String,
    purchasedCourse : [{
        //array
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course'
    }]
});


const CourseSchema = new mongoose.Schema({
    //Schema definition here
    title: String,
    description: String,
    imageLink: String,
    price: Number
});



const Admin = mongoose.model('Admin', AdminSchema);
const User = mongoose.model('User', UserSchema);
const Course = mongoose.model('Course', CourseSchema);


module.exports = {
    Admin,
    User,
    Course
}


