#:dog: Dan's Dog(e) API with Express & Mongo :dog:

This is a basic API with _persistent_ data which is powered by Express and MongoDB.

Objects are stored as JSON objects in the data folder and the stored objects have
the following properties: ```id, creationDate, name, breed```.

Here's the properties of the dog object with their appropriate data types:
```
{
  "id": ObjectID,
  "creationDate": new Date(),
  "name": String,
  "breed": String
}
```

You can call```/dogs/all``` to get all existing objects. It will return a JSON object.

GET ```/dogs/[existing-objectid]``` -- grab a specific object by its id. It will return a JSON object.

POST ```/dogs``` (```{name: [NAME], breed: [BREED]}```) -- create a new object with a specified
  name and breed. If no name or breed is given, the object will still be created with
  default values. It will return th e new JSON object.

PUT ```/dog``` (```{id: [objectid], name: [NAME], breed: [BREED]}```) -- update an existing object. To
  update you must give an existing id, otherwise a new object will be created. It will return
  the updated or new JSON object.

DELETE ```/dogs/[existing-objectid]``` -- delete an existing record. It will return the text
```delete completed``` and a ```204``` status code if successful. If there is no existing object
for the given ID, it will still return the same success message and code.
