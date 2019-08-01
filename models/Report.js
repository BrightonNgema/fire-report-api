const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ReportSchema = new Schema({
  cellnumber: {
    type: String,
  },
  ipAddress: {
    type: String,
  },
  address: {
    fulladdress: {
      type: String,
    },
    geo: {
      lat: { type: String},
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
    default: Date.now
  }
});

module.exports = mongoose.model("Report", ReportSchema);
