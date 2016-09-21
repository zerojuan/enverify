
const fs = require( 'fs-extra' );
const path = require( 'path' );

// reads all config.json files in a directory and creates a map of it
module.exports = ( configPath, opts, cb ) => {
    // read directory
    const items = [];
    fs.walk( path.join( process.cwd(), configPath ) )
      .on( 'data', ( item ) => {
          // go through each directory
          if ( item.stats.isFile() && item.path.endsWith( 'config.json' ) ) {
              items.push( item );
          }
      } )
      .on( 'end', () => {
          // load file contents
          const loadedJson = [];
          items.forEach( ( item ) => {
              const obj = {
                  id: item.path,
                  data: fs.readJsonSync( item.path )
              };
              loadedJson.push( obj );
          } );

          cb( null, loadedJson );
      } );

    // save each config.json into an object
};
