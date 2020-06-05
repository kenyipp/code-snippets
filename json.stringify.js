const json = {
	a: "1",
	b: "2",
	c: "3"
};
const array = [json, json];
console.log(JSON.stringify(array, ["a", "b"]));
