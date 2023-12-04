const mongoose = require("mongoose");

const setFlowMoal = mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    message: { type: String, trim: true, required: true },
    receivers: [
      { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    ],
    flowTime: { type: String, required: true },
  },
  { timestamps: true }
);

const SetFlowModal = mongoose.model("SetFlowModal", setFlowMoal);

module.exports = SetFlowModal;
