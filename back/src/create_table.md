CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(80) NOT NULL,
    email VARCHAR(100) NOT NULL,
    password VARCHAR(80) NOT NULL,
    typeUser ENUM('cliente', 'dono') NOT NULL
);

CREATE TABLE locals (
    id INT AUTO_INCREMENT PRIMARY KEY,
    locationName VARCHAR(80) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    description TEXT,
    obs TEXT,
    usuario_id INT NOT NULL,
    FOREIGN KEY (usuario_id) REFERENCES users(id)
);

CREATE TABLE sports (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    local_id INT NOT NULL,
    FOREIGN KEY (local_id) REFERENCES locals(id)
);

CREATE TABLE marks (
    id INT AUTO_INCREMENT PRIMARY KEY,
    dayOfMonth INT NOT NULL,
    monthYear VARCHAR(10) NOT NULL,
    shortDay VARCHAR(8) NOT NULL,
    hour VARCHAR(20) NOT NULL,
    local_id INT NOT NULL,
    usuario_id INT NOT NULL,
    FOREIGN KEY (local_id) REFERENCES locals(id),
    FOREIGN KEY (usuario_id) REFERENCES users(id)
);

CREATE TABLE avaliable_times (
    id INT AUTO_INCREMENT PRIMARY KEY,
    day VARCHAR(8) NOT NULL,
    startTime VARCHAR(10) NOT NULL,
    endTime VARCHAR(10) NOT NULL,
    local_id INT NOT NULL,
    FOREIGN KEY (local_id) REFERENCES locals(id)
);

CREATE TABLE images (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(80) NOT NULL,
    src VARCHAR(200) NOT NULL
);