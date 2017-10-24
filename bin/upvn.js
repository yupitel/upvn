const upvn = require('../index');

const exit = () => {
  process.exit();
};


const ARGTYPE = upvn.TYPE;

const data = {};
const argv = process.argv;

let arg = null;
if (argv.length >= 2) {
  arg = argv[2];
}

let usable = false;
if (ARGTYPE[arg]) {
  usable = true;
  data.type = arg;
  data.value = ARGTYPE[arg];
} else if (arg && arg.length > 0 && arg.indexOf('.') > 0) { // check comma
  let cnt = 0;
  for (let i = 1; i < arg.length - 1; i++) {
    if (arg[i] === '.') {
      cnt += 1;
    }
  }
  if (cnt >= 2) {
    usable = true;
    data.newversion = arg;
  } else {
    console.log('version format is incorrect.');
    console.log('FORMAT: [major].[minor].[patch]-[release]');
    exit();
  }
}
if (usable === false) {
  console.log('unusable input. set as follows');
  console.log('<newversion> | major | minor | patch '
    + '| premajor | preminor | prepatch | prerelease');
  exit();
}

upvn.update(data)
  .then((version) => {
    console.log(`update version to ${version}`);
  })
  .catch((e) => {
    console.log(e);
  });
