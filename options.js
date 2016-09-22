const fs = require( 'fs' );
const path = require( 'path' );

module.exports = ( configPath ) => {
    let opts = null;
    try {
        opts = JSON.parse( fs.readFileSync( path.join( process.cwd(), configPath, 'env.conf' ), { encoding: 'utf8' } ) );
    } catch ( err ) {
        console.log( 'No env.opts file found. Using default' );
    }

    return opts;
};
