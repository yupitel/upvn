# upvn
====

This library is command line tool to update version info in the package.json with current version info in the NPM.  
Mainly this library is used to update npm version before publish.

## Purpose
Update version info before publish library to NPM.

## Usage
`$upvn [parameter]`  


### About parameter
parameter | description | version info in NPM | sample param | result
:----- | :-----: | :-----: | :-----: | :-----:
<newversion\> | version info. X.Y.Z ... format.<br /> default value is override with this.| 1.2.3 | 3.4.5 | 3.4.5
major | increment major version | 1.2.3 | major | 2.0.0
minor | increment minor version | 1.2.3 | minor | 1.3.0
patch | increment patch version | 1.2.3 | patch | 1.2.4
premajor | increment major version and set release info | 1.2.3 | premajor | 2.0.0-0
preminor | increment minor version and set release info | 1.2.3 | preminor | 1.3.0-0
prepatch | increment patch version and set release info | 1.2.3 | prepatch | 1.2.4-0
prerelease | increment release version | 1.2.3-0 | prerelease | 1.2.3-1


## License 

(The MIT License)

Copyright (c) 2017 Shunsuke &lt;qfoori@gmail.com&gt;  

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
