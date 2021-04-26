#!/usr/bin/env node

const { rejects } = require("assert");
const fs = require("fs");
const { resolve, join } = require("path");
const util = require("util");
const chalk = require("chalk");

/*

  // creates an array with length of filenames, each value being null

  // BAD CODE (see Lec 327):  Maintain an array of the results from each lstat. As each cb is invoked, add stats object to this array.  When array is full, log everything in it

  const allStats = Array(filenames.length).fill(null);

  for (let filename of filenames) {
    const index = filenames.indexOf(filename);
    fs.lstat(filename, (err, stats) => {
      if (err) {
        console.log(err);
      }

      // problem: console.log is run before all callbacks are resolved
      // affects order of files logged
    
    
      // SOLUTION 1
      allStats[index] = stats;

      // See if there is any null values left
      const ready = allStats.every((stats) => stats);

      // need index to reference stats back to filename
      if (ready) {
        allStats.forEach((stats, index) => {
          console.log(filenames[index], stats.isFile());
        });
      }

      // BAD CODE COMPLETE
      // - not ideal because harder to maintain as code becomes more complex
      // OPTIONAL SOLUTIONS (see Lec 328)

    }); 
  }
  */

// SOLUTION 2 (BETTER CODE):  Wrap lstat call with a promise, use async/await to process lstat call one at a time

/*
  // Method #1
  const lstat = (filename) => {
    return new Promise((res, rej) => {
      fs.lstat(filename, (err, stats) => {
        if (err) rejects(err);

        resolve(stats)
      });
    });
  };
  */

/*
  // Method #2
  const lstat = util.promisify(fs.lstat)
  */

/*
// Method #3
const { lstat } = fs.promises;


fs.readdir(process.cwd(), async (err, filenames) => {
  if (err) {
    console.log(err);
  }

  for (let filename of filenames) {
    try {
      const stats = await lstat(filename);
      console.log(filename, stats.isFile());
    } catch (err) {
      console.error(err);
    }
  }
});
*/

// SOLUTION 3 (BEST):  Wrap the lstat call with a promise, use async/await + the Promise.all helper method to process lstat calls all at once

const { lstat } = fs.promises;

// Add node-ls commands
const targetDir = process.argv[2] || process.cwd()

fs.readdir(targetDir, async (err, filenames) => {
  if (err) {
    console.log(err);
  }

  const statPromises = filenames.map((filename) => {
    return lstat(join(targetDir, filename));
  });

  const allStats = await Promise.all(statPromises);

  for (let stats of allStats) {
    const idx = allStats.indexOf(stats);

    if (stats.isFile()) {
      console.log(chalk.green(filenames[idx]));
    } else {
      console.log(chalk.blue(filenames[idx]));
    }
  }
});
