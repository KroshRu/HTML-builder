const fs = require('fs');
const path= require('path');

fs.readdir(path.join(__dirname,'secret-folder'),{ withFileTypes: true }, (err, files) => {
    if (err)
      console.log(err);
    else {
      console.log("\nCurrent directory filenames:");
      files.forEach(file => {
          if (file.isDirectory()==false){
            fs.stat(path.join(__dirname,'secret-folder',file.name), (err, stats) => {
                console.log(file.name+' - '+path.extname(path.join(__dirname,'secret-folder',file.name))+' - '+stats.size+'byte');
              });
          }
      })
    }
  })

