const fs = require('fs');
const path= require('path');


const output = fs.createWriteStream(path.join(__dirname, 'destination.txt'));
var readline = require('readline');
  
var rl = readline.createInterface(
     process.stdin,process.stdout);


rl.question('Привет, введи текст... ', (text) => {

    if (text.toString()==='exit') 
    {rl.close(); return;}
    output.write(text);
    });
    
    rl.on('line', (text) => {

        if (text.toString()==='exit') 
        {rl.close(); return;}
        output.write(text);
      });
    
rl.on('close', () => {
        console.log(`Пока!`);
        rl.close();
    });
