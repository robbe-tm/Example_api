const express = require('express');
const router = express.Router();
const Campus = require('./models/campus');
const Docent = require('./models/docent');

router.get('/', (req, res) => {
    console.log('/ route called');
    res.send(
        '<h1>Welcome to my API, these are the available routes:</h1>'

        +
        '<h2>/</h2>' +
        'Where you are right now'

        +
        '<hr/>'

        +
        '<h2>/campus</h2>' +
        'Returns all campuses in the database using .find()'

        +
        '<hr/>'
    );
});

router.get('/campus', async(req, res) => {
    console.log('/campus route called');
    try {
        res.json(await Campus.find());
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});
router.get('/campus/:id', async(req, res) => {
    console.log('/campus/:id route called');
    try {
        res.json(await Campus.findById(req.params.id));
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});
router.post('/campus/create', async(req, res) => {
    console.log('/campus/create route called');
    try {
        res.json(await Campus.create(req.body));
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});
router.put('/campus/update/:id', async(req, res) => {
    console.log('/campus/update/:id route called');
    try {
        res.send(await Campus.findByIdAndUpdate(req.params.id, { $set: req.body }));
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});
router.get('/docent', async(req, res) => {
    console.log('/docent route called');
    try {
        res.json(await Docent.find().populate('campuses').sort('voornaam'));
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});
router.get('/docent/:id', async(req, res) => {
    console.log('/docent/:id route called');
    try {
        res.json(await Docent.findById(req.params.id).populate('campuses'));
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});
router.post('/docent/create', async(req, res) => {
    console.log('/docent/create route called');
    try {
        res.json(await Docent.create(req.body));
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});
module.exports = router;