SELECT properties.city, COUNT(reservations)
AS total_reservations
FROM properties 
JOIN reservations ON reservations.property_id = properties.id
GROUP BY properties.id
ORDER BY total_reservations DESC;




Select the name of the city and the number of reservations for that city.
Order the results from highest number of reservations to lowest number of reservations.