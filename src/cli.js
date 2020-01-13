/* import program from 'commander';
import pkg from '../package.json';
import { build, start } from './commands'; */

const program = require('commander');
const pkg = require('../package.json');
const {build, start} = require('./commands');

program
    .version(pkg.version, '-v, --version', 'qubix version')
    .description('Create micro-frontend bundle with a breeze')
    .action((_, cmd) => {
        console.log(`\n${cmd} command not found ! \n`);
        program.outputHelp();
    });

program
    .command('build')
    .description('create production build assets')
    .action(build)
    .on('--help', function () {
        console.log('');
        console.log('Examples:');
        console.log('');
        console.log('  $ qubix build');
    });

program
    .command('start')
    .description('start development server. Type `qubix start --help` more additional info.')
    .option('-p, --port', 'port number to start server')
    .action(start)
    .on('--help', function () {
        console.log('');
        console.log('Examples:');
        console.log('');
        console.log('  $ qubix start');
        console.log('  $ qubix start --p 13130');
    });

/* export function createCli(argv) {
    program.parse(process.argv);
} */

exports.createCli = (argv) => {
    program.parse(process.argv);
}