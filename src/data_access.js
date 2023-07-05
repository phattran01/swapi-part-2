// mongodb client driver
const { MongoClient } = require('mongodb');

// DB Connection URL
var url = "mongodb://localhost:27017";

// Create client
const client = new MongoClient(url);

// Database and collection variables
const dbName = "swapi";
const collectionName = "planets"

// connect to the db server
await client.connect();

// set the database to use
const db = client.db(dbName);
// set the collection to use
const collection = db.collection(collectionName);

