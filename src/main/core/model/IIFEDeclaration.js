const FunctionDeclaration = require('../../../main/core/model/FunctionDeclaration');
class IIFEDeclaration {

    constructor(initASTNode, functionNode, filePath) {
        this.initASTNode = initASTNode;
        this.functionDeclaration = new FunctionDeclaration(functionNode);
        this.filePath = filePath;
        
        console.log(this.startLocation()); /* Checked in all cases */
        console.log(this.endLocation()); /* Checked in all cases */
        console.log(this.getType()); /* Checked in all cases */
        console.log(this.getActualParameterDetails()); /* Checked in all cases */
        console.log(this.getReturnDetails()); /* Checked in all cases */
    }

     /**
     * Returns the start position of the IIFE declaration (start line/column).
     * @returns {*}
     */
    startLocation() {
        return {startline:this.initASTNode.value.loc.start.line, startcolumn:this.initASTNode.value.loc.start.column};
    }

    /**
     * Returns the end position of the IIFE declaration (end line/column).
     * @returns {*}
     */
    endLocation() {
        return {endline:this.initASTNode.value.loc.end.line, endcolumn:this.initASTNode.value.loc.end.column};
    }
    
    getinitASTNode(){
        return this.initASTNode;
    }

    getFunctionDeclaration(){
        return this.functionDeclaration;
    }

    /* 
        Returns an object with 1. the total counts 
        and 2. an array with the arguments in order to use this info later
        * {'total counts' : count , ' paramaters : ' : details[] }; *
    */
    getActualParameterDetails(){
        let type = this.getType();
        let count = -1;
        let details = [];
        let results = {};
        if(type === 'ExpressionStatement_CallExpression' ){
            if(this.initASTNode.value.expression.arguments!=undefined){
                count = this.initASTNode.value.expression.arguments.length;
                let _astNode = this.initASTNode.value.expression.callee;  
                if(_astNode.type == 'FunctionExpression' || _astNode.type == 'ArrowFunctionExpression' && count>0){
                    details.push(this.initASTNode.value.expression.arguments);                            
                }
            }
        }
        if(type === 'ExpressionStatement_AssignmentExpression' ){
            count = this.initASTNode.value.expression.right.arguments.length;
            if(this.initASTNode.value.expression.right.callee!=undefined && count>0){
                if(this.initASTNode.value.expression.right.callee.type === 'FunctionExpression' || this.initASTNode.value.expression.right.callee.type === 'ArrowFunctionExpression'){
                    details.push(this.initASTNode.value.expression.right.arguments);
                }
            }
        }

        if(type === 'ExpressionStatement_SequenceExpression' ){
            let total = this.initASTNode.value.expression.expressions.length;
            for(let expression_index=0;expression_index<total;expression_index++){
                let expression = this.initASTNode.value.expression.expressions[expression_index];
                if(expression.right!=undefined){
                    if(expression.right.callee.type === 'FunctionExpression' || expression.right.callee.type === 'ArrowFunctionExpression'){
                        count =  expression.right.arguments.length;
                        if(count>0){
                            details.push(expression.right.arguments);
                        }
                    }
                }
            }
        }        

        if(type === 'ExpressionStatement_UnaryExpression' ){
            count = this.initASTNode.value.expression.argument.arguments.length;
            if(count>0){
                details.push(this.initASTNode.value.expression.argument.arguments);
            }
        }
        if(type === 'VariableDeclaration'){
            let _declarations = this.initASTNode.value;
            let total_declarations = _declarations.declarations.length;
            if(total_declarations===1){
                if(_declarations.declarations[0].init!=undefined){
                    let _astNode = _declarations.declarations[0].init.callee;
                    if(_astNode.type === 'FunctionExpression' || _astNode.type === 'ArrowFunctionExpression'){
                        count = total_declarations;
                        details.push(_declarations.declarations[0].init.arguments);
                    }                      
                }
            }
            else if(total_declarations>1){
                for(let declarators_index=0;declarators_index<total_declarations;declarators_index++){
                    if(this.initASTNode.value.declarations[declarators_index].init !== null && this.initASTNode.value.declarations[declarators_index].init.callee !== undefined){
                        let _astNode = this.initASTNode.value.declarations[declarators_index].init;
                        if(_astNode.callee.type === 'FunctionExpression' || _astNode.callee.type === 'ArrowFunctionExpression'){
                            count = total_declarations;
                            details.push(_astNode.arguments);
                        }      
                    }                
                }                
            }
            else{
                details.push('Something went wrong');
            }
        }
        results = {'total counts' : count , ' paramaters : ' : details };
        return results;
    }

    /* 
        --- Currently identified types ---
        ExpressionStatement_CallExpression ,
        ExpressionStatement_AssignmentExpression , 
        ExpressionStatement_UnaryExpression , 
        VariableDeclaration
    */
    getType(){ 
        let node = this.initASTNode.value;
        if( node.type === 'VariableDeclaration'){
            return 'VariableDeclaration';
        }
        if(node.type==='ExpressionStatement'){
            /* x = IIFE */
            if(node.expression.type === 'AssignmentExpression'){
                return 'ExpressionStatement_AssignmentExpression';
            }
            /* x , y = IIFE */
            else if(node.expression.type === 'SequenceExpression'){
                return 'ExpressionStatement_SequenceExpression';
            }
            /* simple IIFE - includes arrow functions */
            else if(node.expression.type === 'CallExpression'){           
                return 'ExpressionStatement_CallExpression';
            }
            /* void IIFE */ 
            else if (node.expression.type === 'UnaryExpression'){
                return 'ExpressionStatement_UnaryExpression';
            }
            /* other expressions not identified yet! */
            else{
                return 'ExpressionStatement_' +node.expression.type;
            }
        }
        /* other types not identified yet! */
        return 'Type_' +node.type;
    }

