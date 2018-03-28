const mongoose = require('mongoose');
const Model = require('../models');
const {Product, Manufacturer,Buyer} = Model;

const buyerController = {
    all (req, res) {
      // Returns all manufacturers
        Buyer.find({})
            .exec((err, buyers) => res.json(buyers))
    },
    create (req,res){
      const requestBody = req.body;
	console.log(req.body);
      // Creates a new record from a submitted form
      const newBuyer = new Buyer(requestBody);
	console.log(newBuyer);
      newBuyer.save((err, saved) => {
          // Returns the saved product
          // after a successful save
          Buyer
              .findOne({_id: saved._id})
              .exec((err,buyer) => res.json(buyer));
      })


    },
addtocart (req,res) {
	var pid = req.params.pid;
	var bid=req.params.bid;
	var q = parseInt(req.params.q);
	var thebuyer={};
	var theproduct={};
	Buyer.findOne({_id:bid}).exec()
	.then((thebuyer) => {
	console.log(thebuyer);
	Product.findOne({_id:pid}).exec()
	.then( (theproduct) => {
	theproduct.quantity=theproduct.quantity-q;
	if(theproduct.quantity>0)
{
	let obj = thebuyer.cart.find((o, i) => {
    	if (o.itemid == pid) {
        thebuyer.cart[i] = {
	itemid:theproduct._id,
	quantity: thebuyer.cart[i].quantity+q};
        return true; // stop searching
    	}
	});
	if(!obj)
	{
	thebuyer.cart.push({
	itemid:theproduct._id,
	quantity:q});
	}
	Product.where({ _id: pid }).update({ $set: { quantity: theproduct.quantity }},function(err,callback){
	if(err){
		console.log('Not Possible');
		}

	Buyer.where({ _id: bid }).update({ $set: { cart:thebuyer.cart }} ,function(err,buyerUpdated) { res.json(buyerUpdated)});

		})
}
else res.status(400).send("Error");
})
.catch((err) => {
res.status(400).send(err);
});

})
.catch((err) => {
res.status(400).send(err);
});
},

    

    byID (req,res) {
	var bid=req.params.bid;
	
            Buyer.findOne({_id: bid})
			.exec( (err, buyer) => res.json(buyer) );
},

   removefromcart(req,res) {
	var bid=req.params.bid;
	var pid = req.params.pid;
	Buyer.findOne({_id:bid}).exec((err,buyer)=> {
	if(err) console.log(err);	
	thebuyer = buyer});
	thebuyer.cart = thebuyer.cart.filter(item => item.id !== pid);
	Buyer.where({ _id: bid }).update({ $set: { cart:thebuyer.cart }},{new: true})
	.then((response) => res.json(response));
}
};

module.exports = buyerController;
