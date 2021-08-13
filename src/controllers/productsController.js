const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const descuento = require("../utils/descount")
const thothousand = require("../utils/thotousand")


const controller = {
	// Root - Show all products
	index: (req, res) => {
		res.render("products",{
			products,
			descuento,
			thothousand
		})
	},

	// Detail - Detail from one product
	detail: (req, res) => {
		let productDetail = products.find(product => product.id === +req.params.id); /* usamos find para que devuelva un objeti literarl en vez de un array como lo aria filter */

		res.render("detail",{
			productDetail,
			descuento,
			thothousand,
		})
	},

	// Create - Form to create
	create: (req, res) => { /* esto solo renderiza la vista */
		res.render("product-create-form")
	},
	
	// Create -  Method to store
	store: (req, res) => { /* esta manda los datos */
		const {name,price,discount,category,description} = req.body
		let product ={
			id : products[products.length - 1].id +1,
			name,
			price : +price,
			discount : +discount,
			category,
			description,
			image: "default-image.png"
		}
		products.push(product);
		fs.writeFileSync(productsFilePath,JSON.stringify(products,null,2),"utf-8")
		res.redirect("/products")
	
	},

	// Update - Form to edit
	edit: (req, res) => {
		let product = products.find(product=> product.id === +req.params.id)
		res.render("product-edit-form",{
			product
		})
	},
	// Update - Method to update
	update: (req, res) => {
		const {name,price,discount,category,description} = req.body;
		 products.forEach(product => {
			if (product.id === +req.params.id) { /* recordar poner el +, si no no va a comparar number con string */
				product.name = name;
				product.price = +price;
				product.discount = +discount;
				product.category = category;
				product.description = description;
			}
			
		});
		fs.writeFileSync(productsFilePath,JSON.stringify(products,null,2),"utf-8");
			res.redirect("/products");
	
	},

	// Delete - Delete one product from DB
	destroy : (req, res) => {
		let productsModi = products.filter(product=> product.id !== +req.params.id)  /* fitramos todos los productos menos el producto cuyo id sea igual al id que viene en el params */
		fs.writeFileSync(productsFilePath,JSON.stringify(productsModi,null,2),"utf-8")
		res.redirect("/products")

	}

};

module.exports = controller;