    getReturnDetails(){
        let return_details = {
            'has_return_value' : false,
            'returned_to_node' : '' , 
            'return_statement_node' : ''            
        }
        let _type = this.getType();
        
        if(  _type === 'ExpressionStatement_AssignmentExpression' 
            || _type === 'ExpressionStatement_SequenceExpression'        
            || _type === 'VariableDeclaration'
        ){
            if(_type === 'ExpressionStatement_AssignmentExpression' ){
                if(this.initASTNode.value.expression.right.callee!=undefined){
                    let right_section = this.initASTNode.value.expression.right.callee;
                    if(right_section.type === 'FunctionExpression' || right_section.type === 'ArrowFunctionExpression'){
                        let current_body = right_section.body;
                        for(let _index=0;_index<current_body.body.length;_index++){
                            let current_body_type = current_body.body[_index].type;
                            if(current_body_type!=undefined && (current_body_type==='ReturnStatement' || current_body_type==='ArrowFunctionExpression')){
                                let return_statement_node = current_body.body[_index];
                                let returned_to_node = this.initASTNode.value.expression.left;
                                return_details = { 
                                    'has_return_value' : true,
                                    'returned_to_node' : returned_to_node , 
                                    'return_statement_node' : return_statement_node
                                }
                            }
                        }
                    }
                }                            
            }
    
            if(_type === 'ExpressionStatement_SequenceExpression' ){
                let total = this.initASTNode.value.expression.expressions.length;
                for(let expression_index=0;expression_index<total;expression_index++){
                    let expression = this.initASTNode.value.expression.expressions[expression_index];
                    if(expression.right!=undefined){
                        if(expression.right.callee.type === 'FunctionExpression' || expression.right.callee.type === 'ArrowFunctionExpression'){
                            let current_body = expression.right.callee.body;
                            for(let _index=0;_index<current_body.body.length;_index++){
                                let current_body_type = current_body.body[_index].type;
                                if(current_body_type!=undefined && current_body_type==='ReturnStatement'){
                                    let return_statement_node = current_body.body[_index];
                                    let returned_to_node = expression.left;
                                    return_details = { 
                                        'has_return_value' : true,
                                        'returned_to_node' : returned_to_node , 
                                        'return_statement_node' : return_statement_node
                                    }
                                }
                            }
                        }
                    }
                }
            }        
    
            
            if(_type === 'VariableDeclaration'){
                let _declarations = this.initASTNode.value;
                let total_declarations = _declarations.declarations.length;
                if(total_declarations===1){
                    if(_declarations.declarations[0].init!=undefined){
                        let _astNode = _declarations.declarations[0].init.callee;
                        if(_astNode.type === 'FunctionExpression' || _astNode.type === 'ArrowFunctionExpression'){
                            let current_body = _astNode.body;
                            for(let _index=0;_index<current_body.body.length;_index++){
                                let current_body_type = current_body.body[_index].type;
                                if(current_body_type!=undefined && current_body_type==='ReturnStatement'){
                                    let return_statement_node = current_body.body[_index];
                                    let returned_to_node;
                                    if(_declarations.declarations[0].id!=undefined){
                                        returned_to_node = _declarations.declarations[0].id;
                                    }
                                    return_details = { 
                                        'has_return_value' : true,
                                        'returned_to_node' : returned_to_node , 
                                        'return_statement_node' : return_statement_node
                                    }
                                }
                            }
                        }                      
                    }
                }
                else if(total_declarations>1){
                    for(let declarators_index=0;declarators_index<total_declarations;declarators_index++){
                        if(this.initASTNode.value.declarations[declarators_index].init !== null && this.initASTNode.value.declarations[declarators_index].init.callee !== undefined){
                            let _astNode = this.initASTNode.value.declarations[declarators_index].init;
                            if(_astNode.callee.type === 'FunctionExpression' || _astNode.callee.type === 'ArrowFunctionExpression'){
                                let current_body = _astNode.callee.body;
                                for(let _index=0;_index<current_body.body.length;_index++){
                                    let current_body_type = current_body.body[_index].type;
                                    if(current_body_type!=undefined && current_body_type==='ReturnStatement'){
                                        let return_statement_node = current_body.body[_index];
                                        let returned_to_node;
                                        if(this.initASTNode.value.declarations[declarators_index].id!=undefined){
                                            returned_to_node = this.initASTNode.value.declarations[declarators_index].id;
                                        }
                                        return_details = { 
                                            'has_return_value' : true,
                                            'returned_to_node' : returned_to_node , 
                                            'return_statement_node' : return_statement_node
                                        }
                                    }
                                }
                            }      
                        }                
                    }                
                }
                else{
                    details.push('Something went wrong');
                }
            }
            
        }
        return return_details;
    }


    print(){
        console.log("");
    }

}

module.exports = IIFEDeclaration;