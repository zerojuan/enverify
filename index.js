#!/usr/bin/env node

const loader = require( './lib/loader' );
const verify = require( './lib/verify' );
const getOptions = require( './options' );

// read from options file
const path = process.argv.slice( 2 )[ 0 ];

if ( !path ) {
    console.error( 'Error: Specify path to inspect' );
    process.exit( 1 );
}

const opts = getOptions( path );

// read from folder
loader( path, opts, ( err, configData ) => {
    if ( err ) {
        console.error( err );
        return process.exit( 1 );
    }

    return verify( configData, opts );
} );

process.on( 'exit', ( code ) => {
    if ( code ) {
        console.error( 'Failed' );
    } else {
        console.log( 'Success' );
    }
} );
