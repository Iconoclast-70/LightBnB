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
    return pool
      .query(`SELECT * FROM properties LIMIT $1`, [limit])
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

/// Properties

/**
//  * Get all properties.
//  * @param {{}} options An object containing query options.
//  * @param {*} limit The number of results to return.
//  * @return {Promise<[{}]>}  A promise to the properties.
//  */
// const getAllProperties = function(options, limit = 10) {
//   const limitedProperties = {};
//   for (let i = 1; i <= limit; i++) {
//     limitedProperties[i] = properties[i];
//   }
//   return Promise.resolve(limitedProperties);
// }
// exports.getAllProperties = getAllProperties;


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
