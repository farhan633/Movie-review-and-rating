require('dotenv').config()
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

  const url = process.env.DB_URL
  const password= process.env.DB_PASSWORD
  const passwithurl= url.replace('<password>',password)

  await mongoose.connect(passwithurl);
}
