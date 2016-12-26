'use strict'

const bluebird = require('bluebird')
// const mkdirp = bluebird.promisfyAll(require('mkdirp'), {suffix: 'Promised'})
const fs = bluebird.promisifyAll(require('fs'), { suffix: 'Promised'})
const del = require('del')

const objectConstructor = require('./objectConstructor')

const DATA_PATH = `${__dirname}/../data/`

let storage = {}
// temp data storage variable for objects read from file
storage.data = {}

storage.translateAndStoreData = function(data) {
  data = JSON.parse(data)
  storage.data[data.id] = data
}

storage.writeFile = function(data, status) {
  return fs.writeFilePromised(DATA_PATH + `${data.id}.json`, JSON.stringify(data))
  .then(() => Promise.resolve({code: status, data: storage.data[data.id]}))
  .catch(err => Promise.reject(err))
}

storage.fetchItem = function(id) {
  if (!id) {
    return Promise.reject('missing id\n')
  }
  return fs.readFilePromised(DATA_PATH + `${id}.json`)
    .then(data => {
      try {
        storage.translateAndStoreData(data)
        return Promise.resolve({code: 200, data: storage.data[id]})
      } catch (err) {
        return Promise.reject(err.message)
      }
    })
    .catch(() => Promise.reject('not found\n'))
}

storage.fetchAll = function() {
  return fs.readdirPromised(DATA_PATH)
    .then(files => {
      return Promise.all(
        files.map(file => {
          return fs.readFilePromised(DATA_PATH + file)
        })
      )
    })
    .then(dataArray => {
      try {
        dataArray.forEach(data => {
          storage.translateAndStoreData(data)
        })
        return Promise.resolve({code: 200, data: storage.data})
      } catch (err) {
        return Promise.reject(err.message)
      }
    })
    .catch(err => {
      Promise.reject(err.message)
    })
}

storage.postItem = function(obj) {
  let newItem = new objectConstructor(obj.name, obj.breed)
  storage.data[newItem.id] = newItem
  return storage.writeFile(newItem, 201)
}

storage.putItem = function(obj) {
  // as per the rules of put -- update existing object or create a new object
  if (obj.id) {
    return fs.readFilePromised(DATA_PATH + `${obj.id}.json`)
    .then(data => {
      try {
        storage.translateAndStoreData(data)
        Object.keys(obj).forEach(key => {
          storage.data[obj.id][key] = obj[key]
        })
        return Promise.resolve(obj)
      } catch (err) {
        return Promise.reject(err.message)
      }
    })
    .then(obj => {
      return storage.writeFile(storage.data[obj.id], 200)
    })
    .catch({code: 'ENOENT'}, () => {
      // this is thanks to stackoverflow:L http://stackoverflow.com/questions/39089058/how-to-catch-enoent-in-bluebird
      return storage.postItem(obj)
    })
    .catch(err => Promise.reject(err.message))
  } else {
    return storage.postItem(obj)
  }
}

storage.deleteItem = function(id) {
  if (id) {
    return del(DATA_PATH + `${id}.json`, !DATA_PATH)
    .then(() => {
      return Promise.resolve({code: 204, text: 'Delete completed'})
    })
    .catch(err => Promise.reject(err.message))
  }
  return Promise.reject(new Error('Delete request not sent with id in query'))
}

module.exports = storage
