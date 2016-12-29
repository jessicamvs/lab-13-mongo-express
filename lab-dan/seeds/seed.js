'use strict'

const Owner = require('../model/owner.js')
const Dog = require('../model/dog.js')

let testOwners = [
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
        let ownerNames = testOwners.map(owner => {
          return {name: owner.name}
        })
        Owner
          .create(ownerNames)
          .then(owners => {
            console.log(owners)
            let i = 0
            owners.forEach(owner => {
              let pets = testOwners[i].pets.map(pet => {
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
                  pets.forEach(pet => {
                    owner.pets.push(pet._id)
                    owner.save()
                  })
                })
                .catch(err => console.error(err))
            })
          })
          .catch(err => console.error(err))
      })
      .catch(err => console.error(err))
  })
  .catch(err => console.error(err))
