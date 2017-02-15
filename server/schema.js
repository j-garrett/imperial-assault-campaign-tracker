var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var missionSchema = new Schema({
  mission: String,
  threatLevel: Number,
  rebelUpgradeComplete: Boolean,
  empireUpgradeComplete: Boolean,
});

var campaignSchema = new Schema({
  name: String,
  missions: [missionSchema],
});

var Campaign = mongoose.model('Campaign', campaignSchema);

mongoose.connect('127.0.0.1:27017');

module.exports = {
  db: mongoose.connection,
  CampaignModel: Campaign,
};
