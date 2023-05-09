const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
  //käytetään populatea ja määritellään näkyviksi blogista otsikko, url sekä kirjoittaja
  const users = await User
      .find({}).populate('movies', { name: 1, type: 1} )
  response.json(users)
})

usersRouter.delete('/:id', async (request, response) => {
  await User.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

usersRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body
  //tarkistetaan ettei kyseisellä käyttäjänimellä ole jo käyttäjää
  const existingUser = await User.findOne({ username })
  if (existingUser) {
    return response.status(400).json({
      error: 'username must be unique'
    })
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username,
    name,
    passwordHash,
  })

  const savedUser = await user.save().then(user => user.populate('movies', { name: 1, type: 1} ))
  response.status(201).json(savedUser)
})

module.exports = usersRouter