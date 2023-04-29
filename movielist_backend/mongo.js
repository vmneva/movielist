const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const mongoUrl =
  `mongodb+srv://moviecluster:${password}@cluster0.bns2rj2.mongodb.net/?retryWrites=true&w=majority`

mongoose.connect(mongoUrl)

const movieSchema = new mongoose.Schema({
    title: String,
    director: String,
    likes: Number
})

const Movie = mongoose.model('Movie', movieSchema)

const blog = new Movie({
    title: "Summer vacation",
    director: "Rosa Sparks",
    likes: 331
})

movie.save().then(result => {
  console.log('movie saved!')
  mongoose.connection.close()
})