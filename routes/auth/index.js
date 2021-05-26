const schemas = require('./schemas');

module.exports = function (fastify, opts, next) {
  fastify.get('/gettoken/:device', { schema: schemas.gettoken }, async function (request, reply) {
    try {
      if (request.params.device == null) {
        reply.status(403).send({ status: 'Parameter not found' });
      } else {
        const jwt = await fastify.jwt.sign({ sub: request.params.device }, { expiresIn: '8h' });

        reply.status(200).send({ jwt: jwt });
      }
    } catch (error) {
      reply.status(500).send(`Failed to get token ${JSON.stringify(error)}`);
    }
  });

  next();
};
