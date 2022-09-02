const express = require("express");
const { Router } = require("express");
var { ObjectId } = require('mongodb');
const DataBase = require("./DBworking");
const bodyParser = require("body-parser");
const { db, dbName } = require("./DBworking");
const dbCollection = db.collection('event');


const app = express();
const Port = 3000;

app.use(express.json());
app.use(bodyParser.json());


app.get("/api/v3/app/event", async (req, res) => {
  let objQuery = req.query;
  if (objQuery.length == 1) {
    let _id = req.query.id;
    const findResult = await dbCollection.find({ "_id": ObjectId(_id) }).toArray()
      .then(() => {
        console.log("Success FUll");
      })
      .catch((err) => {
        console.log(err);
      });
    res.json({
      result: findResult
    })
  }
  else {
    let type = req.query.type;
    let limit = parseInt(req.query.limit);
    let page = parseInt(req.query.page);
    const findResult = await dbCollection.find({ "type": type, "limit": limit, "page": page }).toArray()
      .then(() => {
        console.log("Success FUll");
      })
      .catch((err) => {
        console.log(err);
      });
    res.json({
      result: findResult
    })
  }

})


// app.post('/',(req,res)=>{
//   console.log(req.body);
// })

app.post("/api/v3/app/event", async (req, res) => {
  let x = ObjectId();
  const insertResult = await dbCollection.insertOne({ _id: x, name: req.body.name, files: req.body.files, tagline: req.body.tagline, schedule: req.body.schedule, descirption: req.body.descirption, moderator: req.body.moderator, category: req.body.category, sub_category: req.body.sub_category, rigor_rank: parseInt(req.body.rigor_rank) })
    .then(() => {
      console.log("Success FUll");
    })
    .catch((err) => {
      console.log(err);
    });
  console.log('Inserted documents =>', insertResult);
  console.log(req.body);
  res.json({
    "Posted and _id is": x
  });
});


app.put("/api/v3/app/event/:id", (req, res) => {
  const result = dbCollection.updateOne({ _id: ObjectId(req.params.id) }, { $set: { name: req.body.name, files: req.body.files, tagline: req.body.tagline, schedule: req.body.schedule, descirption: req.body.descirption, moderator: req.body.moderator, category: req.body.category, sub_category: req.body.sub_category, rigor_rank: parseInt(req.body.rigor_rank) } })
    .then(() => {
      console.log("Success FUll");
    })
    .catch((err) => {
      console.log(err);
    });
  res.json({
    result: result
  })
});


app.delete("/api/v3/app/event/:id", (req, res) => {
  const deletedResult = dbCollection.deleteOne({ _id: ObjectId(req.params.id) })
    .then(() => {
      console.log("Success Full");
    })
    .catch((err) => {
      console.log(err);
    });

  res.json({
    result: deletedResult
  })

})

app.listen(Port)