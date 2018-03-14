'use strict';

// Do this as the first thing so that any code reading it knows the right env.
process.env.BABEL_ENV = 'production';
process.env.NODE_ENV = 'production';

// Makes the script crash on unhandled rejections instead of silently
// ignoring them. In the future, promise rejections that are not handled will
// terminate the Node.js process with a non-zero exit code.
process.on('unhandledRejection', err => {
    throw err;
});

// Ensure environment variables are read.
require('../config/env');

const path = require('path');
const chalk = require('chalk');
const fs = require('fs-extra');
const webpack = require('webpack');
const config = require('../config/webpack.config.watch');
const paths = require('../config/paths');
const checkRequiredFiles = require('react-dev-utils/checkRequiredFiles');
const formatWebpackMessages = require('react-dev-utils/formatWebpackMessages');
const printHostingInstructions = require('react-dev-utils/printHostingInstructions');
const FileSizeReporter = require('react-dev-utils/FileSizeReporter');
const printBuildError = require('react-dev-utils/printBuildError');

const measureFileSizesBeforeBuild = FileSizeReporter.measureFileSizesBeforeBuild;
const printFileSizesAfterBuild = FileSizeReporter.printFileSizesAfterBuild;
const useYarn = fs.existsSync(paths.yarnLockFile);

// These sizes are pretty large. We'll warn for bundles exceeding them.
const WARN_AFTER_BUNDLE_GZIP_SIZE = 512 * 1024;
const WARN_AFTER_CHUNK_GZIP_SIZE = 1024 * 1024;

// Warn and crash if required files are missing
if (!checkRequiredFiles([paths.appHtmlTemplate, paths.appIndexJs])) {
    process.exit(1);
}

// First, read the current file sizes in build directory.
// This lets us display how much they changed later.
measureFileSizesBeforeBuild(paths.appBuild)
    .then(previousFileSizes => {
        // Remove all content but keep the directory so that
        // if you're in it, you don't end up in Trash
        fs.emptyDirSync(paths.appBuild);
        // Merge with the public folder
        copyPublicFolder();
        // Start the webpack build
        return build(previousFileSizes);
    });

// Create the production build and print the deployment instructions.
function build(previousFileSizes) {
    // console.log('Creating an optimized production build...');

    let compiler = webpack(config);
    compiler.watch({}, (err, stats) => {
        if (err) {
            displayError(new Error(messages.errors.join('\n\n')));
            return;
        }
        const messages = formatWebpackMessages(stats.toJson({}, true));
        if (messages.errors.length) {
            // Only keep the first error. Others are often indicative
            // of the same problem, but confuse the reader with noise.
            if (messages.errors.length > 1) {
                messages.errors.length = 1;
            }
            displayError(new Error(messages.errors.join('\n\n')));
            return;
            // return reject(new Error(messages.errors.join('\n\n')));
        }
        if (
            process.env.CI &&
            (typeof process.env.CI !== 'string' ||
                process.env.CI.toLowerCase() !== 'false') &&
            messages.warnings.length
        ) {
            console.log(
                chalk.yellow(
                    '\nTreating warnings as errors because process.env.CI = true.\n' +
                    'Most CI servers set it automatically.\n'
                )
            );
            displayError(new Error(messages.warnings.join('\n\n')));
            return;
            //   return reject(new Error(messages.warnings.join('\n\n')));
        }
        // return resolve({
        //   stats,
        //   previousFileSizes,
        //   warnings: messages.warnings,
        // });
        const warnings = messages.warnings;
        if (warnings.length) {
            console.log(chalk.yellow('Compiled with warnings.\n'));
            console.log(warnings.join('\n\n'));
            console.log(
                '\nSearch for the ' +
                chalk.underline(chalk.yellow('keywords')) +
                ' to learn more about each warning.'
            );
            console.log(
                'To ignore, add ' +
                chalk.cyan('// eslint-disable-next-line') +
                ' to the line before.\n'
            );
        } else {
            const date = new Date();
            console.log(chalk.green('[' +
                date.toLocaleTimeString()
                + '] Compiled successfully.\n'));
        }

        console.log('File sizes after gzip:\n');
        printFileSizesAfterBuild(
            stats,
            previousFileSizes,
            paths.appBuild,
            WARN_AFTER_BUNDLE_GZIP_SIZE,
            WARN_AFTER_CHUNK_GZIP_SIZE
        );
        console.log();
    });
}

function displayError(err) {
    const date = new Date();
    console.log(chalk.red('[' +
    date.toLocaleTimeString()
    + '] Failed to compile.\n'));
    printBuildError(err);
    // process.exit(1);
}

function copyPublicFolder() {
    fs.copySync(paths.appPublic, paths.appBuild, {
        dereference: true,
        filter: file => file !== paths.appHtmlTemplate,
    });
}
