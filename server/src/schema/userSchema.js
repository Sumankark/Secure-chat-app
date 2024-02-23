import { Schema } from "mongoose";

let userSchema = Schema(
  {
    name: {
      type: String,
      required: [true, "name field is required."],
    },
    email: {
      type: String,
      required: [true, "email field is required."],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "password field is required."],
    },
    gender: {
      type: String,
      enum: ["male", "female", "other"],
      required: [true, "gender field is required."],
    },
    dob: {
      type: Date,
      required: [true, "dob filed is required."],
    },
    phoneNumber: {
      type: Number,
      required: [true, "Number field is required."],
    },
    pic: {
      type: String,
      required: true,
      default: () => {
        return "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg";
      },
    },
    roles: {
      type: String,
      required: true,
      default: "",
    },
    isVerifiedEmail: {
      type: String,
      required: [true, "isVerifiedEmail field is required."],
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export default userSchema;
