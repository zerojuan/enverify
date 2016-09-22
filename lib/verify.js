const _ = require( 'lodash' );

// returns an array of failures: id, missing, extra
function consistentProperties( configData ) {
    // TODO: this always gets the first element
    const first = configData[ 0 ];
    const firstProperties = _.keys( first.data );

    return _.reduce( configData, ( result, item ) => {
        const itemProperties = _.keys( item.data );
        const missing = _.difference( firstProperties, itemProperties );
        const extra = _.difference( itemProperties, firstProperties );
        if ( missing.length + extra.length > 0 ) {
            // TODO: add flag for nullable properties
            result.push( {
                id: item.id,
                missing,
                extra
            } );
        }

        return result;
    }, [] );
}

function noDuplicates( configData ) {
    const failures = [];
    for ( let i = 0; i < configData.length; i++ ) {
        const current = configData[ i ];
        const duplicates = [];
        for ( let j = i + 1; j < configData.length; j++ ) {
            const itemToMatch = configData[ j ];

            // compare the two items
            for ( const prop in current.data ) {
                if ( current.data[ prop ] === itemToMatch.data[ prop ] ) {
                    duplicates.push( {
                        id: itemToMatch.id,
                        prop
                    } );
                }
            }
        }
        if ( duplicates.length > 0 ) {
            failures.push( {
                id: current.id,
                duplicates
            } );
        }
    }
    return failures;
}

function verify( err, configData ) {
    const failures = consistentProperties( configData );
    console.log( failures );
    noDuplicates( configData );
}

verify.consistentProperties = consistentProperties;
verify.noDuplicates = noDuplicates;

module.exports = verify;
