const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  first_name: {
    type: String,
    required: true,
    maxlength: 50,
  },
  last_name: {
    type: String,
    required: true,
    maxlength: 50,
  },
  username: {
    type: String,
    required: true,
    maxlength: 50,
  },
  password: {
    type: String,
    required: true,
    select: false, // This will not include password when pulling a users info. Manually pull it with ".select('+password')"
  },
  member_status: {
    type: Boolean,
    default: true,
  },
});

// Virtual for User's Full Name
UserSchema.virtual("fullname").get(function () {
  let fullname = this.first_name + " " + this.last_name;
  return fullname;
});

// Virtual for User's URL
UserSchema.virtual("url").get(function () {
  return "/user/" + this._id;
});

// Export Model
module.exports = mongoose.model("User", UserSchema);
