CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
    id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(40),
    department_name VARCHAR (60),
    price FLOAT NOT NULL,
    stock_quantity INT NOT NULL,
    PRIMARY KEY (id)
);
