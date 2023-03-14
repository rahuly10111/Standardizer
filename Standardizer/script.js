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
            assetssourceaccountdata += "<li class='list-group-item-source'>" + " &nbsp;" + data.Number + " &nbsp; " + data.Name + "<i class='bi bi-check2-all'></i> <i class='bi bi-clock-history'></i>" + "</li>";
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
    $(".btnhide").click(function () {
        $(".btnhide").removeClass("btnshow");
        $(this).addClass("btnshow");
    });
});

$(function () {
    $("a").click(function () {
        $(".unactive").removeClass("active");
        $(this).addClass("active");
    });
});

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

function search() {
    let input = document.getElementById('searchbar').value
    input = input.toLowerCase();
    let x = document.getElementsByClassName('list-group-item');
    for (i = 0; i < x.length; i++) {
        if (!x[i].innerHTML.toLowerCase().includes(input)) {
            x[i].style.display = "none";
        }
        else {
            x[i].style.display = "";
        }
    }
};

function alldestinationdata() {
    let alltabledata = "";
    masterAccount_Object.forEach((data) => {
        if (data.AccountCode != "") {
            alltabledata += "<div class='list-group-item'>" + "&nbsp;⠿ " + data.AccountCode + '--' + data.AccountName + "</div>";
        }

    });
    $('#DestinationAccountStructureData').html(alltabledata);
}

function assetsdestinationdata() {
    let assettabledata = "";
    masterAccount_Object.forEach((data) => {
        if (data.AccountTypeName == "ASSETS" && data.AccountCode != "") {
            assettabledata += "<li class='list-group-item'>" + "&nbsp;⠿ " + data.AccountCode + '--' + data.AccountName + "</li>";
        }
    });
    $('#DestinationAccountStructureData').html(assettabledata);
};

function libilitydestinationdata() {
    let liabilitytabledata = "";
    masterAccount_Object.forEach((data) => {
        if (data.AccountTypeName == "LIABILITIES") {
            liabilitytabledata += "<li class='list-group-item'>" + "&nbsp;⠿ " + data.AccountCode + '--' + data.AccountName + "</li>";
        }
    });
    $('#DestinationAccountStructureData').html(liabilitytabledata);
};

function equitydestinationdata() {
    let equitytabledata = "";
    masterAccount_Object.forEach((data) => {
        if (data.AccountTypeName == "EQUITY/CAPITAL") {
            equitytabledata += "<li class='list-group-item'>" + "&nbsp;⠿ " + data.AccountCode + '--' + data.AccountName + "</li>";
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
    let assetsmostlikelydata = "";
    let assetslikelydata = "";
    let assetspossibledata = "";
    standardAccount_Object.forEach((data) => {
        if (data.Type == "Assets" && data.Number != "") {
            assetssourceaccountdata += "<div class='list-group-item-source'>" + " &nbsp;" + data.Number + " &nbsp; " + data.Name + "<i class='bi bi-check2-all'></i> <i class='bi bi-clock-history'></i>" + "</div>";

            assetsmostlikelydata += "<li class='list-group-item-likely' id='mostlikely_" + data.Number + "'>" + "</li>";
            assetslikelydata += "<li class='list-group-item-likely'  id='likely_" + data.Number + "' >" + "</li>";
            assetspossibledata += "<li class='list-group-item-likely'  id='possible_" + data.Number + "' >" + "</li>";
        }
    });
    $('#SourceAccountStructureData').html(assetssourceaccountdata);
    $('#mostLikelyAccount').html(assetsmostlikelydata);
    $('#LikelyAccount').html(assetslikelydata);
    $('#possibleAccount').html(assetspossibledata);
    assetsdestinationdata();
    console.log(standardAccount_Object);
});

$("#liabilitybtn").click(function () {
    let liabilitysourceaccountdata = "";
    let liabilitymostlikelydata = "";
    let liabilitylikelydata = "";
    let liabilitypossibledata = "";
    standardAccount_Object.forEach((data) => {
        if (data.Type == "Liabilities" && data.Number != "") {
            liabilitysourceaccountdata += "<li class='list-group-item-source'>" + " &nbsp;" + data.Number + " &nbsp;" + data.Name + "<i class='bi bi-check2-all'></i> <i class='bi bi-clock-history'></i>" + "</li>";

            liabilitymostlikelydata += "<li class='list-group-item-likely' id='mostlikely_" + data.Number + "'>" + "</li>";
            liabilitylikelydata += "<li class='list-group-item-likely'  id='likely_" + data.Number + "' >" + "</li>";
            liabilitypossibledata += "<li class='list-group-item-likely'  id='possible_" + data.Number + "' >" + "</li>";
        }
    });
    $('#SourceAccountStructureData').html(liabilitysourceaccountdata);
    $('#mostLikelyAccount').html(liabilitymostlikelydata);
    $('#LikelyAccount').html(liabilitylikelydata);
    $('#possibleAccount').html(liabilitypossibledata);
    libilitydestinationdata();
})

$("#equitydatabtn").click(function () {
    let equitysourceaccountdata = "";
    let equitymostlikelydata = "";
    let equitylikelydata = "";
    let equitypossibledata = "";
    standardAccount_Object.forEach((data) => {
        if (data.Type == "Equity" && data.Number != "") {
            equitysourceaccountdata += "<li class='list-group-item-source'>" + " &nbsp;" + data.Number + " &nbsp;" + data.Name + "<i class='bi bi-check2-all'></i> <i class='bi bi-clock-history'></i>" + "</li>";

            equitymostlikelydata += "<li class='list-group-item-likely' id='mostlikely_" + data.Number + "'>" + "</li>";
            equitylikelydata += "<li class='list-group-item-likely'  id='likely_" + data.Number + "' >" + "</li>";
            equitypossibledata += "<li class='list-group-item-likely'  id='possible_" + data.Number + "' >" + "</li>";
        }
    });
    $('#SourceAccountStructureData').html(equitysourceaccountdata);
    $('#mostLikelyAccount').html(equitymostlikelydata);
    $('#LikelyAccount').html(equitylikelydata);
    $('#possibleAccount').html(equitypossibledata);
    equitydestinationdata();
})

