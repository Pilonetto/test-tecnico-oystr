const gettoken = {
  description: 'Obtain an API access token',
  tags: ['Auth'],
  response: {
    200: {
      type: 'object',
      properties: {
        jwt: { type: 'string' },
      },
    },
  },
  params: {
    device: { type: 'string' },
  },
};

module.exports = { gettoken };
