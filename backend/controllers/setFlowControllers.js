const asyncHandler = require("express-async-handler");
const SetFlowModal = require("../models/setFlowModal");

//@description     Fetch all flows for a user
//@route           GET /api/flow/
//@access          Protected
const fetchSetFlows = asyncHandler(async (req, res) => {
  try {
    const userSetFlows = await SetFlowModal.find({});
    console.log("userSetFlows", userSetFlows);
    res.status(200).send(userSetFlows);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

//@description     Create New Set Flow
//@route           POST /api/flow/
//@access          Protected
const setNewFlow = asyncHandler(async (req, res) => {
  try {
    const createdSetFlow = await SetFlowModal.create({
      sender: req.user._id,
      message: req.body.message,
      receivers: req.body.receivers,
      flowTime: req.body.flowTime,
    });
    res.status(200).send(createdSetFlow);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

module.exports = {
  fetchSetFlows,
  setNewFlow,
};
