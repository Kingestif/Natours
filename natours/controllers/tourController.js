const fs = require('fs');

let toursJson = [];

// middleware (instead of writing this code validity of id on each request, only write it once here)
const checkId = (req,res,next,val) => {
    const tourIndex = toursJson.findIndex(tour => tour.id === parseInt(val));
    if(tourIndex === -1){
        res.status(404).send('not found');
    };
    next();
};
 
fs.readFile('./dev-data/data/tours.json', 'utf-8', (err,data1) => {    
    if(err) return console.log('ERROR reading file');
    toursJson = JSON.parse(data1);
});

// --------------1.GET-----------------
const getTours = async () => {
    try {
        const data = await fs.promises.readFile('./dev-data/data/tours.json', 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Error reading tours.json:', error);
        return []; 
    }
};

const getAllTours = async (req, res) => {
    const toursJson = await getTours();       
    
    res.status(200).json({
        status: "success",
        requestTime: req.requestTime,
        results: toursJson.length,
        data: {
            tours: toursJson
        },
    });
};


// --------------- 2.POST REQUEST ----------------
const addTour = (req,res) => {
    newid = toursJson.length
    newdata = Object.assign({"id": newid}, req.body);       
    toursJson.push(newdata);

    fs.writeFile('./dev-data/data/tours.json', JSON.stringify(toursJson), err => {
        res.status(200).json({
            status: "success",
            data: {
                tours: toursJson
            }
        });
    });
};

//-----------------3. Get Single Tour -------------
const getTour = (req,res) => {
    id = parseInt(req.params['id']);
    const tourIndex = toursJson.findIndex(tour => tour.id === id);    

    orderedtour = toursJson[tourIndex]
    res.status(200).json({
        status: "success",
        requestTime: req.requestTime,
        data: {
            tour: orderedtour
        }
    });
};

// --------------4. PATCH ------------------
const updateTour = (req,res) => {
    id = parseInt(req.params['id']);
    const topatchIndex = toursJson.findIndex(tour => tour.id === id);

    toursJson[topatchIndex] = Object.assign({}, toursJson[topatchIndex], req.body);       

    fs.writeFile('./dev-data/data/tours.json', JSON.stringify(toursJson), err => {
        res.status(200).json({
            status: "success",
            data: {
                tour: toursJson[topatchIndex]
            }
        });
    });
};

// ---------------- 5. DELETE --------------
const deleteTour = (req,res) => {
    id = parseInt(req.params['id']);
    toursJson = toursJson.filter(tour => tour.id !== id);       

    fs.writeFile('./dev-data/data/tours.json', JSON.stringify(toursJson), err => {
        res.status(204).json({
            status: "success",
            results: toursJson.length,
            data: {
                tour: null
            } 
        });
    });
};


module.exports = {
    getAllTours,
    getTour,
    addTour,
    updateTour,
    deleteTour,
    checkId
}
