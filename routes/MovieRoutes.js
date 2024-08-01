const express = require('express')
const router = express.Router()
const Movie = require('../models/movie')

router.get('/',async(req,res)=> {
    try{
     const movies = await Movie.find()
     res.status(200).json(movies)
    }
    catch(error){
     res.status(500).send("could not fetch data from backend")
   
    }
   })
     router.get('/:movieId',async(req,res)=>{
       try{
       const movie = await Movie.findById(req.params.movieId).exec();
       res.status(200).json(movie)
       }
       catch(error){
        res.status(404).send("movie of given id is wrong")
       }
   
     })
   
   
   
   router.post('/',async(req,res)=>{
       try{
         const movie = new Movie(req.body)
       await movie.save()
       res.status(201).json(movie)
       }
       catch(error){
         res.status(400).send("pls check u enterd data")
       }
   })
   router.patch('/:movieId',async(req,res)=>{
   try{
     const data = req.body
     const movie = await Movie.findByIdAndUpdate(req.params.movieId,data,{new:true})
     res.status(200).json(movie)
   }
   catch(error){
     res.status(400).send("check the data ")
   }
    
   })


   router.delete('/movieId',async(req,res)=>{
    try{
      await Movie.findByIdAndDelete(req.params.reviewId)
      res.status(204).send("deleted")
       
    }
    catch(error){
      res.status(404).send("review not fund")
      console.log(error)

    }
   })

module.exports = router