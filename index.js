const fastify = require('fastify')({ logger: true });
const AutoLoad = require('fastify-autoload');
const path = require('path');
const DbCtrl = require('./config/db');

fastify.register(require('fastify-swagger'), {
  exposeRoute: true,
  routePrefix: '/docs',
  swagger: {
    info: {
      title: 'Teste Oystr',
      description: 'Documentation for tests',
      version: '0.1.0',
    },
    externalDocs: {
      url: 'https://swagger.io',
      description: 'Find more info here',
    },
    host: 'localhost:7676',
    schemes: ['http'],
    consumes: ['application/json'],
    produces: ['application/json'],

    tags: [
      { name: 'Auth', description: 'Generate api access token' },
      { name: 'Notification', description: 'Service for notifications about the execution of the robot' },
    ],
    securityDefinitions: {
      apiKey: {
        type: 'apiKey',
        name: 'apiKey',
        in: 'header',
      },
    },
  },
});

fastify.register(AutoLoad, {
  dir: path.join(__dirname, 'routes'),
  options: { prefix: '/v1' },
});

fastify.register(require('fastify-cors'), {
  origin: true,
  methods: ['GET', 'PUT', 'POST', 'OPTIONS'],
});

fastify.register(require('fastify-jwt'), {
  secret: 'oystr-test',
});

const start = async () => {
  try {
    const dbok = await DbCtrl.initDataBase();
    if (!dbok) {
      throw new Error('The database has not been initialized');
    } else {
      await fastify.listen(process.env.PORT || 7676, '0.0.0.0');

      fastify.log.info(`server listening on 127.0.0.1`);
    }
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};
start();
