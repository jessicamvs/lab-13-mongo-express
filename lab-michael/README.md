### Welcome to the MONGO EXPRESS lab Readme

First startup your terminal and be in the root directory of the folder.
## GET Method
* The first thing you should do to list current recipes:

``` curl http://localhost:3000/api/recipe```

This will list all the recipes
*  To see a specific ID of a recipe:

``` curl http://localhost:3000/api/recipe/recipeID```

This will bring up this details of named recipe ID.
## POST Method

* To post a specific recipe:

```curl -H "Content-Type: application/json" -X POST -d '{"name":"BURGERS","mealType":"breakfast","origin":"Dad","ingredients":"beef, seasonings"}' http://localhost:3000/api/recipe/```

Name, mealType, and origin are all required. Other non-required parameters involve ingredients, directions, and a createTime which is handled by the server.

## PUT Method

* Update existing recipe

```curl -H "Content-Type: application/json" -X PUT -d '{"name":"BURGERS","mealType":"lunch","origin":"MOM","ingredients":"beef, seasonings"}' http://localhost:3000/api/recipe/recipeID```


## Delete Method

* Delete a recipe

```curl -X DELETE http://localhost:3000/api/recipe/recipeID```
