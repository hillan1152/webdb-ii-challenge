
exports.up = function(knex) {
  return knex.schema.createTable("car-dealer", tbl => {
    tbl.increments('id');

    tbl.string("VIN", 18)
        .notNullable()
        .unique()
        .index();
    
    tbl.string("make")
        .notNullable()
    
    tbl.string("model")
        .notNullable()
    
    tbl.integer("mileage")
        .notNullable()

    tbl.string("transmission_type")
        .nullable();

    tbl.string("title_status")
        .nullable();
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("car-dealer")
};
