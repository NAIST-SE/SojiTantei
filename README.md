# SojiTantei

SojiTante a tool for analyzing nodeJS projects

In order to analyze a project you need to provide the location of the local git repository related to the project, to do so just change the directory variable inside the configuration.js file to include the path to the project.

Functionalities:

1.  Versions Detector
    The versions detector is comprised of two methods:
    a) Method 1 Retrieve from package.json: To follow this approach the user need to run the script called ”getFilesPerRelease.js” inputting in the first and only parameter the name of the project to be analyzed.
    b) Method 2 Retrieve from commit tags: To follow this approach the user runs the script "getTags.js" inputting in the first and only parameter the name of the project to be analyzed.
    After applying either method, SojiTantei creates a file named R\_{version}.txt containing the hash id of the related commit and the list of the files with extension js or jsx that exists in each of the versions retrieved.

2.  Function-Call Tracer
    The user needs to execute the script called syntaxChecker.js and input the name of the project to be analyzed in the first parameter.
    There are two possible executions of the script,
    (i) running the script without extra parameters will get the function-calls for all the versions of the project included in the output of Versions Detector.
    (ii) running the script inputting from the second parameter the names of version files (i.e. R\_{version}.txt) included in the output of Versions Detector will perform analysis only on those files.

3.  Functions Comparator
    The user need to execute the script called getFunctions.js and input the name of the project to be analyzed in the first parameter.
    There are two possible executions of the script,
    (i) running the script without extra parameters will get the function comparison for all the version projects included in the output of Version Detector, this comparison will be performed by pairs in incremental order from the oldest version to the newest.
    (ii) running the script inputting from the second parameter the names of version files (i.e. R\_{version}.txt}) included in the output of Versions Detector will perform the analysis on those files only, performed by pairs in the inputted order.
