const express = require('express')
const path = require('path')
const app = express();
const mongoose = require('mongoose')
const bodyparser = require('body-parser')
mongoose.connect('mongodb://localhost:27017/contactDance')
const port = 80

//Define mongoose schema
const contactSchema = new mongoose.Schema({
    name:String,
    phone:String,
    email:String,
    address:String,
    desc:String
})
//Compiling to model
const Contact = new mongoose.model('Contact',contactSchema)

// EXPRESS SPECIFIC STUFF
app.use('/static',express.static('static')) //For srving stattic files
app.use(express.urlencoded())

// PUG SPECIFIC STUFF
app.set('view engine','pug') //Set the template engine as pug
app.set('views',path.join(__dirname,'views'))  //Set the views directory

// ENDPOINTS
app.get('/',(req,res)=>{
    const params = {}
    res.status(200).render('home.pug',params)
})

app.get('/contacts',(req,res)=>{
    const params = {}
    res.status(200).render('contact.pug',params)
})

app.post('/contacts',(req,res)=>{
    myData = new Contact(req.body)
    myData.save().then(()=>{
        res.status(200).send('Details saved!!!')
    }).catch(()=>{
        res.status(404).send('Details did not saved!!!')
    })
})

// START THE SERVER
app.listen(port,()=>{
    console.log(`Application started on port ${port}`)
})

