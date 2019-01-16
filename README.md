Project Structure:

1) main: production code
    1) core: AST node processing
        1) model: Classes for the code structures that need to be detected in the AST (i.e. IIFEs)
        2) parser: Classes for the detection of the code structures of the model package
    2) io: file input/output utilities (file listing, read/write files)

2) test: jest tests
    1) core/parser: tests for parsing/detection of the code structures
    2) resources: JS example files given as input in the parser


Project setup: run the following commands on the project's root folder:
1) npm install
2) npm test