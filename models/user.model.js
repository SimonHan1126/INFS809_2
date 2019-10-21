const mongoose = require("mongoose");

const Schema = mongoose.Schema;

/**
 * Creates a JSON representation to send to MongoDB
 * Created by Ben Dagnin & James Hughes
 * */
const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            minlength: 3
        },

        password: {
            type: String,
            required: true,
            unique: false,
            trim: true,
            minlength: 8
        },
        islogin : {
            type: Boolean
        }
    },
  {
    timestamps: true
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
