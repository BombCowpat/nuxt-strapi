module.exports = [
  {
    method: 'GET',
    path: '/',
    handler: 'myController.index',
    config: {
      policies: [],
    },
  },
  {
    method: 'GET',
    path: '/dashboard/getStatus',
    handler: 'dashboard.getStatus',
    config: {
      policies: [],
    },
  },
  {
    method: 'GET',
    path: '/dashboard',
    handler: 'dashboard.index',
    config: {
      policies: [],
    },
  },
  {
    method: 'GET',
    path: '/dashboard/generate',
    handler: 'dashboard.generate',
    config: {
      policies: [],
    },
  },
  {
    method: 'GET',
    path: '/dashboard/build',
    handler: 'dashboard.build',
    config: {
      policies: [],
    },
  },
  {
    method: 'GET',
    path: '/dashboard/start',
    handler: 'dashboard.start',
    config: {
      policies: [],
    },
  },
  {
    method: 'GET',
    path: '/dashboard/stop',
    handler: 'dashboard.stop',
    config: {
      policies: [],
    },
  },
  {
    method: 'GET',
    path: '/dashboard/restart',
    handler: 'dashboard.restart',
    config: {
      policies: [],
    },
  },
]
