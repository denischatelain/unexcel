// @ts-check
const fs = require('fs');
const path = require('path');
const officeReader = require ('./officereader.js')

exports.grep = function(grepPath, expression) {
	fs.readdir(grepPath, {withFileTypes:true}, (err, files) => {
		if (err)
			console.log(err);
		else {
			files.forEach(dirent => {
				// Match or recurse
				if (dirent.isFile() && path.extname(dirent.name).match(/\.docx$|\.pptx$|\.xlsx$|\.odt$|\.odp$|\.ods$/i)) {
					const fileFullPath = grepPath + '/' + dirent.name;

					const content = officeReader.readStrings(fileFullPath);
					
					let reg = new RegExp( expression , 'i');
					if (reg.test(content)) {
						console.log ('File ' + fileFullPath + ' matches.');
					}
				}
				else if (dirent.isDirectory()) {
					this.grep (grepPath+'/'+dirent.name, expression);
				}
			})
		}
	})
}
