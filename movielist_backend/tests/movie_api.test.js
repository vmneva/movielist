const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const app = require('../app')
const Movie = require('../models/movie')

const api = supertest(app)

describe('when there are already movies saved', () => {
    //tietokannan alustus ennen testejä, jotta saadaan ne oikein
    beforeEach(async () => {
        await Movie.deleteMany({})
        await Movie.insertMany(helper.initialMovies)
    })
    //testi tarkistamaan, että elokuvat oikeassa muodossa
    test('movies are returned as json', async () => {
        await api
          .get('/api/movies')
          .expect(200)
          .expect('Content-Type', /application\/json/)
    })
    //testi tarkastamaan, että kaikki elokuvat palautuu
    test('all movies are returned', async () => {
        const response = await api.get('/api/movies')
    
        expect(response.body).toHaveLength(helper.initialMovies.length)
    })

    describe('deleting movies', () => {
        //testi poistamiselle, pituus vähenee yhdellä jos id oikea
        test('succeeds if id is valid, list is also 1 shorter', async () => {
            const moviesAtStart = await helper.moviesInDb()
            const movieToDelete = moviesAtStart[0]

            await api
                .delete(`/api/movies/${movieToDelete.id}`)
                .expect(204)

            const moviesAtEnd = await helper.moviesInDb()
            //testataan, että pituus on yhden vähemmän:
            expect(moviesAtEnd).toHaveLength(
                helper.initialMovies.length - 1
            )
            //katsotaan, että poistettua nimeä ei enää löydy listalta:
            const names = moviesAtEnd.map(m => m.name)
            expect(names).not.toContain(movieToDelete.name)
        })
    })
})

//lopuksi katkaistaan vielä Mongoosen tietokantayhteys:
afterAll(() => {
  mongoose.connection.close()
})