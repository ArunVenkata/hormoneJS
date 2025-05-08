class Configuration {
    #config;
    static #instance;
    constructor() {
        if (Configuration.#instance) {
            return Configuration.#instance;
        }
        this.#config = {};
        Configuration.#instance = this;
    }
  
    get(key) {
        if (key) {
            return this.#config[key];
        } else {
            return this.#config;
        }
    }
  
    set(keyOrObject, value) {
        if (typeof keyOrObject === 'string') {
            this.#config[keyOrObject] = value;
        } else if (typeof keyOrObject === 'object' && keyOrObject !== null) {
            this.#config = { ...this.#config, ...keyOrObject };
        } else {
            throw Error('Invalid arguments provided to Config.set.');
        }
    }
  }
  
  const Config = new Configuration();
  export default Config;