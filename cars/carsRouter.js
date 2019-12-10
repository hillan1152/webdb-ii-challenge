// INSTALL DEPENDENCIES FOR KNEX & EXPRESS
const express = require('express');
const knex = require('knex');

// HOOK UP DATABASE USING KNEX
const config = require('../knexfile.js');
const db = knex(config.development);
// BELOW IS EQUIVALENT TO ABOVE
            // const db = knex({
            // 	client: 'sqlite3',
            // 	connection: {
            // 		filename: './data/cars.db3'
            // 	},S
            // 	useNullAsDefault: true
            // });

// HOOK UP ROUTER
const router = express.Router();

// GET CARS
router.get('/', (req, res) => {
	db('car-dealer')
		.then((car) => {
			res.status(200).json(car);
		})
		.catch((err) => {
			res.status(500).json({ message: 'Failed to retrieve cars' });
		});
});
router.get('/:id', (req, res) => {
	const { id } = req.params;
    db('car-dealer')
        .where({ id }).first()
		.then((car) => {
            console.log(car)
			res.status(200).json(car);
		})
		.catch((err) => {
			res.status(500).json({ message: 'Failed to retrieve cars' });
		});
});

// POST A CAR
router.post('/', (req, res) => {
	const carData = req.body;

	db('car-dealer')
		.insert(carData)
		.then((ids) => {
			db('car-dealer').where({ id: ids[0] }).then((newCar) => {
				res.status(201).json(newCar);
			});
		})
		.catch((err) => {
			console.log('POST ERROR', err);
			res.status(500).json({ message: 'Failed to post data.' });
		});
});

// MIDDLEWARE


module.exports = router;
