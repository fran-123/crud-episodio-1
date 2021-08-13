const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const tothousand = require("../utils/thotousand")
const descuento = require("../utils/descount")

const controller = {
	index: (req, res) => {
		return res.render("index",{
			products,
			descuento,
			tothousand,
		})
	},
	search: (req, res) => {
		let busqueda = products.filter(product=> product.name.toLowerCase().includes(req.query.keywords.toLowerCase()));
		res.render("results",{
			products:busqueda,
			descuento,
			tothousand,
			resultado : req.query.keywords
		})

	}
}

module.exports = controller;
