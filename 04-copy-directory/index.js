const fs = require('fs');
const path= require('path');
//удаляем папку
(async ()=>{
 let x=await fs.rm(path.join(__dirname,'files-copy'), {recursive: true, force: true}, (error) => {
   if (error)
      console.log(error);
        //создаем папку
        fs.mkdir(path.join(__dirname,'files-copy'), (err) => {
        if (err) {
            if (!(err.errno==='-17')) {}
            else
            {return console.error(err);}
        }


            //находим все файлы и копируем их

            fs.readdir(path.join(__dirname,'files'),{ withFileTypes: true }, (err, files) => {
                if (err)
                console.log(err);
                else {
                files.forEach(file => {
                    
                        fs.copyFile(path.join(__dirname,'files',file.name), path.join(__dirname,'files-copy',file.name), (err) => {
                            if (err) {
                                return console.error(err);
                            }
                            });
                })
                }
            });

        });
  });
 
    
})();





