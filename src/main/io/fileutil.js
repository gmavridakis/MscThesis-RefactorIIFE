const fs = require('fs');
const path = require('path');

/**
 * Resolves files in directory synchronously.
 * @param directory
 * @returns
 */
exports.retrieveSourceFilesInDirectory = function retrieveSourceFilesInDirectory(directory, fileList) {

	return retrieveFilesInDirectory(directory, fileList, '.js');
}

/**
 * Resolves files in directory synchronously.
 * @param directory
 * @returns the files listed in directory (the type of these files is determined by extension).
 */
function retrieveFilesInDirectory(directory, fileList, extension) {
	fileList = fileList || [];
	
	var isDirectory = fs.statSync(directory).isDirectory();

	if(isDirectory === true) {
		var files = fs.readdirSync(directory);
		files.forEach(function(file) {
			
			//current file corresponds to a directory
			if(fs.statSync(directory + "/" + file).isDirectory() === true) {
				
				//search for js sourcefiles inside this directory
				// retrieveSourceFilesInDirectory(directory + "/" + file, fileList);
				retrieveFilesInDirectory(directory + "/" + file, fileList, extension);
			}
			else if (file.endsWith(extension) === true) {
				
				//include only js sourcefiles in result list
				var filePath = path.resolve(directory + "/" + file);
				fileList.push(filePath);
			}
		});
	}
	
	return fileList;
}

exports.readFileSync = function readFileSync(filePath) {
    return fs.readFileSync(filePath, 'utf8');
}

exports.writeFileSync = function writeFileSync(filePath, content) {
    fs.writeFileSync(filePath, content, 'utf-8');
}

