const Voter = require("./../models/voters.js");
const { jwtAuthMiddleware, generateToken } = require("./../jwt.js");

// singup function

const voterSingup = async (req, res) => {
  try {
    const data = req.body;
    const newVoter = new Voter(data);
    const response = await newVoter.save();
    // create token
    const token = generateToken(response.id);
    res.status(200).json({ response: response, token: token });
  } catch (error) {
    console.log("Error while store Voter", error);
    res.status(500).json(error);
  }
};

// voter Login function

const voterLogin = async function (req, res) {
  try {
    const { aadharCardNumber, password } = req.body;

    const user = await Voter.findOne({ aadharCardNumber });
    if (!user) return res.status(401).json("User not exist");

    if (!user || !(await user.comparePassword(password)))
      return res.status(401).json({ error: "Invalid username or password" });

    const token = generateToken(user.id);
    res.json({ token });
  } catch (error) {
    console.log("Error while login person", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// voter Profile function

const voterProfile = async function (req, res) {
  try {
    const userData = req.user;
    const userId = userData.id;
    const voter = await Voter.findById(userId);
    res.status(200).json({ voter });
  } catch (error) {
    console.log("Error while login person", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// voter Profile password change

const voterPasswordChange = async function (req, res) {
  try {
    const userId = req.user; //extract id from token
    const { currentPaasword, newPassword } = req.body; //extract current and new password from req body

    const voter = await Voter.findById(userId);

    if (!(await user.comparePassword(password)))
      return res.status(401).json({ error: "Invalid password" });

    user.password = newPassword;
    await user.save();

    res.status(200).json({ message: "Password updated" });
  } catch (error) {
    console.log("Error while login person", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { voterSingup, voterLogin, voterProfile, voterPasswordChange };
