const express = require('express');
const { getAllTours, getTour, addTour, updateTour, deleteTour, checkId } = require('../controllers/tourController.js');
// const { route } = require('../app.js');


// Routes
const router = express.Router(); 

// middleware (checks if parameter is correct)
router.param('id', checkId);

router.route('/').get(getAllTours).post(addTour);
router.route('/:id').get(getTour).patch(updateTour).delete(deleteTour);


module.exports = router;
   