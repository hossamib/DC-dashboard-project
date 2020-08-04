const sql = require('mssql');

const dbConfig = {
    server: "localhost\\SQLEXPRESS",
    database: "BikeStores",
    user: "dev",
    password: "Dev@1234",

    options: {
        enableArithAbort: true
    }
}

// Load data from database.........
sql.connect(dbConfig, function(err) {

    if (err) console.log(err);

    // create Request object
    var request = new sql.Request();

    // query to the database and get the records
    request.query('select * from sales.staffs', function(err, recordset) {

        if (err) console.log(err)

        // send records as a response
        console.log(recordset);

    });
});