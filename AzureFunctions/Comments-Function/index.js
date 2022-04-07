/*module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    const name = (req.query.name || (req.body && req.body.name));
    const responseMessage = name
        ? "Hello, " + name + ". This HTTP triggered function executed successfully."
        : "This HTTP triggered function executed successfully. Pass a name in the query string or in the request body for a personalized response.";

    context.res = {
        // status: 200, /* Defaults to 200 *
        body: responseMessage
    };

    function UserAction() {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
             if (this.readyState == 4 && this.status == 200) {
                 alert(this.responseText);
             }
        };
        xhttp.open("POST", "https://trighttp.azurewebsites.net/api/CommentQuery", true);
        xhttp.setRequestHeader("Content-type", "application/json");
        // xhttp.send("Your JSON Data Here");
    }

    /*using System.Net;
    public static async Task<HttpResponseMessage> Run(HttpRequestMessage req, TraceWriter log)
    {
    log.Info("C# HTTP trigger function processed a request.");
    // parse query parameter
    string name = req.GetQueryNameValuePairs().FirstOrDefault(q => string.Compare(q.Key, "name", true) == 0).Value;
    if (name == null)
    {
        // Get request body
        dynamic data = await req.Content.ReadAsAsync<object>();
        name = data?.name;
    }
    return name == null ? req.CreateResponse(HttpStatusCode.BadRequest, "Please pass a name on the query string or in the request body")
        : req.CreateResponse(HttpStatusCode.OK, "Hello " + name);
    }*/


    /*// app.post() Method Demo Example
    // Importing the express module
    const express = require('express');

    // Initializing the express and port number
    var app = express();
    // Initializing the router from express
    var router = express.Router();
    var PORT = 8080;

    // Creating a POST request
    app.post('https://trighttp.azurewebsites.net/api/CommentQuery', (req, res) => {
    console.log("POST Request Called for /api endpoint")
    res.send("POST Request Called")
    })

    // App listening on the below port
    app.listen(PORT, function(err){
    if (err) console.log(err);
    console.log("Server listening on PORT", PORT);
    });*/

    /*const express = require('express');
    const app = express();
    app.listen(3000, () => console.log('Listening on port 3000!'));
    app.use(express.static('public'));
    app.use(express.json());
    app.post('/api/CommentQuery', (req, res) => {
        console.log("POST Request Called for /api endpoint")
        res.send("POST Request Called")
    });*

    // fetch('https://trighttp.azurewebsites.net/api/CommentQuery', {method: 'POST'})
    // .then(result => result.json())
    // .then(data => console.log(result));
}*/

const { ObjectID } = require('mongodb');
const createClient = require('../shared/mongo'); // how to get shared file for mongo db on azure??
 
module.exports = async function (context, req){
   const { id } = req.params
   const Comments_message = req.body || {}
 
   if (!id || !Comments) {
       context.res = {
           status: 400,
           body: 'Fields Required'
       }
       return;
   }
   const {db,connection} = await createClient()
   const commentDB = db.collection('Comments')
 
   switch(req.method){
       case "PUT":
       try {
           const token = await commentDB.findOneAndUpdate(
               { _id: ObjectId(id) },
               { $set: Comments_message}
               )
               connection.close()
               context.res = {
                   status: 200,
                   body: token
               }
           } catch (error) {
               context.res = {
                   status: 500,
                   body: "Error Adding comment"
               }
           }
           break;
      
       case "GET":
           const res = await commentDB.find({}).limit(100) //grabs 100 comments
           constbody = await res.toArray(); //puts 100 comments in array
           connection.close()
           context.res = { status: 200,
           body //100 comments returned to the site
       }
       break;
 
       case "POST":
       try{
           const c = await commentDB.insert(Comments_message)
           connection.close()
           context.res = {
               status: 201,
               body: c.ops[0]
           }
       }
           catch (error) {
           context.res = {
               status: 500,
               body: "Error Updating comment"
           }
       }
       break;
 
       case "DELETE":
           try{
               commentDB.findOneAndDelete({_id: ObjectId(id) })
               connection.close()
               context.res = {
                   status: 204
               }
           }
           catch (error) {
               context.res = {
                   status: 500,
                   body: "Error Deleting comment"
               }
       }
   }
}
