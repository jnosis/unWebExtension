import browserAPI from 'browser';

console.log('logging');
browserAPI.notifications.create('1', { title: 'Test', message: 'test' });
