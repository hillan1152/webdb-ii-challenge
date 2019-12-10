// INSTALL DEPENDENCIES FOR KNEX & EXPRESS
const express = require('express');
const knex = require('knex');

// HOOK UP DATABASE USING KNEX
const db = knex({
    client: 'sqlite3',
    connection: {
        filename: './data/cars.db3'
    },
    useNullAsDefault: true
});

// HOOK UP ROUTER
const router = express.Router();



router.post('/', (req, res) => {
    const carData = req.body;
})








module.exports = router;