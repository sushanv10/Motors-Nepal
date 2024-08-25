const express = require('express');
const cors = require('cors');
const connectDB = require('./src/Config/db.js');
// const userRoute = require('./src/Routes/userRoutes');
const authRoutes= require('./src/Routes/authRoutes')
const profileRoutes=require("./src/Routes/ProfileRoutes")
const categoryRoutes=require("./src/Routes/CategoryRoutes")
const productRoutes = require("./src/Routes/productRoutes")
const bikeRoutes = require('./src/Routes/bikeRoutes'); // Add bike routes
const bookingRoutes = require('./src/Routes/bookingRoutes');
require('dotenv').config();

const app = express();
app.use(cors());
app.use("/uploads", express.static(__dirname + "/uploads")); // Enable CORS
app.use(express.json());

const port = process.env.port || 4000;

connectDB();


// app.use('/user', userRoute);
app.use('/api/auth', authRoutes)
app.use('/api/profile', profileRoutes)
app.use('/api/category', categoryRoutes)
app.use('/api/product', productRoutes)
app.use('/api/bikes', bikeRoutes); 
app.use('/api/bookings', bookingRoutes);


app.listen(port, () => {
  console.log(`Server is running at port ${port}`);
});
