const mongoose = require("mongoose");
const { DateTime } = require("luxon")

const Schema = mongoose.Schema;

const MessageSchema = new Schema({
  title: {
    type: String,
    required: true,
    maxlength: 140,
  },
  time: {
    type: Date,
    default: Date.now,
    required: true,
  },
  text: {
    type: String,
    required: true,
    maxlength: 280,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

// Virtual for Message's formatted date
MessageSchema.virtual("date_ISO").get(function() {
  return DateTime.fromJSDate(this.date)
    .setZone("UTC")
    .toLocaleString(DateTime.DATETIME_MED)
})

// Virtual for Message's URL
MessageSchema.virtual("url").get(function () {
  return "/message/" + this._id;
});

// Export Model
module.exports = mongoose.model("Message", MessageSchema);
