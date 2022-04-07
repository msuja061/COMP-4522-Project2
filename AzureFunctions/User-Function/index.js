module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    const name = (req.query.name || (req.body && req.body.name));
    const responseMessage = name
        ? "Hello, " + name + ". This HTTP triggered function executed successfully."
        : "This HTTP triggered function executed successfully. Pass a name in the query string or in the request body for a personalized response.";

    context.res = {
        // status: 200, /* Defaults to 200 */
        body: responseMessage
    };

    /*// newly added; testing
    const { Connection, Request } = require("tedious");
 
    // Create connection to database
    const config = {
     authentication: {
       options: {
         userName: "sqladminuser",
         password: "hwu48Vqp"
       },
       type: "default"
     },
     server: "comp4522-sqlserver.database.windows.net", // update me
     options: {
       database: "UserDB", //update me
       encrypt: true
     }
    };
     
     
    const connection = new Connection(config);
     
    // Attempt to connect and execute queries if connection goes through
    connection.on("connect", err => {
     if (err) {
       console.error(err.message);
     } else {
       queryDatabase();
     }
    });
     
    connection.connect();
     
    function queryDatabase() {
     console.log("Reading rows from the Table...");
     
     // Read all rows from table
     const request = new Request(
       `SELECT TOP (20) [id]
       ,[userName]
       ,[firstName]
       ,[lastName]
       ,[timeAdded]
       ,[dateAdded]
    FROM [dbo].[Users]`,
       (err, rowCount) => {
         if (err) {
           console.error(err.message);
         } else {
           console.log(`${rowCount} row(s) returned`);
         }
       }
     );
     
     request.on("row", columns => {
       columns.forEach(column => {
         console.log("%s\t%s", column.metadata.colName, column.value);
       });
     });
     
    //  connection.execSql(request);*/
    
}