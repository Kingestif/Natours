const express = require('express');
const app = express();
const fs = require('fs');
const morgan = require('morgan');
app.use(express.json());       
app.use(morgan('dev'));    

const tourRouter = require('./Routes/tourRoutes.js');


// middleware
app.use((req,res,next) => {
    req.requestTime = new Date().toISOString();
    next();
});

// Mounting ROUTES
app.use('/api/v1/tours', tourRouter);

module.exports = app;












