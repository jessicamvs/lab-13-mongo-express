# Jessica's RESTful Book API!

This project allows you to use HTTP methods to perform CRUD operations on my simple resource, books. You are able to GET, POST, PUT and DELETE books from a MongoDB database.

## How to Install

Simply clone down this repo, move into the repo and run `npm install` in the terminal in order to install all the dependencies.

## How to Start the Server

Move into the directory, `lab-jessica`, and run `node index.js ` in the terminal to start the express http server.

## Server Endpoints

### `/api/books`

* `POST` request
  * Pass data as stringifed json in the body of a post request to create a book
  * Data passed in must be an object with a title and author property
  * Example curl request:

  `curl -i -H "Accept: application/json" -H "Content-Type: application/json" -X POST -d '{"title": "Harry Potter", "author": "J.K. Rowling"}' localhost:3000/api/books`

* `GET` request
  * Pass an id to the url to retrieve a specific book as json
  * Example curl request:

  `curl localhost:3000/api/books/1d5bf500-4c37-4185-8533-53dbbe200596`

* `PUT` request
  * Pass an id to the url to update a specific book
  * Pass data as stringifed json in the body of a put request to update a book in storage
  * Data passed in must be an object with a title and author property
  * Example curl request:

  `curl -i -H "Accept: application/json" -H "Content-Type: application/json" -X POST -d '{"title": "Update Title", "author": "Update Author"}' localhost:3000/api/books/5bf500-4c37-4185-8533-53dbbe20059`


* `DELETE` request
  * Pass an id to the url to delete a specific book
  * Should return 204 status with no content in the body
  * Example curl request:

   `curl -X DELETE localhost:3000/api/books/1d5bf500-4c37-4185-8533-53dbbe200596`

## Error Codes

### `/api/books`

* `GET`, `PUT`, and `DELETE` requests made for a non-existing id will return a 404 error status.
* `GET`, `PUT`, and `DELETE` requests made without an id passed into the url will return a 400 error status.
* `POST` request with no body provided or an invalid body will return a 400 error status
* Unregistered routes will return a 404 error status
