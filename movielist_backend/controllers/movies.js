const moviesRouter = require('express').Router()
const Movie = require('../models/movie')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

//asyncia käyttävät metodit:
moviesRouter.get('/', async (request, response) => {
    const movies = await Movie
        .find({}).populate('user', { username: 1, name: 1} )
    response.json(movies)
})

const getTokenFrom = request => {
    const authorization = request.get('authorization')
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
      return authorization.substring(7)
    }
    return null
  }

//blogin lisäys token-autentikoinnin avulla:
moviesRouter.post('/', async (request, response) => {
    const body = request.body
    //mikäli token on väärä tai sitä ei ole, tulostetaan viesti
    const token = getTokenFrom(request)
    const decodedToken = jwt.verify(token, process.env.SECRET)
    if (!token || !decodedToken.id) {
        return response.status(401).json({ error: 'token missing or invalid' })
    }
    const user = await User.findById(decodedToken.id)

    const movie = new Movie({
        title: body.title,
        director: body.director,
        likes: body.likes,
        user: user._id
    })
    const savedMovie = await movie.save()
        .then(movie => movie.populate('user', { username: 1, name: 1}))
    user.movies = user.movies.concat(savedMovie._id)
    await user.save()
    response.json(savedMovie.toJSON())
})

moviesRouter.delete('/:id', async (request, response) => {
    await Movie.findByIdAndRemove(request.params.id)
    response.status(204).end()
})

moviesRouter.put('/:id', async (request, response) => {
    const body = request.body
    const movie = {
        title: body.title,
        director: body.director,
        favourite: body.favourite,
    }
  
    const updatedMovie = await Movie.findByIdAndUpdate(request.params.id, movie, { new: true }).populate('user', { username: 1, name: 1})
    response.json(updatedMovie)
})

module.exports = moviesRouter