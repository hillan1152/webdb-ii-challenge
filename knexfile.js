// Update with your config settings.

module.exports = {
  development: {
    client: 'sqlite3',
    useNullAsDefault: true,
    connection: {
      filename: './data/cars.db3'
    },
    migrations: {
      directory: "./data/migrations"
    },
    seeds: {
      directory: "./data/seeds"
    }
  }
};

// module.exports = {
//   // teaches knex to connect to the development database
//   development: {
//       client: "sqlite3", // the DB driver
//       useNullAsDefault: true, // only needed when using SQLite3
//       connection: {
//           filename: "./data/produce.db3" // where is the database file?
//       },
//       migrations: {
//           directory: "./data/migrations" // will be created automatically
//       },
//       seeds: {
//           directory: "./data/seeds" // also created automatically
//       }
//   }
// };

