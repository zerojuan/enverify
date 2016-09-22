const _ = require( 'lodash' );
const reporter = require( './reporter' );

// returns an array of failures: id, missing, extra
function consistentProperties( configData, opts ) {
    const defaults = {
        nullable: [],
        duplicable: []
    };

    const optsLocal = _.merge( defaults, opts );
    // TODO: this always gets the first element
    const first = configData[ 0 ];
    const firstProperties = _.difference( _.keys( first.data ), optsLocal.nullable );

    return _.reduce( configData, ( result, item ) => {
        const itemProperties = _.difference( _.keys( item.data ), optsLocal.nullable );
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

function noDuplicates( configData, opts ) {
    const defaults = {
        nullable: [],
        duplicable: []
    };

    const optsLocal = _.merge( defaults, opts );

    const failures = [];
    for ( let i = 0; i < configData.length; i++ ) {
        const current = configData[ i ];
        const duplicates = [];
        for ( let j = i + 1; j < configData.length; j++ ) {
            const itemToMatch = configData[ j ];

            // compare the two items
            for ( const prop in current.data ) { // eslint-disable-line no-restricted-syntax
                if ( _.includes( optsLocal.duplicable, prop ) ) {
                    continue; // eslint-disable-line no-continue
                }

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

function verify( configData, opts ) {
    const consistencyFailures = consistentProperties( configData, opts );

    if ( consistencyFailures.length > 0 ) {
        reporter.printInconsistencies( consistencyFailures );
        process.exit( 1 );
    }

    const duplicateFailures = noDuplicates( configData, opts );

    if ( duplicateFailures.length > 0 ) {
        reporter.printDuplicates( duplicateFailures );
        process.exit( 1 );
    }
    process.exit( 0 );
}

verify.consistentProperties = consistentProperties;
verify.noDuplicates = noDuplicates;

module.exports = verify;
