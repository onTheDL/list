#!/usr/bin/env node

const fs = require("fs");

fs.readdir(process.cwd(), (err, filenames) => {
  if (err) {
    console.log(err);
  }

  /*
 
  for (let filename of filenames) {
    fs.lstat(filename, (err, stat) => {
      if(err) {
        console.log(err);
      }

     
    });
  }
  

  */

  // creates an array with length of filenames, each value being null

  // BAD CODE (see Lec 327)
  const allStats = Array(filenames.length).fill(null);

  for (let filename of filenames) {
    const index = filenames.indexOf(filename);
    fs.lstat(filename, (err, stats) => {
      if (err) {
        console.log(err);
      }

      // problem: console.log is run before all callbacks are resolved
      // affects order of files logged

      //SOLUTION 1
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
      // OPTIONAL SOLUTIONS (see Lec 328)
    });
  }
});
