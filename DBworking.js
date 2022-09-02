const { MongoClient } = require('mongodb');


const db_link = "mongodb+srv://admin:nitin1234@events.smfe5uv.mongodb.net/?retryWrites=true&w=majority"

const client = new MongoClient(db_link);

const dbName = "Event";
const db = client.db(dbName);

(async function connection() {
  // Use connect method to connect to the server
  await client.connect();

})()
  .then(console.log("connnected"))
  .catch(console.error);

module.exports = {db,dbName}
