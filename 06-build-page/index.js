const fs = require('fs');
const path= require('path');

let components = [];
let file_names=[];
let components_name = [];

(async ()=>{

fs.rmSync(path.join(__dirname,'project-dist'), {recursive: true, force: true}, (error) => {
    if (error)
       console.log(error);
})
})();

//читаем template и компонентс

fs.readdir(path.join(__dirname,'components'),{ withFileTypes: true }, (err, files) => {
    if (err)
      console.log(err);
    else {

        let i=0;
      files.forEach(file => {
        file_names[i]=file.name;
        i++;
      })}});

(async ()=>{

let template=await fs.promises.readFile(path.join(__dirname, 'template.html'), 'utf-8');

      for(let i=0;i<file_names.length;i++)
      {
        components_name[i]=file_names[i].slice(0,file_names[i].length-5);;
        components[i] = await fs.promises.readFile(path.join(__dirname, 'components',file_names[i]), 'utf-8');
        
        
        
      };

      for(let i=0;i<file_names.length;i++)
      {
        template=template.replace('{{'+components_name[i]+'}}',components[i]);
      }

      const output = fs.createWriteStream(path.join(__dirname, 'project-dist', 'index.html'));
      output.write(template)
      })();
      
    
      

//создаем папку
fs.mkdir(path.join(__dirname,'project-dist'), (err) => {
    if (err) {
        if (!(err.errno==='-17')) {}
        else
        {return console.error(err);}
    }
});

//Объединяем styles

const output = fs.createWriteStream(path.join(__dirname, 'project-dist', 'style.css'));

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

  //копируем assets

  //создаем папку
  fs.mkdir(path.join(__dirname,'project-dist','assets'), (err) => {
    if (err) {
        if (!(err.errno==='-17')) {}
        else
        {return console.error(err);}
    }
});


//находим все файлы и копируем их
copy_catalog(path.join(__dirname,'assets'),path.join(__dirname,'project-dist','assets'));

function copy_catalog(catalog_path,dist_catalog_path){
fs.readdir(catalog_path,{ withFileTypes: true }, (err, files) => {
if (err)
  console.log(err);
else {
  files.forEach(file => {
    if (file.isDirectory()) {
        fs.mkdir(path.join(dist_catalog_path,file.name), (err) => {
            if (err) {
                if (!(err.errno==='-17')) {}
                else
                {return console.error(err);}
            }
        });        
        copy_catalog(path.join(catalog_path,file.name),path.join(dist_catalog_path,file.name));} //если файл это директория, то создаем каталог и запускаем копирование каталога отдельно
        else {
        fs.copyFile(path.join(catalog_path,file.name), path.join(dist_catalog_path,file.name), (err) => {
            if (err) {
                return console.error(err);
            }
            });
        }
  })
}
})
}






