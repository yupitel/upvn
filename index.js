const fs = require('fs');
const exec = require('child_process').exec;

// argv
// <newversion> | major | minor | patch | premajor | preminor | prepatch | prerelease
const ARGTYPE = {
  major: 1,
  minor: 1,
  patch: 1,
  premajor: 2,
  preminor: 2,
  prepatch: 2,
  prerelease: 2
};

const PACKAGE = './package.json';

const Upvn = {

  checkFormat: (value, options) => {
    let usable = false;
    if (ARGTYPE[value]) {
      usable = true;
      options.type = value;
      options.value = ARGTYPE[value];
    } else if (value && value.length > 0 && value.indexOf('.') > 0) { // check comma
      let cnt = 0;
      for (let i = 1; i < value.length - 1; i++) {
        if (value[i] === '.') {
          cnt += 1;
        }
      }
      if (cnt >= 2) {
        usable = true;
        options.newversion = value;
      } else {
        console.log('version format is incorrect.');
        console.log('FORMAT: [major].[minor].[patch]-[release]');
      }
    } else {
      console.log('unusable input. set as follows');
      console.log('<newversion> | major | minor | patch '
        + '| premajor | preminor | prepatch | prerelease'); 
    }
    return usable;
  },

  _updateVersion: (version, options) => {
    if (!options) {
      return null;
    }

    let newversion = options.newversion || null;
    if (newversion) {
      return newversion;
    }
    // check major, minor, patch and release info
    const re = /(\D*)(\d+).(\d+).(\d+)(-*)(\D*)(\d*)/;
    const array = version.match(re);
    
    const head  = array[1] || '';
    let major = array[2] || 0;
    let minor = array[3] || 0;
    let patch = array[4] || 0;
    const div = array[5] || '-';
    const tag = array[6] || '';
    let rel   = array[7] || 0;
    
    // update version
    const datatype  = options.type;
    const datavalue = options.value;
  
    if (datatype === 'major') {
      major = parseInt(major, 10) + 1;
      minor = 0;
      patch = 0;
    } else if (datatype === 'minor') {
      minor = parseInt(minor, 10) + 1;
      patch = 0;
    } else if (datatype === 'patch') {
      patch = parseInt(patch, 10) + 1;
    } else if (datatype === 'premajor') {
      major = parseInt(major, 10) + 1;
      minor = 0;
      patch = 0;
      rel   = 0;
    } else if (datatype === 'preminor') {
      minor = parseInt(minor, 10) + 1;
      patch = 0;
      rel   = 0;
    } else if (datatype === 'prepatch') {
      patch = parseInt(patch, 10) + 1;
      rel   = 0;
    } else if (datatype === 'prerelease') {
      rel   = parseInt(rel, 10) + 1;
    }
    newversion = '';
    newversion = `${head}${major}.${minor}.${patch}`;
    if (datavalue === 2) {
      newversion += `${div}${tag}${rel}`;
    }

    return newversion;
  },

  updatePackage: (options) => {
    return new Promise((resolve, reject) => {
      Promise.resolve(options)
        .then((data) => {
          if (!data) {
            return reject(new Error('invalid input'));
          }
          if (data.newversion) {
            return data;
          }

          return new Promise((resolve, reject) => {
            exec('npm info --json', (err, stdout, stderr) => {
              if (err) {
                reject(err);
                return;
              }
              if (!stdout) {
                reject(new Error('invalid output'));
                return;
              }
              const json = JSON.parse(stdout);
              data.version = json.version;
              resolve(data);
            });
          });
        })
        .then((data) => { // increment version
          const version = data.version;
          data.newversion = Upvn._updateVersion(version, data);
          return data;
        })
        .then((data) => { // update version in package.json
          return new Promise((resolve, reject) => {
            fs.readFile(PACKAGE, (err, readdata) => {
              if (err) {
                reject(err);
                return;
              }
              const pac = JSON.parse(readdata);
              const newversion = data.newversion;
              pac.version = newversion;
              resolve(pac);
            });
          });
        })
        .then((data) => { // write package.json
          return new Promise((resolve, reject) => {
            fs.writeFile(PACKAGE, JSON.stringify(data, null, '  '), 'utf8', (err) => {
              if (err) {
                reject(err);
                return;
              }
              resolve(data.version);
            });
          });
        })
        .then((version) => {
          resolve(version);
        })
        .catch((e) => {
          reject(e);
        });
    });
  },

  update: (version, value) => {
    // check format
    const data = {};
    let usable = false;
    usable = Upvn.checkFormat(value, data);
    if (usable === false) {
      return null;
    }
    // update version
    const newversion = Upvn._updateVersion(version, data);
    return newversion;
  }
};

module.exports = Upvn;
module.exports.TYPE = ARGTYPE;
