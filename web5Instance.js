// web5Instance.js
let web5Instance;
let didInstance;

const setWeb5Instance = (web5) => {
  web5Instance = web5;
};

const setDidInstance = (did) => {
  didInstance = did;
};

const getWeb5Instance = () => {
  return web5Instance;
};

const getDidInstance = () => {
  return didInstance;
};

module.exports = {
  setWeb5Instance,
  setDidInstance,
  getWeb5Instance,
  getDidInstance,
};
