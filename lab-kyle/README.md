# Lab-13 Mongo-Express

## Description
This project will let a user create, read, update, and destroy different Car Schemas by using
the /api/car route in conjunction with GET, POST, PUT, and DELETE requests and implements
persistent data using mongodb. It uses express to route requests.

## Endpoints
To make a get request, simply make a request to the following endpoints.

* '/api/car'    
  -example  'http://localhost:3000/api/car'

  This will return a list of all current cars in the database


### GET request

When making a GET request to '/api/car', you may include an ID number.

  -example  'http://localhost:3000/api/car/<id>'

  This will return that specific Car


### POST request

When making a POST request you must include a json object in the body. It must have a **name** property.

  -example '{"name": "Toyota"}'

  This will create a new car object with that schema's information

### POST request

When making a PUT request you must include a json object in the body and an ID. It must have a **name** property.

  -example  'http://localhost:3000/api/car/<id>'
  -example body '{"name": "Chevy"}'

  This will update a car object with that schema's information


### DELETE request

When making a DELETE request you must include the ID number and the Schema for the
item you wish to delete.

  -example 'http://localhost:3000/api/car/<Schema>/<id>'
