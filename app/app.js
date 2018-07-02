const yargs = require('yargs');
const path = require('path');
const fs= require('fs');

const rm = require('./random');
const dir = require('../app/directory');

//  command is used  here for handling the diffrent cases

var argv = yargs.command('create', 'Add a New Email' ,{
        name : {
                describe : 'Name of person',
                 alias :   'n',
                 demand :true,
       


        },

        email : {   
                describe : 'Email Id of person',
                demand : true,
                alias  : 'mail'
        }


}).command('find' , 'Find the user Emailid' , {

    email : {
        describe : 'Email Id of the existing user',
        alias : 'mail',
        demand : true
    }

}  ).help().argv;




 
if(argv._[0] == 'create'){

    var mail = argv.email.split('@');
    
    // this is code ,if user already exist or not    
    
    var arr = dir.check('./db/');
    
    arr.forEach((folder) => {
     
        var name = folder.split("_");
        if(name[0] ===  mail[0] ){
            console.log("User already Exist");
            process.exit(1);
        }
        
    });
    
    
    var fdname = mail[0] +'_' +rm.num();
    var user = {name : argv.name ,email : argv.email}
    
    // to create directory
    fs.mkdir(`./db/${fdname}`,(err)  => {
        if(err)
        console.log("folder cannot be created",err);
    })


    var writeStream = fs.createWriteStream(`./db/${fdname}/${argv.name}.json`);

    writeStream.write(JSON.stringify(user, undefined,4), (err) => {
        if(err)
          return console.log("Data not saved");

        console.log("Data Saved to file",fdname);

    }  );

    writeStream.close();

}





if(argv._[0]  === 'find' ){
    var mail = argv.email.split('@');
    var flag = false;
    var userFile ;
        var arr = dir.check('./db/');
        arr.forEach( element => {
            var name = element.split('_');
            
            if(name[0] === mail[0]){
                flag = true;
                userFile = element;
                return;         
                
            }


        });        
        if(flag){
            var pathFile = path.resolve(`.\\app\\db\\${userFile}`);
            var filePath = __dirname+"\\db\\"+userFile;
            // console.log(`user exist in directory:${filePath}`);
            console.log(`user exist in directory:${pathFile}`);
        }

    else{
        console.log('User Doesn\'t Exist, Please Register First');


    }





}