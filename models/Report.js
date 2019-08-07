const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ReportSchema = new Schema({
  cellnumber: {
    type: String
  },
  ipAddress: {
    type: String
  },
  deviceId: {
    type: String,
    required:true
  },
  address: {
    fulladdress: {
      type: String
    },
    geo: {
      lat: { type: String },
      lng: { type: String }
    }
  },
  level: {
    type: String,
    default: "LOW"
  },
  status: {
    type: String,
    default: "PENDING"
  },
  createdDate: {
    type: Date,
    default: new Date()
  }
});

module.exports = mongoose.model("Report", ReportSchema);
