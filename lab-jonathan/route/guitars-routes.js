let Guitar = require('../model/guitars.js');
let Owner = require('../model/owners.js');
let Router = require('express').Router;
let router = module.exports = new Router();
let jsonParser = require('body-parser').json();
let createError = require('http-errors');


router.get('/guitars/:id', (req, res, next) => {
  Guitar.findById(req.params.id)
    .then(guitar => res.json(guitar))
    .catch(next);
});


router.post('/guitars', jsonParser, function(req, res, next) {
  new Guitar(req.body).save()
  .then(guitar => res.json(guitar))
  .catch(next);
});


router.put('/guitars/:id', function(req, res, next){
  Guitar.findByIdAndUpdate(req.params.id, req.body, {new: true})
  .then(guitar => res.json(guitar))
  .catch(err => {
    if(err.name === 'ValidationError') return next(err);
    next(createError(404, err.message));
  });
});
//   .then(function(axe){
//     Guitar.update({make: axe.make}, function(err){
//       if(err){
//         console.error(err);
//       }
//       console.log('updated the axe');
//       res.status(200).end('guitar updated');
//     });
//   })
//   .catch(next);
// });


router.delete('/guitars/:id', function(req, res, next){
  Guitar.findByIdAndRemove(req.params.id)
  .then( () => res.status(204).send())
  .catch(err => next(createError(404, err.message)));
});

// router.delete('/guitars/:id', function(req, res, next){
//   Guitar.findByIdAndRemove(req.params.id)
//   .then(() => res.status(204).send())
//   .catch(err => next(createError((404, err.message)))
// });
//     // Guitar.remove({make: axe.make}, function(err){
//     //   if(err){
//     //     console.error(err);
//     //   }
//     //   console.log('deleted the axe');
//     //   res.status(204).end();
//     // })
//     // .catch(err => {
//     //   console.error('did not delete');
//     //   res.status(404);
//     //   res.json({msg: 'Not Found'});
//     // });
// });
