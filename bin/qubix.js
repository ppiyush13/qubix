#!/usr/bin/env node

require = require('esm')(module /*, options*/);
require('./cli').createCli(process.argv);