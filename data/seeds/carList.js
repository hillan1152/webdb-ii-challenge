
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return (
    knex('car-dealer')
      .truncate()
      .then(function () {
       // Inserts seed entries
        return knex('car-dealer').insert([
          {VIN:"1HD1FMW166Y641723", make:"Harley Davidson", model:"Flhtpi", mileage: 1000},
          {VIN:"JH4CC2660PC002236", make:"Acura", model:"Vigor", mileage:1210},
          {VIN:"5TEWN72N63Z275910", make:"Toyota", model:"Tacoma", mileage: 69}
        ]);
     })
    );
  };
