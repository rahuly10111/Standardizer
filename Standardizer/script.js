var masterAccount_String_Data;
var masterAccount_Object;
var masterAccount_Data_Array = new Array;
$(function () {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = handleStateChange;
    xhr.open("GET", "MasterChartOfAcounts.csv", false);
    xhr.send();
    function handleStateChange() {
        if (xhr.readyState == 4 &&
            xhr.status >= 200 &&
            xhr.status < 300) {
            showData(xhr.responseText);
            destinationAccountdatatable();
        }
    }
    function showData(data) {
        var rows = data.split("\n");
        const heading = rows[0].split(",");
        var rowNum;
        var cells;
        for (rowNum = 1; rowNum < rows.length; rowNum++) {
            cells = rows[rowNum].split(",");
            const masterAccount_obj = {};
            for (let cellNum = 0; cellNum < heading.length; cellNum++) {
                masterAccount_obj[heading[cellNum]] = cells[cellNum];
            }
            masterAccount_Data_Array.push(masterAccount_obj);
        }
        masterAccount_String_Data = JSON.stringify(masterAccount_Data_Array);
        // masterAccount_Object = JSON.parse(masterAccount_String_Data);
    }

});
function destinationAccountdatatable() {
    var destinationAccount_Data_Object = JSON.parse(masterAccount_String_Data);
    const destinationAccount_Element = document.getElementById('DestinationAccountStructureData');
    destinationAccount_Data_Object.forEach((data) => {
        const new_li_Element = document.createElement('li');
        new_li_Element.textContent = ` ${"⠿"} ${data.AccountCode} ${'--'} ${data.AccountName} `;
        new_li_Element.classList.add('list-group-item')
        destinationAccount_Element.appendChild(new_li_Element);
    });
}



dragula([DestinationAccountStructureData, mostLikelyAccount], {
    copy: true,
    accepts: function (element, target) {
    },
});
dragula([DestinationAccountStructureData, mostLikelyAccount])
    .on("drag", function (element) {
    })
    .on("drop", function (element) {
        setTimeout(function () {
        }, 0);
    });


var standardAccount_String_Data;
var standardAccount_Object;
var standardAccount_Data_Array = new Array;
$(function () {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = handleStateChange;
    xhr.open("GET", "Standard CofA.csv", false);
    xhr.send();
    function handleStateChange() {
        if (xhr.readyState == 4 &&
            xhr.status >= 200 &&
            xhr.status < 300) {
            showData(xhr.responseText);
            sourceAccountdatatable();
        }
    }
    function showData(data) {
        var rows = data.split("\n");
        const heading = rows[0].split(",");
        var rowNum;
        var cells;
        for (rowNum = 2; rowNum < rows.length; rowNum++) {
            cells = rows[rowNum].split(",");
            const masterAccount_obj = {};
            for (let cellNum = 0; cellNum < heading.length; cellNum++) {
                masterAccount_obj[heading[cellNum]] = cells[cellNum];
            }
            standardAccount_Data_Array.push(masterAccount_obj);
        }
        standardAccount_String_Data = JSON.stringify(standardAccount_Data_Array);
        // standardAccount_Object = JSON.parse(standardAccount_String_Data);
    }

});
function sourceAccountdatatable() {
    var standardAccount_Data_Object = JSON.parse(standardAccount_String_Data);
    console.log(standardAccount_Data_Object);
    const standardAccount_Element = document.getElementById('SourceAccountStructureData');
    standardAccount_Data_Object.forEach((data) => {
        const new_li_Element = document.createElement('li');
        new_li_Element.textContent = ` ${"⠿"} ${data.Number} ${'--'} ${data.Group} `;
        new_li_Element.classList.add('list-group-item-source')
        standardAccount_Element.appendChild(new_li_Element);
    });
}


