const Model = require('../models');
const {Product, Manufacturer,Buyer} = Model;
const mongoose = require('mongoose');

const productController = {
    all (req, res) {
        // Returns all products
        Product.find({})
            // alongside it's manufacturer
            // information
            .populate('manufacturer')
            .exec((err, products) => res.json(products))
    },
    byId (req, res) {
        const idParam = req.params.id;
        console.log(idParam);
        // Returns a single product
        // based on the passed in ID parameter
        Product
            .findOne({_id: idParam})
            // as well as it's manufacturer
            .populate('manufacturer')
            .exec( (err, product) => res.json(product) );
    },
    create (req, res) {
        const requestBody = req.body;
        // Creates a new record from a submitted form
        var newManufacturer;
        // and saves the record to
        // the data base
        var manufacturerName = requestBody.manufacturer;
        console.log(manufacturerName);
        Manufacturer.findOne({name:manufacturerName},function (err,result) {
        console.log("herefone"+result);

        if(!result)
        { newManufacturer = new Manufacturer({
          _id:new mongoose.Types.ObjectId(),
          name:manufacturerName
        })
        console.log("hereinserting");
        //console.log(newManufacturer);
        newManufacturer.save();
}
else{
  newManufacturer = result;
  console.log(newManufacturer);
  console.log("hereelse");
  //console.log(newManufacturer);
}

  console.log(newManufacturer+"q");
        const newProduct = new Product({
        name:requestBody.name,
        image:requestBody.image,
        price:requestBody.price,
        description:requestBody.description,
	quantity:requestBody.quantity,
        manufacturer:newManufacturer._id
        });

        newProduct.save( (err, saved) => {
            // Returns the saved product
            // after a successful save
            Product
                .findOne({_id: saved._id})
                .populate('manufacturer')
                .exec((err, product) => res.json(product));
        } )
        });
    },
    update (req, res) {
        const idParam = req.params.id;
        let product = req.body;
        console.log(product);
        // Finds a product to be updated
        Product.findOne({_id: idParam}, (err, data) => {
            // Updates the product payload
            data.name = product.name;
            data.description = product.description;
            data.image = product.image;
            data.price = product.price;
	    data.quantity = product.quantity;
            Manufacturer.findOne({name:product.manufacturer},function (err,result) {
            console.log("herefone"+result);

            if(!result)
            {console.log("Company Doesn't Exist");
            data.save((err, same) => {res.json(same);console.log(same);});}
    else{

      console.log("hereelse");
      //console.log(newManufacturer);

            data.manufacturer = result._id;
            console.log(data);
            // Saves the product
            data.save((err, updated) => {res.json(updated);console.log(updated);});
          }
        })
      })
    },
    remove (req, res) {
        const idParam = req.params.id;
        // Removes a product
        Product.findOne({_id: idParam}).remove( (err, removed) => res.json(idParam) )
    }
};

module.exports = productController;
