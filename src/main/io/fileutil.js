const fs = require('fs');
const path = require('path');

/**
 * Resolves files in directory synchronously.
 * @param directory
 * @returns the files listed in directory (the type of these files is determined by extension).
 */

exports.getRecursivePaths = function getRecursivePaths(__dirname,files_){
	const fs = require('fs');
	files_ = files_ || [];
	let path = 'src/init/resources/'+__dirname;
	if(fs.existsSync(path)){
		fs.readdirSync(path).forEach(file => {
			if(fs.statSync(path+'/'+file).isDirectory()){
				// console.log(file);
				getRecursivePaths(__dirname+'/'+file,files_);
			}else{
				let ext = file.substr(file.lastIndexOf('.') + 1);
				if(ext=='js'){
					files_.push(path+'/'+file);
				}
			}
		});
		return files_;
	}else{
		return -1;
	}	
} 

exports.fileCreated = function fileCreated(filepath){
	if(fs.existsSync(filepath) && filepath.includes('refactored')){
		return true;
	}
	return false;
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
