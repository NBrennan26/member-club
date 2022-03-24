const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator")

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
    unique: true,
    uniqueCaseInsensitive: true,
  },
  password: {
    type: String,
    required: true,
    select: false, // This will not include password when pulling a users info. Manually pull it with ".select('+password')"
  },
  member: {
    type: Boolean,
  },
  admin: {
    type: Boolean,
  }
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

// Apply uniqueValidator plugin to UserSchema
UserSchema.plugin(uniqueValidator, { message: "Username is already taken" })

// Export Model
module.exports = mongoose.model("User", UserSchema);
