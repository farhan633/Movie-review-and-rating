const express = require('express')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router()
const User = require('../models/User')


router.get('/',async(req,res)=> {
    try{
     const users = await User.find()
     res.status(200).json(users)
    }
    catch(error){
     res.status(500).send("could not fetch data from backend")
   
    }
   })
     router.get('/:userId',async(req,res)=>{
       try{
       const user = await User.findById(req.params.userId).exec();
       res.status(200).json(user)
       }
       catch(error){
        res.status(404).send("user of given id is wrong")
       }
   
     })
   
     router.post('/signup',async(req,res)=>{
        try{
            const saltRounds = 10;
            const hash = bcrypt.hashSync(req.body.password, saltRounds);

          const user = new User({
             name: req.body.name,
             email: req.body.email,
             password: hash
          })
        await user.save()
        res.status(201).json(user)
        }
        catch(error){
          res.status(400).send("pls check u enterd data")
        }
    })

    router.post('/login', async (req,res)=>{

 try{
     const user = await User.findOne({email: req.body.email})
     if(!user){
        return res.status(404).send('user not fund')

        const passmatch = bcrypt.compareSync(req.body.password, user.password); 
        if(passmatch){

            const token = jwt.sign({ _id:user._id, email:user.email, name:user.name }, process.env.TOKEN_SECRET);           
            res.status(200).json(token)
        }
        else{
            return res.status(401).send("unauthorized access")
        }

     }
 }
 catch(error){

 }


    })


    
module.exports= router