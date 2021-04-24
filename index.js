#!/usr/bin/env node

const fs = require("fs");

fs.readdir(process.cwd(), (err, filenames) => {
  if (err) {
    console.log(err);
  }

  // BAD CODE ...
  for (let filename of filenames) {
    fs.lstat(filename, (err, stat) => {
      if(err) {
        console.log(err);
      }
      console.log(filename, stat.isFile())
    });
  }
  // BAD CODE COMPLETE

});