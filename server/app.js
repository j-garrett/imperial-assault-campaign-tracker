const express = require('express');
const path = require('path');

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
  dummyCampaignData
    .save()
    .then(doc => {
      console.log('doc saved: ', doc);
      // How to add new mission data to Mongoose's mixed data type:
      CampaignModel.findByIdAndUpdate(
          doc._id,
          {$push: {missions: dummyMissionData2}},
          {safe: true, upsert: true, new: true}
        ).then(doc => {
          console.log('doc updated! ', doc);
        });
    })
    .catch(err => {
      console.log('err saving: ', err);
    });
});

const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, '../client')));

app.listen(port, () => {
  console.log('We are connected on port ', port);
});
