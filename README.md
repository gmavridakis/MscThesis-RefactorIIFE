Project Structure:

1) main: production code
    core: AST node processing
        model: Classes for the code structures that need to be detected in the AST (i.e. IIFEs)
        parser: Classes for the detection of the code structures of the model package
    io: file input/output utilities (file listing, read/write files)

2) test: jest tests
    core/parser: tests for parsing/detection of the code structures
    resources: JS example files given as input in the parser


Project setup: run the following commands on the project's root folder:
1) npm install
2) npm test