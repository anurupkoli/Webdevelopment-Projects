const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
const port = 80;


app.use('/static', express.static('static'));
app.use(express.urlencoded({ extended: true }))

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));


app.get('/', (req, res) => {
    res.render('./index.pug')
})

app.post('/', (req, res) => {
    res.status(200).render('index.pug');
    let form = fs.writeFileSync(`./SubmitedForms/${req.body.name}.txt`, `Name: ${req.body.name}\nAge: ${req.body.age}\nAddress: ${req.body.address}\nEmail: ${req.body.email}\nMobile No: ${req.body.mobileNo}\nGender: ${req.body.gender}\nQuery: ${req.body.query}\n`)
})

app.listen(port, () => {
    console.log(`Running at Port: ${port}`);
})