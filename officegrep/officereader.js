// @ts-check
var AdmZip = require("adm-zip");
let Parser = require('node-xml-stream');
let fs = require('fs');

exports.readStrings = function(fileFullPath) {
    var result = '';
    // Open the file; we don't bother checking if it's remotely valid
    const zip = new AdmZip(fileFullPath);
    const zipEntries = zip.getEntries(); // an array of ZipEntry records

    zipEntries.forEach(function (zipEntry) {
        // ODS content
        if (
            // OD*
            zipEntry.entryName == "content\.xml" ||
            // Microsoft
            zipEntry.entryName === 'word/document\.xml' ||
            zipEntry.entryName.match('xl\/sharedStrings\.xml') ||
            zipEntry.entryName.match ('ppt\/slides\/slide[0-9]+\.xml')
            ) {
            result = readXMLStrings(zipEntry.getData().toString("utf8"));
        }
    });
    return result;
}

function readXMLStrings (XMLData) {
    let parser = new Parser();
    var result = '';

    parser.on('text', text => {
        result = result + text;
    });

    parser.on('cdata', text => {
        result = result + text;
    });
    parser.write(XMLData);

    return result;
}