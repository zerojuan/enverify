/* global describe */
/* global before */
/* global beforeEach */
/* global it */
/* global after */
/* global afterEach */

/* eslint-disable quote-props */

require( 'should' ); // eslint-disable-line

const verify = require( '../lib/verify' );

describe( 'Consistent Properties', () => {
    it( 'should return no failures if all properties match', () => {
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
        const failures = verify.consistentProperties( data );
        failures.length.should.equal( 0 );
    } );

    it( 'should return a failure if a property is missing', () => {
        const data = [
            {
                'id': '/x',
                'data': {
                    'db': 'db-conf',
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
                    'key': 'db-key',
                    'secret': 'db-secret'
                }
            }
        ];
        const failures = verify.consistentProperties( data );
        failures.length.should.equal( 2 );
        failures[ 0 ].should.have.property( 'id' );
        failures[ 0 ].should.have.property( 'missing' );
        failures[ 0 ].should.have.property( 'extra' );
    } );

    it( 'should ignore nullable property', () => {
        const data = [
            {
                'id': '/x',
                'data': {
                    'db': 'db-conf',
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
                    'key': 'db-key',
                    'secret': 'db-secret'
                }
            }
        ];

        // only secret is required
        const failures = verify.consistentProperties( data, { nullable: [ 'db', 'key' ] } );
        failures.length.should.equal( 0 );
    } );
} );
