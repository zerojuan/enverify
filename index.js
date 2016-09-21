#!/usr/bin/env node

const loader = require( './lib/file-loader' );

// read from options file
const path = './example';
const opts = {};

// read from folder
loader( path, opts, ( err, configFiles ) => {
    console.log( configFiles );
    // keep in memory

    // validate duplicates

    // validate consistent shape

    // validate ensure no typos
} );
