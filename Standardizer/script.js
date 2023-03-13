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
            alldestinationdata();
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
        masterAccount_Object = JSON.parse(masterAccount_String_Data);
    }
});


// dragula([DestinationAccountStructureData, mostLikelyAccount], {
//     copy: true,
//     accepts: function (element, target) {
//     },
// });
// dragula([DestinationAccountStructureData, mostLikelyAccount])
//     .on("drag", function (element) {
//     })
//     .on("drop", function (element) {
//         setTimeout(function () {
//         }, 0);
//     });


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
        standardAccount_Object = JSON.parse(standardAccount_String_Data);
    }
});

function sourceAccountdatatable() {
    let assetssourceaccountdata = "";
    standardAccount_Object.forEach((data) => {
        if (data.Type == "Assets") {
            assetssourceaccountdata += "<li class='list-group-item-source'>" + " &nbsp;" + data.Number + " &nbsp; " + data.Group + "</li>";
        }
    });
    $('#SourceAccountStructureData').html(assetssourceaccountdata);
    // const standardAccount_Element = document.getElementById('SourceAccountStructureData');
    // standardAccount_Object.forEach((data) => {
    //     const new_li_Element = document.createElement('li');
    //     if (data.Type == "Assets") {
    //         new_li_Element.textContent = ` ${'  '} ${data.Number} ${' '} ${data.Group} `;
    //         new_li_Element.classList.add('list-group-item-source')
    //     };
    //     standardAccount_Element.appendChild(new_li_Element);
    // });
}

$(function () {
    const scrollbar = document.getElementById("scrollbar");
    const scrollLeft = document.getElementById("scrollleft");
    const scrollright = document.getElementById("scrollright");
    scrollLeft.addEventListener("click", scrollUp);
    scrollright.addEventListener("click", scrollDown);
    function scrollUp() {
        scrollbar.scrollLeft += 80;
    }
    function scrollDown() {
        scrollbar.scrollLeft -= 80;
    }
});

function alldestinationdata() {
    let alltabledata = "";
    masterAccount_Object.forEach((data) => {
        alltabledata += "<li class='list-item'>" + "&nbsp;⠿ " + data.AccountCode + '--' + data.AccountName + "</li>";
    });
    $('#DestinationAccountStructureData').html(alltabledata);
}

function assetsdestinationdata() {
    let assettabledata = "";
    masterAccount_Object.forEach((data) => {
        if (data.AccountTypeName == "ASSETS") {
            assettabledata += "<li class='list-item'>" + "&nbsp;⠿ " + data.AccountCode + '--' + data.AccountName + "</li>";
        }
    });
    $('#DestinationAccountStructureData').html(assettabledata);
};

function libilitydestinationdata() {
    let liabilitytabledata = "";
    masterAccount_Object.forEach((data) => {
        if (data.AccountTypeName == "LIABILITIES") {
            liabilitytabledata += "<li class='list-item'>" + "&nbsp;⠿ " + data.AccountCode + '--' + data.AccountName + "</li>";
        }
    });
    $('#DestinationAccountStructureData').html(liabilitytabledata);
};

function equitydestinationdata() {
    let equitytabledata = "";
    masterAccount_Object.forEach((data) => {
        if (data.AccountTypeName == "EQUITY/CAPITAL") {
            equitytabledata += "<li class='list-item'>" + "&nbsp;⠿ " + data.AccountCode + '--' + data.AccountName + "</li>";
        }
    });
    $('#DestinationAccountStructureData').html(equitytabledata);
};

$("#alldata").click(function () {
    alldestinationdata();
    console.log(masterAccount_Object);
});

$("#assetsdata").click(function () {
    assetsdestinationdata();
});

$("#libilitydata").click(function () {
    libilitydestinationdata();
});

$("#equitydata").click(function () {
    equitydestinationdata();
})

$("#assetsbtn").click(function () {
    let assetssourceaccountdata = "";
    standardAccount_Object.forEach((data) => {
        if (data.Type == "Assets") {
            assetssourceaccountdata += "<li class='list-group-item-source'>" + " &nbsp;" + data.Number + " &nbsp; " + data.Group + "</li>";
        }
    });
    $('#SourceAccountStructureData').html(assetssourceaccountdata);
    assetsdestinationdata();
    console.log(standardAccount_Object);
});

$("#liabilitybtn").click(function () {
    let liabilitysourceaccountdata = "";
    standardAccount_Object.forEach((data) => {
        if (data.Type == "Liabilities") {
            liabilitysourceaccountdata += "<li class='list-group-item-source'>" + " &nbsp;" + data.Number + " &nbsp;" + data.Group + "</li>";
        }
    });
    $('#SourceAccountStructureData').html(liabilitysourceaccountdata);
    libilitydestinationdata();
})

$("#equitydata").click(function () {
    let equitysourceaccountdata = "";
    standardAccount_Object.forEach((data) => {
        if (data.Type == "Equity") {
            equitysourceaccountdata += "<li class='list-group-item-source'>" + " &nbsp;" + data.Number + " &nbsp;" + data.Group + "</li>";
        }
    });
    $('#SourceAccountStructureData').html(equitysourceaccountdata);
    equitydestinationdata();
})

