const DbCtrl = require('../config/db');
const Utils = require('../config/utils');
const axios = require('axios');

module.exports = class Notifications {
  static async create(data) {
    return new Promise(async (resolve, reject) => {
      const { evt, execution, owner, bot } = data;
      try {
        const webHook = await Utils.getWebHook();
        let message = '';
        switch (evt) {
          case 'ReportGenerated':
            message = `[${evt} - ${bot}] a execução ${execution} terminou com sucesso.`;
            break;
          case 'ExecutionFinishedWithError':
            message = `[${evt} - ${bot}] a execução ${execution} terminou com erros.`;
            break;
          default:
            message = `[unamed event - ${bot}] a execução ${execution} terminou com erros.`;
            break;
        }

        let config = {
          method: 'get',
          url: webHook,
          headers: {
            'Content-Type': 'text/plain',
          },
          data: message,
        };

        await axios(config);

        const id = await DbCtrl.insertUpdate(`INSERT INTO notifications(evt, execution, owner, bot) 
                                                   VALUES ('${evt}','${execution}',${owner}, '${bot}');`);
        resolve(id || 0);
      } catch (error) {
        console.log(JSON.stringify(error));
        reject(error);
      }
    });
  }
};
