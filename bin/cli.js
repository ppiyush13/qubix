import program from 'commander';
import pkg from '../package.json';
import { build, start } from '../src/commands';

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
    .requiredOption('-i, --input <inputFile>', 'Specify entry file for build', './src/App')
    .requiredOption('-o, --output <dir>', 'Specify output dir', './mf-build')
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
    .requiredOption('-i, --input <file>', 'Specify entry file', './src/App')
    .option('-p, --port <port_no>', 'port number to start server')
    .action(start)
    .on('--help', function () {
        console.log('');
        console.log('Examples:');
        console.log('');
        console.log('  $ qubix start');
        console.log('  $ qubix start -p 13130 -i ./src/App.jsx -o ./mf-build');
    });

export function createCli(argv) {
    program.parse(process.argv);
}