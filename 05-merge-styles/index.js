const fs = require('fs');
const path= require('path');

let i=0;
const output = fs.createWriteStream(path.join(__dirname, 'project-dist', 'bundle.css'));

fs.readdir(path.join(__dirname,'styles'),{ withFileTypes: true }, (err, files) => {
    if (err)
      console.log(err);
    else {
      files.forEach(file => {
          if ((file.isDirectory()==false)&&(path.extname(path.join(__dirname,'styles',file.name))=='.css')){
            
            fs.readFile(
                path.join(__dirname, 'styles',file.name),
                'utf-8',
                (err, data) => {
                    if (err) throw err;
                    output.write(data)
                }
            );
             
          }
      })
    }
  })



