Project Structure:

1) main: production code
    i) core: AST node processing
        a) model: Classes for the code structures that need to be detected in the AST (i.e. IIFEs)
        b) parser: Classes for the detection of the code structures of the model package
    ii) io: file input/output utilities (file listing, read/write files)

2) test: jest tests
    i) core/parser: tests for parsing/detection of the code structures
    ii) resources: JS example files given as input in the parser


Project setup: run the following commands on the project's root folder:
1) npm install
2) npm test