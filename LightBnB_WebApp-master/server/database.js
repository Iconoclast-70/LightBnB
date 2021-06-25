//const properties = require('./json/properties.json');
//const users = require('./json/users.json');
const { Pool } = require('pg');

const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'lightbnb'
  });

  const getAllProperties = (options, limit = 10) => {

    // options.owner_id
   
    const queryParams = [];
    let queryString = "";
    let selectString = `SELECT * FROM properties JOIN property_reviews ON property_reviews.property_id = properties.id`

    if (options.city) {
      queryParams.push(`%${options.city.slice(1)}%`);
      queryString += ` WHERE properties.city LIKE $${queryParams.length}`;
    }

    if (options.owner_id) {
      queryParams.push(Number(options.owner_id) * 100);
      queryString += ` AND properties.owner_id = $${queryParams.length}`;
    }

    if (options.minimum_price_per_night) {
      queryParams.push(Number(options.minimum_price_per_night) * 100);
      queryString += ` AND properties.cost_per_night >= $${queryParams.length}`;
    }

    if (options.maximum_price_per_night) {
      queryParams.push(Number(options.maximum_price_per_night));
      queryString += ` AND properties.cost_per_night <= $${queryParams.length}`;
    }

    if (options.minimum_rating) {
      queryParams.push(Number(options.minimum_rating));
      queryString += ` AND property_reviews.rating >= $${queryParams.length}`;
    }

    queryParams.push(limit);
    queryString += ` LIMIT $${queryParams.length}`;

    console.log(selectString + queryString);
    console.log(queryParams);

    return pool
      .query(selectString + queryString, queryParams)
      .then((result) => {
        return result.rows;
      })
      .catch((err) => {
        console.log(err.message);
      });
  }
  exports.getAllProperties = getAllProperties;

const getUserWithEmail = (email) => {
  return pool
    .query(`SELECT * FROM users WHERE email = $1`, [email])
    .then( (result) => {
      return result.rows[0];
    })
    .catch((err) => {
      return err;
    });
}
exports.getUserWithEmail = getUserWithEmail;

const getUserWithId = function(id) {
  return pool.query(`SELECT * FROM users WHERE id = $1`, [id])
  .then((result) => {
    if(!result) {
      return null;
    }
    return result.rows[0];
  })
  .catch((err) => {
    console.error(err);
  })
 };

 exports.getUserWithId = getUserWithId;

const addUser = (user) => {
  return pool
    .query(`INSERT INTO users(name, email, password)
            VALUES($1, $2, $3) RETURNING *`, [user.name, user.email, user.password])
    .then((result) => {
      return result.rows;
    })
    .catch((err) => {
      return err;
    });
}
exports.addUser = addUser;

/// Reservations


const getAllReservations = (guest_id, limit = 10) => {
  return pool
    .query(`SELECT * FROM reservations 
    JOIN properties ON properties.id = reservations.property_id
    WHERE reservations.guest_id = $1 LIMIT $2;`, [guest_id, limit])
    .then((result) => {
      return result.rows;
    })
    .catch((err) => {
      return err;
    });
}
exports.getAllReservations = getAllReservations;

/**
 * Add a property to the database
 * @param {{}} property An object containing all of the property details.
 * @return {Promise<{}>} A promise to the property.
 */
const addProperty = function(property) {
  const propertyId = Object.keys(properties).length + 1;
  property.id = propertyId;
  properties[propertyId] = property;
  return Promise.resolve(property);
}
exports.addProperty = addProperty;
