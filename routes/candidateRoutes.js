const express = require("express");
const { jwtAuthMiddleware } = require("./../jwt.js");
const candidateRouter = express.Router();

const {
  addCandidateProfile,
  updateCandidateProfile,
  deleteCandidateProfile,
  voteToCandidate,
  voteToCount,
  getCandidates,
} = require("../controllers/candidateController.js");

candidateRouter.post("/", jwtAuthMiddleware, addCandidateProfile);
candidateRouter.put("/:candidateId", jwtAuthMiddleware, updateCandidateProfile);
candidateRouter.delete(
  "/:candidateId",
  jwtAuthMiddleware,
  deleteCandidateProfile
);
candidateRouter.post("/vote/:candidateId", jwtAuthMiddleware, voteToCandidate);
candidateRouter.get("/vote/count", voteToCount);
candidateRouter.get("/", getCandidates);

module.exports = candidateRouter;
