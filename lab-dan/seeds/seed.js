'use strict'

const Owner = require('../model/owner.js')
const Dog = require('../model/dog.js')

let seedOwnersAndPets = [
  {
    name: 'Dave',
    pets: [
      {name: 'Bowser', breed: 'Golden'},
      {name: 'Woof', breed: 'German'},
    ],
  },
  {
    name: 'Carol',
    pets: [
      {name: 'Jack', breed: 'Shithead'},
    ],
  },
  {
    name: 'Bubba',
    pets: [
      {name: 'Gus', breed: 'Golden'},
      {name: 'Diva', breed: 'Shiba'}
    ]
  }]

// this clears the db on startup and then populates with seeds
Dog
  .remove({})
  .then(() => {
    Owner
      .remove({})
      .then(() => {
        let ownerNames = seedOwnersAndPets.map(owner => {
          return {name: owner.name}
        })
        Owner
          .create(ownerNames)
          .then(owners => {
            console.log(owners)
            let i = 0
            // for each owner, create pets
            owners.forEach(owner => {
              console.log('now creating pets for', owner)
              let pets = seedOwnersAndPets[i].pets.map(pet => {
                return {
                  name: pet.name,
                  breed: pet.breed,
                  owner: owner._id,
                }
              })
              i++
              Dog
                .create(pets)
                .then(pets => {
                  console.log(pets)
                  // push pets id to owner
                  pets.forEach(pet => {
                    console.log(`saving pet id to owner: ${owner._id} ${pet._id}`)
                    owner.pets.push(pet._id)
                  })
                  owner.save()
                })
                .catch(err => console.error(err))
            })
          })
          .catch(err => console.error(err))
      })
      .catch(err => console.error(err))
  })
  .catch(err => console.error(err))
