#!/usr/bin/env node

const yargs = require('yargs');
const argv = yargs(process.argv.slice(2)).argv;
const input_command = argv._[0];
const input_app = argv._[1];
const { exec } = require('child_process');
const { arch } = require('os');
const command_len = argv._.length

var config = require('./configuration');

const versionFileListDir = config.versionFileListDir;
const functionTraceListDir = config.functionTraceListDir;
const functionComparisonListDir = config.functionComparisonListDir;

var exec_command = "";
var output_msg = ""

if (command_len < 2) {
    const options = yargs
    .usage("Usage: sojitantei <command> <app_name> (optional - depends on command)")
    .command('list-metafile-version', 'List versions of a package from package.json', (yargs) => {
        return yargs.positional('app_name', {
            describe: 'Application name e.g. mocha',
            type: 'string'
        })
    })
    .command('list-tag-version', 'List versions of a package from git tag', (yargs) => {
        return yargs.positional('app_name', {
            describe: 'Application name e.g. mocha',
            type: 'string'
        })
    })
    .command('trace-call', 'Trace the dependency function call of a package', (yargs) => {
        return yargs.positional('app_name', {
            describe: 'Application name e.g. mocha',
            type: 'string'
        })
    })
    .command('compare-function', 'Compare the function list of two different versions', (yargs) => {
        return yargs.positional('app_name', {
            describe: 'Application name e.g. mocha',
            type: 'string'
        })
    })
    .option("r", { alias: "repository", describe: "Repository of this library", type: "string", demandOption: true })
    .argv;

    const repo = `${options.repository}`;
    console.log("https://github.com/NAIST-SE/SojiTantei");

} else {
    if (command_len < 3) {
        if (input_command == "list-metafile-version"){
            exec_command = "node src/getFilesPerRelease.js " + input_app;
            output_msg = "Successful! Please see result at " + versionFileListDir + input_app;
        } else if (input_command == "list-tag-version") {
            exec_command = "node src/getTags.js " + input_app;
            output_msg = "Successful! Please see result at " + versionFileListDir + input_app;
        } else if (input_command == "trace-call") {
            exec_command = "node src/syntaxChecker.js " + input_app;
            output_msg = "Successful! Please see result at " + functionTraceListDir + input_app;
        } else if (input_command == "compare-function") {
            console.log("You did not add the input correctly. Please add two desired versions to compare");
        }
    } else {
        if (input_command == "list-metafile-version"){
            console.log("Command was wrong");
        } else if (input_command == "list-tag-version") {
            console.log("Command was wrong");
        } else if (input_command == "trace-call") {
            if (command_len == 3) {
                exec_command = "node src/syntaxChecker.js " + input_app + " R_" + argv._[2] + ".txt";
                output_msg = "Successful! Please see result at " + functionTraceListDir + input_app + "/R_" + argv._[2] + ".txt";
            }
        } else if (input_command == "compare-function") {
            if (command_len == 3) {
                console.log("You did not add the input correctly. Please add one more desired versions to compare.");
            } else if (command_len == 4) {
                exec_command = "node src/getFunctions.js " + input_app + " R_" + argv._[2] + ".txt R_" + argv._[3] + ".txt";
                output_msg = "Successful! Please see result at " + functionComparisonListDir + input_app + "/[R_" + argv._[2] + "]-[R_" + argv._[3] + "].txt";
            }
        }
    }
    const cmd = exec(exec_command, function (error, stdout, stderr) {
        if (error) {
        console.log(error.stack);
        console.log('Error code: '+error.code);
        console.log('Signal received: '+error.signal);
        }
        console.log(output_msg);
    });
}
