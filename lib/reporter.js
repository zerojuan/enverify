const chalk = require( 'chalk' );

const log = console.log;

module.exports = {
    printDuplicates( failures ) {
        failures.forEach( ( item ) => {
            log( chalk.red( `Duplicate found: ${item.id}` ) );
            item.duplicates.forEach( ( dupe ) => {
                log( chalk.gray( `\t${chalk.red( dupe.prop )} has same value as ${chalk.red( dupe.id )}` ) );
            } );
        } );
    },

    printInconsistencies( failures ) {
        failures.forEach( ( item ) => {
            log( chalk.red( `Inconsistent config: ${item.id}` ) );
            if ( item.missing.length > 0 ) {
                item.missing.forEach( ( miss ) => {
                    log( chalk.gray( `\t-- missing property: ${chalk.red( miss )}` ) );
                } );
            }
            if ( item.extra.length > 0 ) {
                item.extra.forEach( ( ext ) => {
                    log( chalk.gray( `\t-- extra property: ${chalk.red( ext )}` ) );
                } );
            }
        } );
    }
};
