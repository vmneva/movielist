const mongoose = require('mongoose')

const movieSchema = new mongoose.Schema({
  //määritellään otsikko pakolliseksi!
    title: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    director: String,
    favourite: Boolean,
})

movieSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
})

module.exports = mongoose.model('Movie', movieSchema)