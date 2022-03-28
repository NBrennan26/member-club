const mongoose = require("mongoose");
const { DateTime } = require("luxon")

const Schema = mongoose.Schema;

const MessageSchema = new Schema({
  title: {
    type: String,
    maxlength: 140,
    required: true,
  },
  content: {
    type: String,
    maxlength: 280,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

// Virtual for Message's formatted date
MessageSchema.virtual("date_ISO").get(function() {
  return DateTime.fromJSDate(this.timestamp)
    .setZone("UTC")
    .toLocaleString(DateTime.DATETIME_MED)
})

// Virtual for Message's URL
MessageSchema.virtual("url").get(function () {
  return "/message/" + this._id;
});

// Export Model
module.exports = mongoose.model("Message", MessageSchema);
