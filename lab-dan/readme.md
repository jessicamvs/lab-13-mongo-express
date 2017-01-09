#:dog: Dan's Owner & Dog(e) API with Express & Mongo :dog:

This is a basic API with _persistent_ data which is powered by Express and MongoDB.

Here's the properties of the owner object with their appropriate data types:
```
{
  "id": ObjectID,
  "creationDate": new Date(),
  "name": String,
  "pets": [Array of ObjectIDs]
}
```
Here's the properties of the dog object with their appropriate data types:
```
{
  "id": ObjectID,
  "creationDate": new Date(),
  "name": String,
  "breed": String,
  "owner": Object ID
}
```
You can call```/dogs``` to get all existing objects. It will return a JSON object.

GET ```/dogs/[existing-objectid]``` -- grab a specific object by its id. It will return a JSON object.

POST ```/dogs``` (```{name: [NAME], breed: [BREED], owner: [Owner ObjectId]}```) -- create a new object with a specified
  name and breed. If no name or breed is given, the object will still be created with
  default values. You MUST include the related owner to add a new pet. It will return the new JSON object.

PUT ```/dog``` (```{id: [objectid], name: [NAME], breed: [BREED]}```) -- update an existing object. To
  update you must give an existing id, otherwise a new object will be created. It will return
  the updated or new JSON object.

DELETE ```/dogs/[existing-objectid]``` -- delete an existing record. It will return a 204 status code if successful.
If there is no existing object for the given ID, it will return an error.

You can call```/owners``` to get all existing objects. It will return a JSON object.

GET ```/owners/[existing-objectid]``` -- grab a specific object by its id. It will return a JSON object.

POST ```/owners``` (```{name: [NAME]}```) -- create a new object with a specified
  name. It will return the new JSON object.

PUT ```/owners``` (```{id: [objectid], name: [NAME]}```) -- update an existing object. To
  update you must give an existing id, otherwise a new object will be created. It will return
  the updated or new JSON object.

DELETE ```/dogs/[existing-objectid]``` -- delete an existing record. It will return a 204 status code if successful.
If there is no existing object for the given ID, it will return an error.
