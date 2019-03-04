class IIFEDeclaration {

    constructor(IIFEName, IIFEASTNode, IIFENode) {
        this.IIFEName = IIFEName;
        this.IIFEASTNode = IIFEASTNode;
        this.IIFENode = IIFENode;
    }

    /**
     * Returns the start position of the IIFE declaration (start line/column).
     * @returns {*}
     */
    
    setIIFENode(){
        //var $ = require("jquery");
        let output = [];
        let str = this.IIFENode;
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
        let start = this.startLocation();
        let end = this.endLocation();        
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
        this.IIFENode = final_node;
    }

    getIIFENode(){
        return this.IIFENode;
    }

    startLocation() {
        return {startline:this.IIFEASTNode.loc.start.line, startcolumn:this.IIFEASTNode.loc.start.column};
    }

    /**
     * Returns the end position of the IIFE declaration (end line/column).
     * @returns {*}
     */
    endLocation() {
        return {endline:this.IIFEASTNode.loc.end.line, endcolumn:this.IIFEASTNode.loc.end.column};
    }

}

module.exports = IIFEDeclaration;