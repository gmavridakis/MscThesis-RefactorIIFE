const IIFEDeclarationFinder = require('../../../main/core/parser/IIFEDeclarationFinder');
const IIFEDeclarationCollection = require('../../../main/core/model/Collection/IIFEDeclarationCollection');
const FunctionDeclarationCollection = require('../../../main/core/model/Collection/FunctionDeclarationCollection');
const JSCodeshiftParser = require('../../../main/core/parser/JSCodeshiftWrapper').parser;
const fileUtils = require('../../../main/io/fileutil');

var Promise = require('bluebird');

function ask(question) {
    console.log(question);
    return new Promise(function(resolve) {
        process.stdin.once('data', function(data) {
            resolve(data.toString().trim());
        });
    });
}

ask('Give full path to js folder : (e.g. init/resources )')
    .then(function(reply) {
        let identified_files = fileUtils.getFilePaths(reply);
        console.log('Identified files : ' + identified_files);
        if (identified_files == '-1') {
            console.log('No IIFE was identified...');
        } 
        else {
            //for each file
            for (let i = 0; i < identified_files.length; i++) {
                let path = './src/' + reply + '/' + identified_files[i];
                console.log('Checking file : ' + path);
                let initCode = fileUtils.readFileSync(path).trim();
                //if .js not empty
                if (initCode != '') {
                    //initialize model
                    let nodesCollection = JSCodeshiftParser.parse(initCode);
                    IIFEDeclarationFinder.getIIFEDeclarations(nodesCollection);
                    iifeDeclarations = IIFEDeclarationCollection.getIIFEInCollectionArray();
                } else {
                    console.log('No IIFE was identified...');
                }
            }

            // prepare to write data to csv
            iifeDeclarations = IIFEDeclarationCollection.getIIFEInCollectionArray();
            functionDeclarations = FunctionDeclarationCollection.getFunctionsInCollectionArray();
            if(iifeDeclarations.length > 0){
                /*
                            -------CSV FORMAT-------
                            counter: αυξων αριθμός
                            όνομα συνάρτησης: ή - αν δεν έχει όνομα
                            τύπος συνάρτησης: named/unnamed/arrow
                            αριθμός πραγματικών παραμέτρων: 0 ή περισσότεροι
                            αριθμός τυπικών παραμέτρων: 0 ή περισσότεροι
                            επιστρέφει τιμή; : 0 ή 1 (true / false)
                            όνομα αρχείου: path του αρχείου όπου εντοπίστηκε το iife
                            startRow: int γραμμή που ξεκινά
                            startColumn: int στήλη που ξεκινά
                            endRow: int
                            startRow: int
                */
                let counter = 0;
                let data = [];
                _path = 'src/init/results_iife.csv';
                data = []; //init data before starting scanning iife functions

                //first row of csv
                data.push(['counter', 'name', 'function_name',
                    'real_parameter', 'typical_parameter',
                    'returns_value', 'file_name', 'start_row',
                    'end_row', 'start_column', 'end_column'
                ]);
                //let current_file = identified_files[i];
                for (let j=0; j<iifeDeclarations.length; j++) {
                    counter++;
                    data.push(['\n' + counter, 'to be added']);
                    /*
                        let all_iife_info = [];
                        all_iife_info.push(' TYPE : ' +(iifeDeclarations[i]).value['type']);
                        all_iife_info.push(' START : ' +(iifeDeclarations[i]).value['start']);
                        all_iife_info.push(' END : ' +(iifeDeclarations[i]).value['end']);
                
                        let all_function_info = [];
                        all_function_info.push(' TYPE : ' +(functionDeclarations[i])['type']);
                        all_function_info.push(' START : ' +(functionDeclarations[i])['start']);
                        all_function_info.push(' END : ' +(functionDeclarations[i])['end']);
                
                        //console.log('Index of IIFE : ');
                        fileUtils.appendFileSync(_path, str);

                        str = ' All relevant content of IIFE : ';
                        fileUtils.appendFileSync(_path, str);
                        //console.log(iifeDeclarations[i]);    
                        for(let i=0;i<all_iife_info.length;i++){
                            fileUtils.appendFileSync(_path, all_iife_info[i]);
                        }
                        //console.log('Pure IIFE function : ');
                        str = ' Pure IIFE function : ';
                        fileUtils.appendFileSync(_path, str);
                        //console.log(functionDeclarations[i]);    
                        for(let i=0;i<all_function_info.length;i++){
                            fileUtils.appendFileSync(_path, all_function_info[i]);
                        }
                        fileUtils.appendFileSync(_path, '\n');
                        */
            }
            fileUtils.appendFileSync(_path, data);
            console.log('Check the results under : ' + path + '(results_iife.csv is generated successfully!)')
        }else{
            console.log('No IIFE was identified...');
        }                        
    }
})
.finally(process.exit);