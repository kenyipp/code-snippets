# Code snippets
A list of frequently used linux, javascript and python command. 

## Index

* Linux command
  + [EADDRINUSE: address already in use - Kill Server](#kill-server-in-use)
  + [Get the top 10 largest file](get-the-top-10-largest-file)
* Javascript
  + [JSON.stringify](#json-stringify)
  + [Convert Json to Csv](#convert-json-to-csv)
  + [Convert Csv to Json](#convert-csv-to-json)
  + [MySql Commands](#mysql-commands)

### Kill Server in use

``` sh
# Find the process PID
ps aux | grep node
# Kill the process
kill -9 PID
```

### Get the top 10 largest file

``` sh
du -a /var | sort -n -r | head -n 10
```

### JSON. stringify

Given that we have a json

``` js
const json = {
    a: "1",
    b: "2",
    c: "3"
};
```

1. Retrieve on the key "a" and "b"

``` js
console.log(JSON.stringify(json, ["a", "b"])); 
//{"a":"1","b":"2"}
```

2. Retrieve data using function

``` js
console.log(
    JSON.stringify(json, function(key, value) {
        if (key == "b")
            return undefined;
        return value;
    })
); 
//{"a":"1","c":"3"}
```

3. Implement the transform using `toJSON method`
``` js
const json = {
	a: "1",
	b: "2",
	c: "3",
	toJSON: function(){
		return "Hello world " + this.a;
	}
};
console.log(JSON.stringify(json)); 
// Hello world 1
```

4. It also apply on array
``` js
const json = {
	a: "1",
	b: "2",
	c: "3"
};
const array = [json, json];
console.log(JSON.stringify(array, ["a", "b"]));
// [{"a":"1","b":"2"},{"a":"1","b":"2"}]
```


### Convert Json to Csv

By using [json2csv](https://www.npmjs.com/package/json2csv) module, we can easily to converts json into csv with column titles and proper line endings. 

Example Code

``` js
const fs = require("fs");
const Parser = require("json2csv").Parser;

const parser = new Parser();
const csv = parser.parse(array);

fs.writeFileSync("./test.csv", csv);
```

Express middleware for sending the csv file

``` js
function send(csv, name) {
    if (!name.includes(".csv"))
        name += ".csv";
    return function(req, res) {
        res.setHeader("Content-Disposition", "attachment; filename=" + name);
        res.setHeader("Content-Type", "text/csv");
        res.send(csv);
    }
}
```

Download csv file using axios and file-saver in client side

``` js
import axios from "axios";
import FileSaver from "file-saver";

const response = await axios.get(
    "SOME_URL", {
        responseType: "blob",
        headers: {
            Authorization: "Bearer SOME_ACCESS_TOKEN"
        }
    }
);

FileSaver.saveAs(new Blob([response.data]), "FILENAME");
```

### Convert Csv to Json

``` js
const csv2json = require("csv2json");
const fs = require("fs");

fs.createReadStream("data.csv")
    .pipe(csv2json({
        // Defaults to comma.
        separator: ";"
    }))
    .pipe(fs.createWriteStream("data.json"));
```

### MySql Commands

Update the auto increment of table

``` sh
ALTER TABLE table_name AUTO_INCREMENT=1;
```

[MySql WordCount function](https://stackoverflow.com/questions/12156970/mysql-count-word-in-sql-syntax)

``` sh
DELIMITER $$
CREATE FUNCTION wordcount(str TEXT)
		RETURNS INT
		DETERMINISTIC
		SQL SECURITY INVOKER
		NO SQL
	BEGIN
		DECLARE wordCnt, idx, maxIdx INT DEFAULT 0;
		DECLARE currChar, prevChar BOOL DEFAULT 0;
		SET maxIdx=char_length(str);
		WHILE idx < maxIdx DO
			SET currChar=SUBSTRING(str, idx, 1) RLIKE '[[:alnum:]]';
			IF NOT prevChar AND currChar THEN
				SET wordCnt=wordCnt+1;
			END IF;
			SET prevChar=currChar;
			SET idx=idx+1;
		END WHILE;
		RETURN wordCnt;
	END
$$
DELIMITER ;
```
