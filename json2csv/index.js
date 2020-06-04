"use strict";
const fs = require("fs");
const Parser = require("json2csv").Parser;

const array = [
	{
		carModel: "Audi",
		price: 10000,
		color: "blue"
	},
	{
		carModel: "BMW",
		price: 15000,
		color: "red"
	}
];

/**
 * 
 * Convert the json array into csv string
 * 
 */
const parser = new Parser();
const csv = parser.parse(array);

/**
 * 
 * Save as local file
 * 
 */
fs.writeFileSync("./test.csv", csv);

/**
 * 
 * Express middleware for sending csv file
 * 
 */
function send(csv, name) {
	if (!name.includes(".csv"))
		name += ".csv";
	return function (req, res) {
		res.setHeader("Content-Disposition", "attachment; filename=" + name);
		res.setHeader("Content-Type", "text/csv");
		res.send(csv);
	}
}

/**
 * 
 * Download csv file using axios and file-saver in client side
 * 
 */
// import axios from "axios";
// import FileSaver from "file-saver";

// const response = await axios.get(
// 	"SOME_URL",
// 	{
// 		responseType: "blob",
// 		headers: { Authorization: "Bearer SOME_ACCESS_TOKEN" }
// 	}
// );

// FileSaver.saveAs(new Blob([response.data]), "FILENAME");

