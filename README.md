# Code snippets

## Javascript

- [Convert json to csv](#convert-json-to-csv)

### Convert json to csv
By using [json2csv](https://www.npmjs.com/package/json2csv) module, we can easily to converts json into csv with column titles and proper line endings.

Example Code
```js
const fs = require("fs");
const Parser = require("json2csv").Parser;

const parser = new Parser();
const csv = parser.parse(array);

fs.writeFileSync("./test.csv", csv);
```

Express middleware for sending the csv file
```js
function send(csv, name) {
	if (!name.includes(".csv"))
		name += ".csv";
	return function (req, res) {
		res.setHeader("Content-Disposition", "attachment; filename=" + name);
		res.setHeader("Content-Type", "text/csv");
		res.send(csv);
	}
}
```

Download csv file using axios and file-saver in client side
```js
import axios from "axios";
import FileSaver from "file-saver";

const response = await axios.get(
	"SOME_URL",
	{
		responseType: "blob",
		headers: { Authorization: "Bearer SOME_ACCESS_TOKEN" }
	}
);

FileSaver.saveAs(new Blob([response.data]), "FILENAME");
```