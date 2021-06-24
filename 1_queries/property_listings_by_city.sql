SELECT properties.id,
properties.title,
properties.cost_per_night,
AVG(property_reviews.rating) AS average_rating 
FROM properties
JOIN property_reviews ON property_reviews.property_id = properties.id
WHERE properties.city = 'Vancouver' OR property_reviews.rating >= 4
GROUP BY properties.id, property_reviews.id
ORDER BY cost_per_night ASC
LIMIT 10;