const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const newuserSchema = mongoose.Schema(
  {
    name: { type: String },
    email: { type: String, unique: true, required: true },
    isEmailVerified: { type: Boolean, required: true },
    linkedin: { type: String },
    github: { type: String },
    twitter: { type: String },
    quora: { type: String },
    phone: { type: Number },
    location: { type: String },
    codeChef: { type: String },
    leetcode: { type: String },
    codeforces: { type: String },
    personalSites: { type: String },
    blogs: { type: String },
    description: { type: String },
    currentDesignation: { type: String },
    university: { type: String },
    passion: { type: String },
    spareTimeActivities: { type: String },
    yearsOfExperience: { type: String },
    projectsLinks: [{ link: String, name: String, description: String }],
    programmingLang: [{ lang: String }],
    openToCollaboration: { type: String },
    pic: {
      type: "String",
      default:
        "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestaps: true }
);

const NewUser = mongoose.model("NewUser", newuserSchema);

module.exports = NewUser;
