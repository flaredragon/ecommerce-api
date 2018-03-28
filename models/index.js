const mongoose = require('mongoose');
const Schema   = mongoose.Schema,
      model    = mongoose.model.bind(mongoose),
      ObjectId = mongoose.Schema.Types.ObjectId;

const productSchema = Schema({
  id: ObjectId,
  name: String,
  image: String,
  price: Number,
  quantity:  {
        type: Number,
        min: 0
	},	
  description: String,
  manufacturer: {type: ObjectId, ref: 'Manufacturer'}
});

const manufacturerSchema = Schema({
	id: ObjectId,
	name: String
});

const buyerSchema = Schema({
  id: ObjectId,
  name: String,
  cart: { type : Array , "default" : [] },
  itemsbought: { type : Array , "default" : [] }
});

const Product = model('Product', productSchema);
const Manufacturer = model('Manufacturer', manufacturerSchema);
const Buyer = model('Buyer', buyerSchema);

module.exports = {Manufacturer,Product,Buyer};
