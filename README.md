# Created Course Selling App 2 (used JWT)

Same as the Course_Selling_App_1 project, but in this project I have used JWT for authentication.

I have introduced the sign-in endpoints for both users and admins.

For this one, in every authenticated requests, one needs to send the JWT in headers (Authorization : "Bearer {actual_token}").

I have used MongoDb to store all the data persistently.

# Routes

### Admin Routes

- POST /admin/signup

  Description: Creates a new admin account

  Input Body: { 'username': 'admin', password:' password' }

  Output: { message: 'Admin created successfully' }

- POST /admin/signin

  Description: Logs in an admin account

  Input Body: { 'username': 'admin', password:' password' }

  Output: { token: 'your-token' }

- POST /admin/courses

  Description: Creates a new course

  Input Body: Headers: { 'username': 'username', 'password': 'password' },

  Body : {
  title: 'course title',
  description: 'course description',
  price: 100,
  imageLink: 'https://m.media-amazon.com/images/I/71hodUMujRL._AC_UF1000,1000_QL80_.jpg'
  }

  Output: { message:'Course created successfully', courseId: "new course id }

- GET /admin/courses

  Description: Returns all the courses

  Input Body: Headers: { 'username':'username', 'password':'password' }

  Output: { courses: [ {
  id: 1,
  title: 'course title',
  description: 'course description',
  price: 100,
  imageLink: 'https://linktoimage.com'},
  published: true
  ...]}

### User routes

- POST /users/signup

  Description: Creates a new user account.

  Input: { username: 'user', password: 'password' }

  Output: { message: 'User created successfully' }

- POST /users/signin

  Description: Logs in a user account.

  Input: { username: 'user', password: 'password' }

  Output: { token: 'your-token' }

- GET /users/courses

  Description: Lists all the courses.

  Input: Headers: { 'Authorization': 'Bearer ' }

  Output: { courses: [ {
  id: 1,
  title: 'course title',
  description: 'course description',
  price: 100,
  imageLink: 'https://linktoimage.com',
  published: true },
  ... ] }

- POST /users/courses/:courseId

  Description: Purchases a course. courseId in the URL path should be replaced with the ID of the course to be purchased.

  Input: Headers: { 'Authorization': 'Bearer ' }

  Output: { message: 'Course purchased successfully' }

- GET /users/purchasedCourses

  Description: Lists all the courses purchased by the user.

  Input: Headers: { 'Authorization': 'Bearer ' }

  Output: { purchasedCourses: [ {
  id: 1,
  title: 'course title',
  description: 'course description',
  price: 100,
  imageLink: 'https://linktoimage.com',
  published: true }
  ... ] }

## Concepts I have learned after doing this project

1. Express JS
2. Middleware in Node JS
3. Defining routes
4. Use of async and await keywords
5. Exporting and importing modules in JS
6. Promises in JS
7. JSONWebTokens, and how to implement it
8. MongoDB
9. Postman
