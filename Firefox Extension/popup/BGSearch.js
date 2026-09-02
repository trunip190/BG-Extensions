/* jshint esversion: 6 */
const filterwords = "";
const inputField = document.getElementById("filter_text");
const radioButtons = document.querySelectorAll('input[name="branch"]');

radioButtons.forEach(radio => {
    radio.addEventListener('change', function (event) {
        // 3. Verify if the clicked radio button is currently checked
        if (this.checked) {
            search();
            //console.log(`You selected: ${this.value}`);
        }
    });
});

inputField.addEventListener("keydown", function (event) {
    //console.log(event.key);
    if (event.key === "Enter") {
        // Action to perform on Enter
        search();
    }
});

function checkFilter(item, mask) {
    var req_location = document.querySelector('input[name="branch"]:checked')?.value;
    var item_fields = item.split("#$#");

    if (item_fields) {
        //console.log("+" + item);
    } else {
        console.log("-" + item);
        return;
    }

    // moved to end

    var keywords = mask.replace("*", " ").split(" ").filter(Boolean);
    var currentString = item;
    var failTerm = "";
    var failed = false;
    var count = 0;
    if (item.length < 1) {
        return;
    }

    //console.log(item);
    termSearch: for (const term of keywords) {
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
                    currentString = currentString.replace(term.substring(1), "");
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
        // moved from beginning
        if (req_location) { } else {
            req_location = 'all';
        }

        if (req_location == "van") {
            console.log("stocked");
            if (item_fields[6].length < 1 & item_fields[7].length < 1) {
                //console.log("location not found");
                return;
            } else {
                //console.log("found in warehouse");
            }
        } else {
            //console.log("." + req_location + "-" + item_fields[0]);
        }

        appendResult(item); // + "; " + mask );
    }
    else {
        if (count > 1) {
            //console.log(count + " " + item + ": " + failTerm);
        }
    }



}

function appendResult(item) {
    var values = item.split("#$#");
    //console.log(values.length + " elements");
    var table = document.getElementById("resulttable");
    var row = table.insertRow(-1);

    var cCode = row.insertCell(0);
    //var cName = row.insertCell(1);
    var cDescription = row.insertCell(1);
    //var cStatus = row.insertCell(x);
    //var cActive = row.insertCell(x);
    var cCombStat = row.insertCell(2);
    var cBin1 = row.insertCell(3);
    var cBin2 = row.insertCell(4);
    //var cCatName = row.insertCell(x);
    //var cCatCode = row.insertCell(x);
    //var cDesc2 = row.insertCell(x);

    // values[2] ??= "Not in branch";
    // values[3] ??= "Not in branch";

    cCode.textContent = values[0];
    //cName.textContent = values[1];

    var sDiff = (values[10].replace(values[2], ""));
    var sDescription = values[2] + sDiff;
    cDescription.textContent = sDescription; //values[2] + values[10];
    cDescription.innerHTML = "<a>" + sDescription + "</a>";
    //cDescription.textContent = values[2] + values[10];
    //cDescription.textContent = values[10];

    //cStatus.textContent = values[3];
    //cActive.textContent = values[4];
    cCombStat.textContent = values[5];
    cBin1.textContent = values[6];
    cBin2.textContent = values[7];
    //cCatName.textContent = values[8];
    //cCatCode.textContent = values[9];
    //cDesc2.textContent = values[10];
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
    document.getElementById("scrollTable").style.height = "auto";

}

document.addEventListener('DOMContentLoaded', function () {
    window.focus();
});