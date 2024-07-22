CREATE DATABASE the_chaotic_makeup_world

CREATE TABLE post (
    id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
    title VARCHAR(50),
    text TEXT,
    image TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
);


INSERT INTO  post(title, text, image) VALUES 
(
    'post1',
    'text1',
    'https://primor.eu/blog/wp-content/uploads/2023/04/PINTALABIOS-PERMANENTES-1140x760.jpg'
),
(
    'post2',
    'text2',
    'https://primor.eu/blog/wp-content/uploads/2023/04/PINTALABIOS-PERMANENTES-1140x760.jpg'
),
(
    'post3',
    'text3',
    'https://primor.eu/blog/wp-content/uploads/2023/04/PINTALABIOS-PERMANENTES-1140x760.jpg'
),
(
    'post4',
    'text4',
    'https://primor.eu/blog/wp-content/uploads/2023/04/PINTALABIOS-PERMANENTES-1140x760.jpg'
),
(
    'post5',
    'text5',
    'https://primor.eu/blog/wp-content/uploads/2023/04/PINTALABIOS-PERMANENTES-1140x760.jpg'
),
(
    'post6',
    'text6',
    'https://primor.eu/blog/wp-content/uploads/2023/04/PINTALABIOS-PERMANENTES-1140x760.jpg'
),
(
    'post7',
    'text7',
    'https://primor.eu/blog/wp-content/uploads/2023/04/PINTALABIOS-PERMANENTES-1140x760.jpg'
),
(
    'post8',
    'text8',
    'https://primor.eu/blog/wp-content/uploads/2023/04/PINTALABIOS-PERMANENTES-1140x760.jpg'
),
(
    'post9',
    'text9',
    'https://primor.eu/blog/wp-content/uploads/2023/04/PINTALABIOS-PERMANENTES-1140x760.jpg'
),
(
    'post10',
    'text10',
    'https://primor.eu/blog/wp-content/uploads/2023/04/PINTALABIOS-PERMANENTES-1140x760.jpg'
);


