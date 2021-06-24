SELECT properties.id, properties.title, reservations.start_date, properties.cost_per_night, AVG(property_reviews.rating) AS average_rating
FROM properties
JOIN reservations ON reservations.property_id = properties.id
JOIN property_reviews ON property_reviews.reservation_id = reservations.id
WHERE reservations.end_date < now() AND reservations.guest_id = 1
GROUP BY properties.id, reservations.start_date
ORDER BY reservations.start_date ASC
LIMIT 10;