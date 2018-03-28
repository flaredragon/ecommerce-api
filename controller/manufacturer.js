const Model = require('../models');
const {Product, Manufacturer,Buyer} = Model;
const mongoose = require('mongoose');

const manufacturerController = {
    all (req, res) {
      // Returns all manufacturers
        Manufacturer.find({})
            .exec((err, buyers) => res.json(buyers))
    },
    create (req,res){
      const requestBody = req.body;
      // Creates a new record from a submitted form
      const newManufacturer = new Manufacturer(requestBody);

      newManufacturer.save((err, saved) => {
          // Returns the saved product
          // after a successful save
          Manufacturer
              .findOne({_id: saved._id})
              .exec((err,buyer) => res.json(buyer));
      })


    }
};

module.exports = manufacturerController;
