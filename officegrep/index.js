const officeGrep = require ('./officegrep.js');


if (process.argv.length === 4) {
    console.log('Office files matching "' + process.argv[3] + '" :');
    officeGrep.grep (process.argv[2], process.argv[3]);
} else {
    console.error('Usage: ' + process.argv[0] + ' ' + process.argv[1] + ' DirectoryToGrep RegExpToMatch');
}
