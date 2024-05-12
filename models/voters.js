const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const voterSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name must be required!"],
    },
    age: {
      type: Number,
      required: [true, "Age must be required!"],
    },
    email: {
      type: String,
      unique: [true, "Email must be Unique!"],
    },
    mobile: {
      type: String,
    },
    address: {
      type: String,
      required: [true, "Address must be required!"],
    },
    aadharCardNumber: {
      type: String,
      required: [true, "Aadhar Card Number must be required!"],
      unique: [true, "Aadhar Card Number must be unique!"],
    },
    password: {
      type: String,
      required: [true, "Password must be required!"],
    },
    role: {
      type: String,
      enum: ["voter", "admin"],
      default: "voter",
    },
    isVoted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

voterSchema.pre("save", async function (next) {
  const person = this;
  // hash password only when person is modified or new

  if (!person.isModified("password")) return next();

  try {
    //hash password  generation
    const salt = await bcrypt.genSalt(10);

    //hash password
    const hashedPassword = await bcrypt.hash(person.password, salt);

    // override the plain password with hash password
    person.password = hashedPassword;

    next();
  } catch (error) {
    return next(error);
  }
});

voterSchema.methods.comparePassword = async function (candidatePassword) {
  try {
    const isMatch = await bcrypt.compare(candidatePassword, this.password);
    return isMatch;
  } catch (error) {
    throw error;
  }
};

const Voter = mongoose.model("voter", voterSchema);
module.exports = Voter;
