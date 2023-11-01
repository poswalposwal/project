const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/airbnb";

main().then( () => {
  console.log("connect to DB");
}).catch( err => {
  console.log(err);
});

async function main() {
  await  mongoose.connect(MONGO_URL);
}

const initDB = async () => {
  await Listing.deleteMany({});
 initData.data = initData.data.map((obj) => ({...obj, owner: "653d4f6d6a6b4abf716b4324"}));
  await Listing.insertMany(initData.data);
  console.log("data was saved");  
}

initDB();