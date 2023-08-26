const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const { boolean } = require('webidl-conversions');
mongoose.connect('mongodb://127.0.0.1/Palazzo', {useNewUrlParser: true});
const port = 8000;

app.use('/static', express.static('static'));
app.use(express.urlencoded({extended:true}));

// app.set('view engine', 'html');
// app.set('views', path.join(__dirname, 'views'));

let PalazzoContactSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    number: Number,
    subject: String,
    text: String,
    checkbox: String
})

let PalazzoContact = mongoose.model('PalazzoContact', PalazzoContactSchema);

app.get('/', (req,res)=>{
    res.sendFile(path.join(__dirname+'/views/index.html'));
})

app.post('/contact',(req, res)=>{
    let data = new PalazzoContact(req.body);
    data.save().then(()=>{
        res.send('Info sent......We will contact you shortly');
    }).catch(()=>{
        res.send('Some Error Occured');
    })
})


app.listen(port, ()=>{
    console.log(`App running at Port ${port}`);
})