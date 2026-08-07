/* jshint esversion: 6 */
const filterwords = "";

const inputField = document.getElementById("filter_text");

inputField.addEventListener("keydown", function(event) {
	//console.log(event.key);
  if (event.key === "Enter") {
    // Action to perform on Enter
    search();
  }
});

function checkFilter(item, mask) {
    var keywords = mask.replace("*", " ").split(" ").filter(Boolean);
    var currentString = item;
	var failTerm = "";
	var failed = false;
	var count = 0;
    if (item.length < 1) {
        return;
    }

	//console.log(item);
    termSearch: for(const term of keywords) {
		count++;
		//console.log(currentString + " " + term);
        if (currentString.length > 0) {
			//console.log(term[0]);
            if (term.substring(0, 1) == "-") {
                if (currentString.includes(term.substring(1))) {
                    //console.log("-- " + term.substring(1) + ": " + currentString);
					failTerm = term;
					failed = true;
                    break termSearch;
                }
                else {
                    //console.log("-+ " + term.substring(1) + ": " + currentString);
                    currentString = currentString.replace(term.substring(1),"");
                }
            }
            else {
                if (!currentString.includes(term)) {
                    //console.log("+- " + term + ": " + currentString);
					failed = true;
					failTerm = term;
                    break termSearch;
                }
                else {
                    //console.log("++ " + term + ": " + currentString);
                    currentString = currentString.replace(term, "");
                }
            }
        }
    }
    if (!failed) {
        appendResult(item); // + "; " + mask );
    }
	else
	{
		if( count > 1 ) {
			console.log (count + " " + item + ": " + failTerm);
		}
	}
}

function appendResult(item) {
	var values = item.split("#$#");
	var table = document.getElementById("resulttable");
	var row = table.insertRow(0);
	var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);

    // values[2] ??= "Not in branch";
    // values[3] ??= "Not in branch";

	cell1.textContent = values[0];
    cell2.textContent = values[1];
    cell3.textContent = values[2];
    cell4.textContent = values[3];
}

function search() {
    var input = document.getElementById("filter_text").value.toUpperCase();
    document.getElementById("searchterm").textContent = "Contains: " + input;
    var results = products; //products.filter((product) => product.includes(input));
    document.getElementById("count").textContent = "Found:" + results.length;

    document.getElementById("results").textContent = "";
    //results.forEach((product) => appendResult(product));
	var table = document.getElementById("resulttable");
	table.innerText = "";
    results.forEach((product) => checkFilter(product, input));
	document.getElementById("scrollTable").style.height = "400px";
}