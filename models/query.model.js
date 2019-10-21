/**
 * Schema for a specialized query
 * Created by James Hughes
 * */
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const QuerySchema = new Schema(
    {

        operator: { type: String, required: true },
        startTime: { type: Date, required: true },
        endTime: { type: Date, required: true },
        field: { type: String, required: true },
        text: { type: [String], required: true },
        andOr: { type: String, required: true }

    },

    {
        timestamps: true
    }
);

module.exports = mongoose.model("Query", QuerySchema);
