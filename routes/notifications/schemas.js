const notification = {
  description: 'post a notification',
  tags: ['Notification'],
  response: {
    200: {
      type: 'object',
      properties: {
        message: { type: 'string' },
      },
    },
  },
  body: {
    type: 'object',
    properties: {
      evt: { type: 'string' },
      execution: { type: 'string' },
      owner: { type: 'integer' },
      bot: { type: 'string' },
    },
  },
};

module.exports = { notification };
