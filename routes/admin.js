const { Router } = require('express')
const adminMiddleware = require('../middleware/admin')
const router = Router()
const { Admin, Course, User } = require('../db')

const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");

//Admin Routes
router.post('/signup', async function(req, res){
    //Implement admin signup logic
    const username = req.body.username;
    const password = req.body.password;

    // check if a username with this username already exist
    await Admin.create({
        username: username,
        password: password
    })
    
    res.json({
        message: "Admin created successfully !"
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

router.post('/courses', adminMiddleware, async function(req, res){
    //Implement course creation logic
    const title = req.body.title;
    const description = req.body.description;
    const imageLink = req.body.imageLink;
    const price = req.body.price;
    //Ideally we should have used zod library for input validation in real world

    const newCourse = await Course.create({
        title,
        description,
        imageLink,
        price
    })

    res.json({
        message: "Course created successfully !",
        courseId: newCourse._id
    })

});

router.get('/courses', adminMiddleware, async function(req, res){
    //Implement fetching all courses logic
    const response = await Course.find({});

    res.json({
        courses: response
    })

});

module.exports = router;