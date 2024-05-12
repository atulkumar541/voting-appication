const Candidate = require("../models/candidate.js");
const Voter = require("../models/voters.js");

// check is admin

const checkAdminRole = async (userID) => {
  try {
    const user = await Voter.findById(userID);
    return user.role === "admin";
  } catch (error) {
    return false;
  }
};

// add candidate Profile function
const addCandidateProfile = async function (req, res) {
  try {
    // console.log(req.user);
    if (!(await checkAdminRole(req.user))) {
      return res.status(403).json("User does not have admin role");
    }
    const data = req.body;

    const newCandidate = new Candidate(data);
    const response = await newCandidate.save(newCandidate);
    res.status(200).json({ response: response });
  } catch (error) {
    console.log("Error while login person", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// candidate Profile update
const updateCandidateProfile = async function (req, res) {
  try {
    if (!(await checkAdminRole(req.user))) {
      return res.status(403).json("User does not have admin role");
    }

    const candidateId = req.params.candidateId; //ID from perameter
    const updateCandidateData = req.body; //extract current and new password from req body

    const response = await Candidate.findByIdAndUpdate(
      candidateId,
      updateCandidateData,
      { new: true, runValidators: true }
    );

    if (!response)
      return res.status(404).json({ error: "Candidate not found" });

    res.status(200).json(response);
  } catch (error) {
    console.log("Error while login person", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// candidate Profile delete
const deleteCandidateProfile = async function (req, res) {
  try {
    if (!(await checkAdminRole(req.user))) {
      return res.status(403).json("User does not have admin role");
    }

    const candidateId = req.params.candidateId; //ID from perameter
    const response = await Candidate.findByIdAndDelete(candidateId);
    if (!response)
      return res.status(404).json({ error: "Candidate not found" });

    res
      .status(200)
      .json({ message: "Candidate delete successfully", response: response });
  } catch (error) {
    console.log("Error while login person", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// vote to candidate

const voteToCandidate = async function (req, res) {
  try {
    const candidateId = req.params.candidateId;
    const voterId = req.user;
    console.log(voterId);

    // find candidate
    const candidate = await Candidate.findById(candidateId);
    if (!candidate)
      return res.status(404).json({ message: "Candidate not found" });

    const voter = await Voter.findById(voterId);
    if (!voter) return res.status(404).json({ message: "Voter not found" });

    if (voter.isVoted)
      return res.status(404).json({ message: "You have already voted" });

    if (voter.role == "admin")
      return res.status(404).json({ message: "admin is not allowed to vote" });

    // update the candidate vote count

    candidate.votes.push({ voter: voterId });
    candidate.voteCount++;
    await candidate.save();

    //update the user document

    console.log(Voter);
    voter.isVoted = true;
    await voter.save();

    res.status(200).json("Vote recorded successfully");
  } catch (error) {
    console.log(error);
    res.status(500).json("Internal server error");
  }
};

// vote count

const voteToCount = async function (res, res) {
  try {
    const candidate = await Candidate.find().sort({ voteCount: "desc" });
    const voteRecord = candidate.map((data) => {
      return {
        party: data.party,
        count: data.voteCount,
      };
    });

    res.status(200).json({ voteRecord });
  } catch (error) {
    res.status(500).json("Internal server error");
  }
};

const getCandidates = async function (res, res) {
  try {
    const candidate = await Candidate.find();
    const Record = candidate.map((data) => {
      return {
        name: data.name,
        party: data.party,
        age: data.age,
      };
    });

    res.status(200).json({ Record });
  } catch (error) {
    res.status(500).json("Internal server error");
  }
};

module.exports = {
  addCandidateProfile,
  updateCandidateProfile,
  deleteCandidateProfile,
  voteToCandidate,
  voteToCount,
  getCandidates,
};
