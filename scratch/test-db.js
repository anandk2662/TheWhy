const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://anandk2534_db_user:vPBwRxIpa6hEB9RQ@cluster0.axenyqr.mongodb.net/";

async function test() {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    console.log("Connected successfully to server");
    await client.close();
  } catch (e) {
    console.error("Connection failed:", e);
  }
}

test();
