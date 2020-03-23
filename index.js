const microseconds = require('microseconds');

const calc = require('./calc');

const numberOfIterations = Number(process.env.ITERATIONS_NUMBER);
console.log('number of iterations: ', numberOfIterations);

const loose = [];
const strict = [];

const run = () => {
  try {
    // ['1', '2', '3' ...]
    const stringsStrict = Array.from(Array(numberOfIterations), (x, index) => String(index + 1));
    const stringsLoose = Array.from(Array(numberOfIterations), (x, index) => String(index + 1));

    const beforeStrict = microseconds.now();
    stringsStrict.forEach((s) => {
      if (+s === 1) {
        // do something
      } else {
        // do something
      }
    });
    const afterStrict = beforeStrict + microseconds.since(beforeStrict);
    strict.push(afterStrict - beforeStrict);

    const beforeLoose = microseconds.now();
    stringsLoose.forEach((s) => {
      if (s == 1) {
        // do something
      } else {
        // do something
      }
    });
    const afterLoose = beforeLoose + microseconds.since(beforeLoose);
    loose.push(afterLoose - beforeLoose);
  } catch (e) {
    process.exit(1);
  }
};

for (let i = 0; i <= 100; i++) {
  run();
}

const filteredLoose = calc.filterOutliers(loose);
const filteredStrict = calc.filterOutliers(strict);

const meanLoose = calc.getMean(filteredLoose);
const meanStrict = calc.getMean(filteredStrict);

const SDLoose = calc.getSD(filteredLoose);
const SDStrict = calc.getSD(filteredStrict);

console.log(`Loose: ${meanLoose.toFixed(2)} +- ${SDLoose.toFixed(2)} microseconds`);
console.log(`Strict: ${meanStrict.toFixed(2)} +- ${SDStrict.toFixed(2)} microseconds`);

process.exit(0);

