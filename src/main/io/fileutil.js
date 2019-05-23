const fs = require('fs');
const path = require('path');

/**
 * Resolves files in directory synchronously.
 * @param directory
 * @returns the files listed in directory (the type of these files is determined by extension).
 */

exports.getFilePaths = function getFilePaths(__dirname){
	const fs = require('fs');
	let jsfiles = [];
	if(fs.existsSync('src/'+__dirname)){
		fs.readdirSync('src/'+__dirname).forEach(file => {
			// gets the suffix if any
			let ext = file.substr(file.lastIndexOf('.') + 1);
			if(ext=='js' && !(fs.statSync('src/'+__dirname+'/'+file).isDirectory())){
				jsfiles.push(file);
			}
		});
		if(jsfiles!=''){
			return jsfiles;
		}
		else{
			return '-1';
		}		
	}
	else{
		return '-1';
	}
} 

exports.fileCreated = function fileCreated(filepath){
	return fs.existsSync(filepath) ? true : false;
}

exports.readFileSync = function readFileSync(filePath) {
    return fs.readFileSync(filePath, 'utf8');
}

exports.writeFileSync = function writeFileSync(filePath, content) {
    fs.writeFileSync(filePath, content, 'utf-8');
}

exports.appendFileSync = function appendFileSync(filePath, content) {
    fs.appendFileSync(filePath, content, 'utf-8');
}
