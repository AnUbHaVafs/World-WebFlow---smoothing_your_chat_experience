const SetFlowModal = require("../models/setFlowModal");

const setFlowMessages = async () => {
  try {
    const userSetFlows = await SetFlowModal.find({});
    console.log("userSetFlows", userSetFlows);
  } catch (error) {
    console.log(error.message);
  }
};

module.export = { setFlowMessages };
