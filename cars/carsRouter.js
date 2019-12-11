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
router.get('/:id', validateCarId, (req, res) => {
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

// UPDATE
router.put('/:id', validateCarId, (req, res) => {
    const changes = req.body;
    const { id } = req.params;

    db('car-dealer')
        .where({ id })
        .update(changes)
        .then(count => {
            if(count > 0) {
                console.log(count)
                res.status(200).json({ message: `${count} car updated.` });
            } else {
                res.status(404).json({ message: `Post not found.` });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ errorMessage: "Error updating this car." });
          });
})

// DELETE CAR
router.delete('/:id', validateCarId, (req, res) => {
    const { id } = req.params;

    db('car-dealer')
        .where({ id })
        .del()
        .then(count => {
            if(count > 0) {
                console.log(count)
                res.status(200).json({ message: `${count} car deleted.` });
            } else {
                res.status(404).json({ message: `Delete not found.` });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ errorMessage: "Error updating this car." });
          });
})



// MIDDLEWARE
function validateCarId(req, res, next){
    const { id } = req.params;

    db('car-dealer')
        .where({ id })
        .first()
        .then(car => {
            if(!car){
                res.status(400).json({ message: "Invalid Car ID." })
            } else {
                req.car = car;
                next();
            }
        })
        .catch(err => {
            res.status(500).json({ error: "The cars information could not be retrieved."})
          })
}

module.exports = router;
