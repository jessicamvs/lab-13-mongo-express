
'use strict';

const PORT = process.env.PORT || 3000;
process.env.MONGODB_URI = 'mongodb://localhost/recipetest';

const expect = require('chai').expect;
const request = require('superagent');
const Recipe = require('../model/recipe.js');

const server = require('../index.js');

const URL = `http://localhost:${PORT}`;

const testRecipe = {
  name: 'hamburgers',
  mealType: 'lunch',
  origin: 'NC'
};

describe('testing route /api/recipe', function(){
  before(function() {
    server.listen(PORT, () => console.log(`server started on ${PORT}`));

  });
  describe('testing POST requests', function(){
    describe('with valid body', function(){
      after( done => {
        if(this.tempRecipe){
          Recipe.remove({})
          .then(() => done())
          .catch(done);
          return;
        }
        done();
      });

      it('should return a recipe', done => {
        request.post(`${URL}/api/recipe`)
        .send(testRecipe)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.status).to.equal(200);
          expect(res.body.name).to.equal('hamburgers');
          expect(res.body.mealType).to.equal('lunch');
          expect(res.body.origin).to.equal('NC');
          this.tempRecipe = res.body;
          done();
        });
      });
    });
  });

  describe('testing GET requests', function(){
    describe('with valid body', function(){
      before( done => {
        testRecipe.createDate = new Date();
        new Recipe(testRecipe).save()
        .then( recipe => {
          this.tempRecipe = recipe;
          done();
        })
        .catch(done);
      });

      after( done => {
        delete testRecipe.createDate;
        if(this.tempRecipe){
          Recipe.remove({})
          .then(() => done())
          .catch(done);
          return;
        }
        done();
      });

      it('should return a recipe', done => {
        request.get(`${URL}/api/recipe/${this.tempRecipe._id}`)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.status).to.equal(200);
          expect(res.body.name).to.equal('hamburgers');
          done();
        });
      });
    });
  });
});