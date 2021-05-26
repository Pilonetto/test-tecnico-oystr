const Notifications = require('../../controllers/notifications.controller');
const schemas = require('./schemas');

module.exports = function (fastify, opts, next) {
  fastify.addHook('onRequest', async (request, reply) => {
    try {
      await request.jwtVerify();
    } catch (err) {
      reply.send(err);
    }
  });

  fastify.post('/notification', { schema: schemas.notification }, async function (request, reply) {
    try {
      await Notifications.create(request.body);

      reply.header('Access-Control-Allow-Origin', '*').status(200).send({ message: 'OK' });
    } catch (error) {
      console.log(`Failed to register ${JSON.stringify(error)}`);
      reply.header('Access-Control-Allow-Origin', '*').status(500).send({ message: 'ERROR' });
    }
  });

  next();
};
