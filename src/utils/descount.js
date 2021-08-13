const thotousand = require("./thotousand")

module.exports= (discount,price) => thotousand( price - (discount * price / 100).toFixed(0));