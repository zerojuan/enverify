#!/usr/bin/env node

const loader = require( './lib/loader' );
const verify = require( './lib/verify' );

// read from options file
const path = './example';
const opts = {};

// read from folder
loader( path, opts, verify );
