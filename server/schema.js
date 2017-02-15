var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var campaignSchema = new Schema({
  missions: [new Schema({
    mission: String,
    threatLevel: Number,
    rebelUpgradeComplete: Boolean,
    empireUpgradeComplete: Boolean,
  })],
});

var Campaign = mongoose.model('Campaign', campaignSchema);

mongoose.connect('127.0.0.1:27017');

module.exports = mongoose.connection;
