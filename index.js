#!/usr/bin/env node

const fs = require('fs')

fs.readdir(process.cwd(), (err, filenames) => {
  if (err) {
    console.log(err);
  }

  console.log(filenames);
})


// Add comment to index.js file to allow it to be treated like an executable.  Link project