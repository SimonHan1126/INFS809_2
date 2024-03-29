const mongoose = require("mongoose");

const Schema = mongoose.Schema;

/**
 * Created by Simon
 * */
const whitelistSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            minlength: 3
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("whitelist", whitelistSchema);
