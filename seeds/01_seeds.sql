INSERT INTO users (name, email, password) VALUES (
  'Steve Harris', 
  'sh@sh.com',
  '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'
),
(
  'Jim Matheos', 
  'jm@jm.com',
  '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'
),
(
  'Mikael Akerfeldt', 
  'ma@ma.com',
  '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'
);

INSERT INTO properties (
  owner_id,
  title, 
  description, 
  thumbnail_photo_url, 
  cover_photo_url,
  cost_per_night,
  parking_spaces,
  number_of_bathrooms,
  number_of_bedrooms,
  country,
  street,
  city,
  province,
  post_code,
  active
)
VALUES (
  1,
  'Park Manor',
  'Super awesome place',
  'https://libreshot.com/mysterious-forest/',
  'https://www.flickr.com/photos/giftsoftheuniverse/31230072265',
  75,
  20,
  2,
  2,
  'Canada',
  '16',
  'Calgary',
  'Alberta',
  'zvzvzv',
  TRUE
  ),

(
  2,
  'Fortress of Solitude',
  'Another super awesome place',
  'https://www.flickr.com/photos/jhoc/2665726862/',
  'https://www.flickr.com/photos/stevewall/3961873361',
  100,
  20,
  2,
  2,
  'Canada',
  '708',
  'Vancouver',
  'BC',
  'zvzvzv',
  FALSE
  ),

(
  3,
  'Ocean View',
  'Yet another super awesome place',
  'https://commons.wikimedia.org/wiki/File:Clouds_over_the_Atlantic_Ocean.jpg',
  'https://commons.wikimedia.org/wiki/File:Open_Ocean_(3212977602).jpg',
  200,
  20,
  2,
  2,
  'Canada',
  '1000',
  'Victoria',
  'BC',
  'zvzvzv',
  TRUE
  );

INSERT INTO reservations (guest_id, property_id, start_date, end_date) VALUES (
  1,
  1,
  NOW(),
  NOW() + INTERVAL '1 hour'
),
(
  2,
  2,
  now(),
  now() + INTERVAL '1 day'
),
(
  3,
  3,
  now(),
  now() + INTERVAL '1 hour'
);

INSERT INTO property_reviews (guest_id, property_id, reservation_id, rating, message) VALUES (
  1,
  1,
  1,
  10,
  'message'
),
(
  2,
  2,
  2,
  10,
  'message'
),
(
  3,
  3,
  3,
  10,
  'message'
);