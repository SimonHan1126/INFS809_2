/**
 * Model class for the repository
 * Created by James Hughes
 * */
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const repoSchema = new Schema(
    {

        papername: { type: String, required: true },
        //pubdate: { type: String, required: true },
        journal: { type: String, required: true },
        bibloref: { type: String, required: true },
        authors: { type: String, required: true },
        field: {type: String, required: true}

    },
    {
        timestamps: true
    }
);

const Repo = mongoose.model("Repo", repoSchema);

module.exports = Repo;