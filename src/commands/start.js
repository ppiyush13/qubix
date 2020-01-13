const path = require('path');
const mock = require('mock-require');
 
const overridePath = path.resolve(process.cwd(), 'config-overrides');
mock(overridePath, require('../config-overrides'));

module.exports = async () => {
    console.log('done');
    require('react-app-rewired/scripts/build');
};
