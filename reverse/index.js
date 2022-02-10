// @ts-check
const fs = require('fs');
const xlsx = require('node-xlsx');
const reverse = require('./reverse.js');

/**
 * Crude main
 */
if (process.argv.length !== 4) {
    console.error ('Usage: ' + process.argv[1] +  " input.xlsx output.xlsx");
}
const fileInput, fileOutput = process.argv.slice(2, 2);


const worksheet = xlsx.parse(fileInput);

// Extract the list of IP
var ipList = [];
for (const line of worksheet[0].data) {
    ipList.push(line[0]);
}

const ips = reverse.unique(reverse.filterIP(ipList));
reverse.resolve(ips)
    .then(function(results){
        const outputBuffer = xlsx.build([{name: 'sheet1', data: results, options: {}}])
        fs.writeFile(fileOutput, outputBuffer, "binary", (err) => console.log(err));
});

