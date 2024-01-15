config = {};


const getConfig = (key) => {
  if (key) {
    return config[key];
  } else {
    return config;
  }
};

const setConfig = (keyOrObject, value) => {
    if (typeof keyOrObject === 'string') {
      // Update a single key
      config[keyOrObject] = value;
    } else if (typeof keyOrObject === 'object' && keyOrObject !== null) {
      // Update multiple keys
      config = { ...config, ...keyOrObject };
    } else {
      throw Error('Invalid arguments provided to setConfig.');
    }
};

module.exports = {
    getConfig, setConfig
}