'use strict'

let Dog = require('../model/dog.js')

// this clears the db on startup and then populates with seeds
Dog
  .remove({})
  .then(() => {
    let testDogs = ['Bowser', 'Woof', 'Fido']

    testDogs.forEach(dogName => {
      new Dog({
        name: dogName,
        breed: 'testBreed'
      }).save()
    })
  })
