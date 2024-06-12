const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
// const session = require('express-session')
const PricingModel = require("./Model/Pricing")
const MldtModel = require("./Model/Mldata")
const SubdataModel = require("./Model/Subdata")

const app = express()
app.use(express.json()) 
app.use(cors())

mongoose.connect("mongodb://127.0.0.1:27017/Pricing");

// app.use(session({
//     secret: 'your_secret_key', // Use a secret key for session encryption
//     resave: false,
//     saveUninitialized: false
//   }));

// const isAuthenticated = (req, res, next) => {
//     if (req.session && req.session.user) {
//       // If user session exists, continue to the next middleware
//       next();
//     } else {
//       // If user session doesn't exist, redirect to login page
//       res.redirect('/login');
//     }
//   };

app.post('/login' , (req,res)=>{
    const{email , password} = req.body;
    PricingModel.findOne({email:email})
    .then(user=>{
        if(user){
            if(user.password===password){
                res.json('Success')
                
            }
            else{
                res.json('your password is incorrect')
                
            }
            
        }
        else{
            res.json('your account is not created')
            // alert('your accout is not created')
        }
    })
})

// app.post('/register', (req,res)=>{
//     PricingModel.create(req.body)
//     .then(Pricing => res.json(Pricing))
//     .catch(err=>res.json(err))

// })

app.post('/register', async (req, res) => {
    const { email } = req.body;
    
    // Check if email already exists
    const existingUser = await PricingModel.findOne({ email });
    if (existingUser) {
        return res.status(400).json({ error:'Email already in use'});
    }

    PricingModel.create(req.body)
        .then(user => res.json(user))
        .catch(err => res.status(400).json({ error: 'Failed to register user', details: err }));
});




app.get('/getMldata' , (req,res) =>{
    MldtModel.find()
    .then(mldata => res.json(mldata) )
    
    .catch(err=> res.json(err))
    
})

// Get table data based on package name
app.get('/getTableData/:Package_Name', async (req, res) => {
    const packageName = req.params.Package_Name;
    // const IdNo = req.params._id;
    
    try {
        // Find the document in the PricingModel collection
        const pricingData = await SubdataModel.findOne({Package_Name: packageName});
        if (!pricingData) {
            return res.status(404).json({error:'Pricing data not found for the given package name'});
        }
        
        // Find the corresponding document in the MldtModel collection
        // const tableData = await MldtModel.findOne({ _id: IdNo });
        // if (!tableData) {
        //     return res.status(404).json({error:'Table data not found for the given package name'});
        // }

        // Return both pricing and table data
        res.json({pricingData});
        // console.log(pricingData);
    } catch (err){
        console.error(err);
        res.status(500).json({error:'Internal Server Error'});

    }

});

app.get('/getMldata/:_id', async (req, res) => {
    const IdNo = req.params._id;
    try{
        const IdData = await MldtModel.findOne({ _id: IdNo });
        if (!IdData) {
            return res.status(404).json({error:'Table data not found for the given Id No'});
        }
        res.json({IdData});
        // console.log(IdData);
    }
        catch (err){
            console.error(err);
            res.status(500).json({error:'Internal Server Error'});
    }

})

// app.get('/', isAuthenticated, (req, res) => {
//     res.send('Welcome to the home page');
//   });

app.listen(3001,()=>{
    console.log('server start')
})
