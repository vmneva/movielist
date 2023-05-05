const Movie = require('../models/movie')
const initialMovies = [
  {
    name: "Test movie",
    year: 2023,
    type: "movie",
    dateAdded: "12/12/2023",
  },
  {
    name: "Test movie2",
    year: 2022,
    type: "movie",
    dateAdded: "12/12/2022",
  },
]

const moviesInDb = async () => {
    const movies = await Movie.find({})
    return movies.map(movie => movie.toJSON())
}

module.exports = {
    initialMovies, moviesInDb
}