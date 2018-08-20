var mysql = require('mysql');
var inquirer = require ('inquirer');

var connection = mysql.createConnection({
    host : "localhost",
    port : 3306,
    user : "root",
    password: "",
    database : "bamazon"
});

connection.connect(function(error){
    if(error)throw error;
    console.log("Connected as at " + connection.threadId + "\n");
    readproducts();
});

function readproducts(){
    console.log("All Products from Bamazon for Sale Now...\n");
    connection.query("SELECT * FROM products", function(err,res){
    if (err)throw err;
    for (var i=0; i < res.length; i++){

        console.log( "|| item_id : " + res[i].id +" "
    + " || Products : " + res[i].product_name + " || Price : " + res[i].price);
    }
    Purchase();
    });
}

function Purchase(){ 
    inquirer.prompt([{

        name : "item",
        type : "input",
        message : "What would you like to buy? Please provide item id.."
    },
        { name : "amount",
        type : "input",
        message: "How many do you want?"
    }]).then(function
}