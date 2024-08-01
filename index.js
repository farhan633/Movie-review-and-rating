const express = require('express')
const mongoose = require('mongoose');
const movieRoutes = require('./routes/MovieRoutes')
const reviewRoutes = require('./routes/ReviewRoutes')
const userRoutes = require ('./routes/UserRoutes')
const cors = require('cors')
const app = express()
const port = 3000



  app.use(cors())
  app.use(express.json())
  app.use('/movies', movieRoutes)
  app.use('/reviews', reviewRoutes)
  app.use('/users', userRoutes)




app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


main()
.then(()=>console.log("db connected"))
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb+srv://farhandeveloper92:A90GoainSzUdLWMm@cluster0.4cuq0ea.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');
}