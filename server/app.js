const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const db = require('./schema.js').db;
const CampaignModel = require('./schema.js').CampaignModel;

var dummyCampaignData = new CampaignModel({
  name: 'TEST - Dummy Campaign Data'
});
dummyCampaignData.missions.push({
  notAThing: 'this should fail, right?',
  mission: 'Mission 1',
  threatLevel: 2,
  rebelUpgradeComplete: true,
  empireUpgradeComplete: true,
});
var dummyMissionData2 = {
  notAThing: 'this DID fail!',
  mission: 'Mission 2',
  threatLevel: 3,
  rebelUpgradeComplete: false,
  empireUpgradeComplete: false,
};

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('we are connected.connection is go');
  // dummyCampaignData
  //   .save()
  //   .then(doc => {
  //     console.log('doc saved: ', doc);
  //     // How to add new mission data to Mongoose's mixed data type:
  //     CampaignModel.findByIdAndUpdate(
  //         doc._id,
  //         {$push: {missions: dummyMissionData2}},
  //         {safe: true, upsert: true, new: true}
  //       ).then(doc => {
  //         console.log('doc updated! ', doc);
  //       });
  //   })
  //   .catch(err => {
  //     console.log('err saving: ', err);
  //   });
});

const app = express();
const port = 3000;

// for parsing application/json
app.use(bodyParser.json());
// for parsing application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// for making client folder publicly available
app.use(express.static(path.join(__dirname, '../client')));

// set up routing for HTTP requests
app.get('/api/campaigns', (req, res) => {
  // use req.body to set db search params
  // just worried about dummy data for now so...
  CampaignModel
    .find()
    .then(campaigns => {
      res.status(200).send(campaigns);
    })
    .catch(err => {
      console.log('error fetching data from db: ', err);
      res.status(500).send('There was a problem fetching data from the database.');
    });
});

app.listen(port, () => {
  console.log('We are connected on port ', port);
});
