/* global describe */
/* global before */
/* global beforeEach */
/* global it */
/* global after */
/* global afterEach */

/* eslint-disable quote-props */

require( 'should' ); // eslint-disable-line

const verify = require( '../lib/verify' );

describe( 'No Duplicates', () => {
    it( 'should return no failures if there are no duplicates', () => {
        const data = [
            {
                'id': '/x',
                'data': {
                    'db': 'db-conf1',
                    'key': 'db-key1'
                }
            },
            {
                'id': '/y',
                'data': {
                    'db': 'db-conf2',
                    'key': 'db-key2'
                }
            },
            {
                'id': '/z',
                'data': {
                    'db': 'db-conf3',
                    'key': 'db-key3'
                }
            }
        ];

        const failures = verify.noDuplicates( data );
        failures.length.should.equal( 0 );
    } );

    it( 'should accept duplicable properties', () => {
        const data = [
            {
                'id': '/x',
                'data': {
                    'db': 'db-conf',
                    'key': 'db-key',
                    'secret': 'db-secret'
                }
            },
            {
                'id': '/y',
                'data': {
                    'db': 'db-conf',
                    'key': 'db-key',
                    'secret': 'db-secret'
                }
            }
        ];

        const failures = verify.noDuplicates( data, { duplicable: [ 'db', 'key', 'secret' ] } );
        failures.length.should.equal( 0 );
    } );

    describe( 'Failures', () => {
        it( 'should return an array of failures', () => {
            const data = [
                {
                    'id': '/x',
                    'data': {
                        'db': 'db-conf',
                        'key': 'db-key',
                        'secret': 'db-secret'
                    }
                },
                {
                    'id': '/y',
                    'data': {
                        'db': 'db-conf',
                        'key': 'db-key',
                        'secret': 'db-secret'
                    }
                },
                {
                    'id': '/z',
                    'data': {
                        'db': 'db-conf',
                        'key': 'db-key',
                        'secret': 'db-secret'
                    }
                }
            ];
            const failures = verify.noDuplicates( data );
            failures.length.should.equal( 2 );
        } );

        it( 'should return the property and id of the failing config', () => {
            const data = [
                {
                    'id': '/x',
                    'data': {
                        'db': 'db-conf',
                        'key': 'key'
                    }
                },
                {
                    'id': '/y',
                    'data': {
                        'db': 'db-conf',
                        'key': 'key'
                    }
                }
            ];

            const failure = verify.noDuplicates( data )[ 0 ];
            failure.id.should.equal( '/x' );
            failure.duplicates.should.containEql( { id: '/y', prop: 'db' } );
            failure.duplicates.should.containEql( { id: '/y', prop: 'key' } );
        } );
    } );
} );
