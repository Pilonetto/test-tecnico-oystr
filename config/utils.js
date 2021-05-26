const fs = require('fs');

module.exports = class Utils {
  static async getWebHook() {
    return new Promise(async (resolve, reject) => {
      let cfg;
      try {
        if (fs.existsSync('./cfg.json')) {
          let rawdata = fs.readFileSync('./cfg.json');
          cfg = JSON.parse(rawdata);
          resolve(cfg.webhook);
        }
      } catch (error) {
        resolve('https://webhook.site/bcdc39f6-60f5-4b44-80a2-8e46a36fdefc'); // Sim, se der erro ele resolve a promisse com o endereço padrão
      }
    });
  }
};
