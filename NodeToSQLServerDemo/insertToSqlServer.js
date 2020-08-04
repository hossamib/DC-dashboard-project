const sql = require('mssql');
const fs = require('fs');
var rawdata = fs.readFileSync('staffs.json');
var staffdata = JSON.parse(rawdata); // import staffs data from external json file 


const dbConfig = {
    server: "localhost\\SQLEXPRESS",
    database: "BikeStores",
    user: "dev",
    password: "Dev@1234",

    options: {
        enableArithAbort: true
    }
}

// const sales = {
//     first_name: 'Hossam',
//     last_name: 'Ibrahim',
//     email: 'hossam.ibrahim@bikes.shop',
//     phone: '(516) 379-7777',
//     active: 1,
//     store_id: 3,
//     manager_id: 5
// }


//Insert data to database in query statement..........
// function insertRow() {

//     var dbConn = new sql.ConnectionPool(dbConfig);

//     dbConn.connect().then(function() {

//         var transaction = new sql.Transaction(dbConn);

//         transaction.begin().then(function() {

//             var request = new sql.Request(transaction);

//             request.query("Insert into sales.staffs (first_name,last_name,email,phone,active,store_id,manager_id) values ('Ahmed','Tarek','A.tarek@bikes.shop','(516) 379-8888',1,1,2)")
//                 .then(function() {

//                     transaction.commit().then(function(recordSet) {
//                         console.log(recordSet);
//                         dbConn.close();
//                     }).catch(function(err) {

//                         console.log("Error in Transaction Commit " + err);
//                         dbConn.close();
//                     });
//                 }).catch(function(err) {

//                     console.log("Error in Transaction Begin " + err);
//                     dbConn.close();
//                 });

//         }).catch(function(err) {

//             console.log(err);
//             dbConn.close();
//         });
//     }).catch(function(err) {

//         console.log(err);
//     });
// }

// insertRow();

// insert data in database with prameters.........

function insertRow() {

    var dbConn = new sql.ConnectionPool(dbConfig);

    dbConn.connect().then(function() {

        var transaction = new sql.Transaction(dbConn);

        transaction.begin().then(function() {

            var request = new sql.Request(transaction)
                .input('fname', sql.VarChar, staffdata.first_name)
                .input('lname', sql.VarChar, staffdata.last_name)
                .input('email', sql.VarChar, staffdata.email)
                .input('phone', sql.VarChar, staffdata.phone)
                .input('active', sql.Int, staffdata.active)
                .input('storeid', sql.Int, staffdata.store_id)
                .input('managerid', sql.Int, staffdata.manager_id)
                .query("Insert into sales.staffs (first_name,last_name,email,phone,active,store_id,manager_id) values (@fname, @lname, @email, @phone, @active, @storeid, @managerid)")
                .then(function() {

                    transaction.commit().then(function(recordSet) {
                        console.log(recordSet);
                        dbConn.close();
                    }).catch(function(err) {

                        console.log("Error in Transaction Commit " + err);
                        dbConn.close();
                    });
                }).catch(function(err) {

                    console.log("Error in Transaction Begin " + err);
                    dbConn.close();
                });

        }).catch(function(err) {

            console.log(err);
            dbConn.close();
        });
    }).catch(function(err) {

        console.log(err);
    });
}

insertRow();