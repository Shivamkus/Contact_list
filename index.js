const express = require('express');
const path = require ('path');
const port = 5000;

const db = require('./config/mongoose');
const Contact = require('./models/contact');
const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname , 'views'));
app.use(express.urlencoded());

app.use(express.static('assets'));
// middlewere

// app.use (function(req,res,next){
//   console.log("middleware 1 called");
//   next();
// });


// //middleware 2
// app.use (function(req,res,next){
//   console.log('middleware 2 is called');
//   next();
// })

 var contactList = [
  {
    name:"shivam kushwah",
    phone:"1234567890"
  },
  {
    name:"Ram ",
    phone: " 8978882"
  },
  {
    name: "Gopal",
    phone:"8777746"
  }
]

app.get('/' , function(req , res){
  // console.log(__dirname);
    // res.send('<h1>cool , its running on in it</h1>');
      
    Contact.find({}, function(err, contacts){
      if(err){
        console.log('error on fatching the database from db');
        return;
      }
      return res.render('home',
      {
        title: 'my contact list',
        contact_list : contacts
      });
    });


    
});
app.get('/prectice' , function(req,res){
return res.render('prectice' ,{title: 'prectice page'})
});

app.get('/delete-contact/' , function(req,res){
        // console.log(req.query);
        let id = req.query.id;

        // let contactIndex = contactList.findIndex(contact => contact.phone == phone);
        // if(contactIndex != -1){
        //   contactList.splice(contactIndex , 1);
        // }
         Contact.findByIdAndDelete(id, function(err){
               if(err){
                console.log('error in deleteing an object from database' , err);
               }
               return res.redirect('back');

               
         });

});

app.post('/create-contact' , function(req, res){
    //  return res.redirect('/prectice')
    // contactList.push({
    //      name:req.body.name,
    //      phone:req.body.phone
    // });
      Contact.create({
              name:req.body.name,
              phone:req.body.phone
      }, function(err ,newContact){
        if (err){console.log('error creating contact',err) ;
        return;}

        console.log('**********' , newContact);
        return res.redirect('back');
      });
    });

app.listen(port, function (err){
  if(err){
    console.log("error on running express server" , err);
    
  }
  console.log('yep! my express server is running on port :',port);
});


