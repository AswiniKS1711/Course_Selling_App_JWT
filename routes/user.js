const express = require('express') 
const userMiddleware = require('../middleware/user');
const { User, Course } = require('../db');
const router = express.Router()

const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");

//User Routes
//All these routes handle /user/signup or /user/courses or /user/courses/:courseId etc.
//This is a good practice to structure your express program

router.post('/signup', function(req, res){
    //Implement user signup logic

    const username = req.body.username;
    const password = req.body.password;

    User.create({
        username,
        password
    })

    res.json({
        message : "User created successfully !"
    })

});

router.post('/signin', async function(req,res){

    const username = req.body.username;
    const password = req.body.password;

    const user = await User.find({
        username,
        password
    })

    if(user)
    {
        const token = jwt.sign({
            username
        }, JWT_SECRET);
    
        res.json({
            token
        })
    }
    else
    {
        res.status(411).json({
            msg : "Incorrect credentials !"
        })
    }
    
})

router.get('/courses', async function(req, res){
    //Implement listing all courses logic

    const response = await Course.find({})

    res.json({
        courses : response
    })

});

router.post('/courses/:courseId', userMiddleware, async function(req, res){
    //Implement course purchase logic

    const username = req.username;  //usermiddleware, whenever it gets the username and password, put the username in the request object, 
    // so that when you call next(), the request object that we recieve, will have username attached to it
    // console.log(username);

    //If we had a Purchases table, then we could have done
    /* Purchases.create({
        userId,
        courseId
    })      */

    //Since, we dont have a Purchases table in the question, we will follow a different way

    //Firstly, get the course Id that user wants to buy from the url parameter,
    //e.g https://localhost3000/user/course/2
    //then 2 will be send to the courseId variable
    const courseId = req.params.courseId;

    //Push the courseId to the purchasedCourse [] array for this user

    //First get the username
    // const username = req.headers.username;

    await User.updateOne({
        username: username  // for this user
    }, {

        // push the courseId to the purchasedCouse [] array

        "$push" : {
            purchasedCourse : courseId
        } 
    });

    res.json({
        message : "Purchase complete !"
    })

});

router.get('/purchasedCourses', userMiddleware, async function(req, res){
    //Implement fetching all courses logic

    const user = await User.findOne({
        username : req.headers.username
    });

    // console.log(user.purchasedCourse)

    //find me all the courses where the courseId(_id is the name in MongoDB) is IN user.purchasedCourse array []
    const courses = await Course.find({
        _id : {
            "$in" : user.purchasedCourse
        }
    })

    res.json({
        courses : courses
    })

});


// router.get("/allusers", async function(req,res){

//     const response = await User.find({});

//     res.json({
//         users : response
//     })

// });

module.exports = router;