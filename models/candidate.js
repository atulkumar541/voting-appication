const mongoose = require("mongoose");

const candidateSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name must be required!"],
  },
  party: {
    type: String,
    required: [true, "Party Name must be required!"],
  },
  age: {
    type: Number,
    required: [true, "Age must be required!"],
  },
  votes: [
    {
      voter: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "voter",
        required: true,
      },
      votedAt: {
        type: Date,
        default: Date.now(),
      },
    },
  ],
  voteCount: {
    type: Number,
    default: 0,
  },
});
const Candidate = mongoose.model("candidate", candidateSchema);
module.exports = Candidate;
