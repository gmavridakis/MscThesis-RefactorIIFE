/* 
    The function getIIFEFunction() receives two objects :
    a) _start --> {startline : 2 , startcolumn : 20 } 
    b) _end --> {endline : 2 , endcolumn : 38 } 
    and according to these it goes to the initial code (not AST code)
    Init Code:
    ------------
    var x;
    var l= (function(){  return 'test';})();
    console.log('random text');
    ------------
    and will return an array with characters array[startline][startcolumn] - array[endline][endcolumn]
    so in our example it would return : function(){  return 'test';}   
*/    
static getIIFEFunction(_start,_end){
    let output = [];
    let str = this.initCode;
    let lines = str.split(/\n/);
    for (let i = 0; i < lines.length; i++) {
        if(lines[i]!=undefined){
            output.push(lines[i]);
            //output.push($.trim(lines[i]));
        }
        else{
            output.push(' ');   
        }
        //console.log(output);
    }
    let final_node = '';
    let start = _start;
    let end = _end;        
    let end_line = end['endline'];
    let start_line = start['startline'];
    let start_column = start['startcolumn'];
    let end_column = end['endcolumn'];
    
    //IIFE in 1 line!
    if(start_line==end_line){
        let final_line = '';
        for(let j=start_column;j<end_column;j++){
            if(output[start_line-1][j]!=undefined){
                final_line+=output[start_line-1][j]; 
            }
        }
        final_node += final_line;            
    }
    //IIFE in more lines!
    else{
        for (let line = start_line-1; line < end_line; line++) {

            if((line==start_line-1) || (line==end_line-1)){
                if(line==start_line-1){
                    for(let j=start_column;j<=output[line].length;j++){
                        if(output[line][j]!=undefined){
                            final_node+=output[line][j];
                        } 
                    }                        
                }
                else{
                    for(let j=0;j<=end_column-1;j++){
                        if(output[line][j]!=undefined){
                            final_node+=output[line][j]; 
                        }
                    }                      
                }
            }
            else{
                if(output[line]!=undefined){
                    final_node += output[line]; 
                }
            }
        }
    }
    
    final_node = final_node.replace(/[\r\n]/g, "");        
    return final_node;
}