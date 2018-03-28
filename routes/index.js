var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

const productController      = require('../controller/product')
const manufacturerController = require('../controller/manufacturer')
const buyerController = require('../controller/buyer')

router.get('/manufacturers', manufacturerController.all);
router.post('/manufacturers', manufacturerController.create);

router.post('/buyer', buyerController.create);
router.get('/buyers', buyerController.all);
router.get('/buyers/:bid', buyerController.byID);
router.put('/buyers/:bid/:pid/:q', buyerController.addtocart);
router.put('/buyers/:bid/buy', buyerController.buy);
router.delete('/buyers/:bid/:pid', buyerController.removefromcart);


router.get('/products', productController.all);
router.get('/products/:id', productController.byId);
router.post('/products', productController.create);
router.put('/products/:id', productController.update);
router.delete('/products/:id', productController.remove);

module.exports = router;
