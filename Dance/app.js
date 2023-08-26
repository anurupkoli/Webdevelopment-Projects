const fs = require('fs');
const path = require('path');
const express = require('express');
const app = express();
const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1/contactTnx', {useNewUrlParser: true});
const port = 8000;

app.use('/static', express.static('static'));
app.use(express.urlencoded({extended:true}));

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

let contactSchema = new mongoose.Schema({
    name: String,
    age: Number,
    email: String,
    number: Number,
    address: String,
    more: String
})

let contact = mongoose.model('contact', contactSchema);

app.get('/', (req, res)=>{
    res.render('./home.pug');
})

app.get('/contact', (req, res)=>{
    res.render('./contact.pug');
})

// app.post('/contact', (req, res)=>{
//     let info = `Name: ${req.body.name}\nAge: ${req.body.age}\nEmail: ${req.body.email}\nMobile No: ${req.body.number}\nHome Adress: ${req.body.address}\n More About ${req.body.name}: ${req.body.more}\n`
//     fs.writeFileSync(`./submitedForms/${req.body.name}.txt`, info);
//     res.render('contactTnx.pug');
// })
app.post('/contact', (req, res)=>{
    var data = new contact(req.body);
    data.save().then(()=>{
        res.send('Data saved to DabaBase');
    }).catch(()=>{
        res.send('Data not saved in DabaBase');
    })
    // res.render('contactTnx.pug');
})

app.listen(port, ()=>{
    console.log(`Running at port: ${port}`);
})