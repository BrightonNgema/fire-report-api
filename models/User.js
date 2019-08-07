const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  cellnumber: {
      type: String,
      required:true
  },
    deviceId: {
        type: String,
        required:true
  },
  createdDate: {
    type: Date,
    default: new Date().toLocaleString()
  }
});

module.exports = mongoose.model("User", UserSchema);
