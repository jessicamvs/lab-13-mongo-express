'use strict'

let Dog = require('../model/dog.js')

let testDogs = ['Bowser', 'Woof', 'Fido']

testDogs.forEach(dogName => {
  new Dog({
    name: dogName,
    breed: 'testBreed'
  }).save()
})
