var express = require('express');
var app = express();

app.use(express.json()); //Parse JSON body

// get planet 
app.get("/api/planets", (req, res) => {
  res.send('Venus')
  });

// server start-up
const port = 4000
console.log("Open a browser to http://localhost:"+port+" to view the application");
app.listen(port);