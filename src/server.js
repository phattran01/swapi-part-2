var express = require('express');
var MongoClient = require('mongodb').MongoClient;
var app = express();

app.use(express.static('./public'))
app.use(express.json()); //Parse JSON body

var db;

// Initialize connection once at the top of the script
MongoClient.connect("mongodb://localhost:27017/swapi", function(err, client) {
  if(err) throw err;

  db = client.db();

  // Start the application after the database connection is ready
  const port = 4000;
  app.listen(port);
  console.log("Open a browser to http://localhost:"+port+" to view the application");
});

// ROUTES
app.get("/api/characters", (req, res) => {
  db.collection('characters').find().toArray(function(err, result) {
    if (err) throw err;
    res.send(result);
  });
});

app.get("/api/films", (req, res) => {
  db.collection('films').find().toArray(function(err, result) {
    if (err) throw err;
    res.send(result);
  });
});

app.get("/api/planets", (req, res) => {
  db.collection('planets').find().toArray(function(err, result) {
    if (err) throw err;
    res.send(result);
  });
});

app.get("/api/characters/:id", (req, res) => {
  var id = parseInt(req.params.id); // parse the "id" from the URL and convert it to an integer
  db.collection('characters').findOne({id: id}, function(err, result) {
    if (err) throw err;
    res.send(result);
  });
});

app.get("/api/films/:id", (req, res) => {
  var id = parseInt(req.params.id);
  db.collection('films').findOne({id: id}, function(err, result) {
    if (err) throw err;
    res.send(result);
  });
});

app.get("/api/planets/:id", (req, res) => {
  var id = parseInt(req.params.id);
  db.collection('planets').findOne({id: id}, function(err, result) {
    if (err) throw err;
    res.send(result);
  });
});
// NEEDS WORK
app.get("/api/films/:id/characters", async (req, res) => {
  var id = parseInt(req.params.id);

  try {
    // Find the association documents
    let filmCharacterDocs = await db.collection('films_characters').find({film_id: id}).toArray();

    // Extract the character IDs
    let characterIds = filmCharacterDocs.map(doc => doc.character_id);

    // Query for the characters
    let characters = await db.collection('characters').find({id: { $in: characterIds }}).toArray();

    res.send(characters);
  }
  catch (err) {
    console.error(err);
    res.status(500).send('Error while fetching characters');
  }
});

app.get("/api/films/:id/planets", async (req, res) => {
  var id = parseInt(req.params.id);

  try {
    // Find the association documents
    let filmPlanetsDocs = await db.collection('films_planets').find({film_id: id}).toArray();

    // Extract the planets IDs
    let planetIds = filmPlanetsDocs.map(doc => doc.planet_id);

    // Query for the characters
    let planets = await db.collection('planets').find({id: { $in: planetIds }}).toArray();

    res.send(planets);
  }
  catch (err) {
    console.error(err);
    res.status(500).send('Error while fetching planets');
  }
});

app.get("/api/characters/:id/films", async (req, res) => {
  var id = parseInt(req.params.id);
  
  try {
    // Get the character's data
    let character = await db.collection('characters').findOne({id: id});
    
    // If the character doesn't exist, return a 404
    if (!character) {
      return res.status(404).send('Character not found');
    }

    // Find the association documents
    let filmCharacterDocs = await db.collection('films_characters').find({character_id: id}).toArray();

    // Extract the film IDs
    let filmIds = filmCharacterDocs.map(doc => doc.film_id);

    // Query for the films
    let films = await db.collection('films').find({id: { $in: filmIds }}).toArray();

    res.send(films);
  }
  catch (err) {
    console.error(err);
    res.status(500).send('Error while fetching films');
  }
});

app.get("/api/planets/:id/films", async (req, res) => {
  var id = parseInt(req.params.id);
  
  try {
    // Get the character's data
    let planet = await db.collection('planets').findOne({id: id});
    
    // If the character doesn't exist, return a 404
    if (!planet) {
      return res.status(404).send('Character not found');
    }

    // Find the association documents
    let filmCharacterDocs = await db.collection('films_planets').find({planet_id: id}).toArray();

    // Extract the film IDs
    let filmIds = filmCharacterDocs.map(doc => doc.film_id);

    // Query for the films
    let films = await db.collection('films').find({id: { $in: filmIds }}).toArray();

    res.send(films);
  }
  catch (err) {
    console.error(err);
    res.status(500).send('Error while fetching films');
  }
});

app.get("/api/planets/:id/characters", async (req, res) => {
  var id = parseInt(req.params.id);

  try {
    // Get the planet's data
    let planet = await db.collection('planets').findOne({id: id});
    
    // If the planet doesn't exist, return a 404
    if (!planet) {
      return res.status(404).send('Planet not found');
    }

    // Find characters originating from this planet
    let characters = await db.collection('characters').find({homeworld: id}).toArray();

    res.send(characters);
  }
  catch (err) {
    console.error(err);
    res.status(500).send('Error while fetching characters');
  }
});