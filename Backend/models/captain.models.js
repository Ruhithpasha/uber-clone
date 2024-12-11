import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const captainSchema = new mongoose.Schema({
  fullName: {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },

  socketId: {
    type: String,
    default: null,
  },
  status: {
    type: String,
    enum: ["offline", "online"],
    default: "offline",
  },

  vehicle: {
    colour: {
      type: String,
      required: true,
    },
    capacity: {
      type: Number,
      min: [1,"Capacity must be atleast 1"],
      required: true,
    },
    plate: {
      type: String,
      required: true,
    },
    vehicleType: {
      type: String,
      enum: ["car", "bike", "auto"],
      required: true,
    },
  },
  location: {
    lat: {
      type: Number,
    },
    long:{
        type:Number,
    }
  },
});

captainSchema.methods.generateAuthToken = async function () {
  const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET);
  return token;
};

captainSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

captainSchema.statics.hashPassword = async function (password) {
  return await bcrypt.hash(password, 10);
};

const captainModel = mongoose.model("Captain", captainSchema);

export default captainModel;
