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
        message : "What would you like to buy? Please provide item id..",
        validate: function(value) {
            if (isNaN(value) === false) {
            return true;
            }
            return false;
        }
    },
    { 
        name : "chooseQuantity",
        type : "input",
        message: "How many do you want?",
        validate: function(value) {
            if (isNaN(value) === false) {
            return true;
            }
            return false;
        }
    }])
    .then(function(answer){
        var query = "SELECT id, product_name, stock_quantity FROM products WHERE ?"
        connection.query(query, [{id : answer.item}],
        function(err, res) {
            if (answer.amount > res[0].stock_quantity){
                console.log("Sorry, The requested product inventory is not Enough.");
                console.log( " Here are some Left :");
                console.log(" || item ID: " + res[0].id + " || Product: " + res[0].product_name + " || Current Stock: " + res[0].stock_quantity);
                readproducts();
            }else {
                console.log("Thanks For purchasing!");
                var query = "UPDATE products SET stock_quantity = stock_quantity - ? WHERE ? AND stock_quantity > 0";
                connection.query(query, [answer.chooseQuantity, {id: answer.item}],
                function(err, res) {
                    var query = "SELECT id, product_name, price FROM products WHERE ?";
                    connection.query(query, [{id : answer.item}],
                    function(err, res) {
                        if (err) throw err;
                        console.log(" || Item Id: " + res[0].id +
                    " || Product: " + res[0].product_name +
                    " || Price: $" + res[0].price +
                    " || Quantity: " + res[0].answer.chooseQuantity + 
                    " || Total Price: $" + res[0].price * parseFloat(answer.chooseQuantity));
                    connection.end()}
                    )
                }
                )
            };
        }
        )
    
    });
};