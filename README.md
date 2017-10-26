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

(The ISC License)

Copyright 2017 Shunsuke &lt;qfoori@gmail.com&gt;

Permission to use, copy, modify, and/or distribute this software for any purpose with or without fee is hereby granted, provided that the above copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.