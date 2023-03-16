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
            // document.getElementById("assetsbtn").click();
            // sourceAccountdatatable();
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

var allsourceaccountdata = "";
var allmostlikelydata = "";
var alllikelydata = "";
var allpossibledata = "";
$(function sourceAccountdatatable() {
    console.log(standardAccount_Object);
    standardAccount_Object.forEach((data) => {
        if (data.Number != "") {
            allsourceaccountdata += "<li class='sourceAccountDataList' id='" + data.Number + "'>" + " &nbsp;" + data.Number + " &nbsp; " + data.Name + "<i class='bi bi-check2-all'></i> <i class='bi bi-clock-history'></i>" + "</li>";

            allmostlikelydata += "<li class='mostLikelyAccountDatalist' id='mostlikely_" + data.Number + "'>" + "</li>";
            alllikelydata += "<li class='LikelyAccountDatalist'  id='likely_" + data.Number + "' >" + "</li>";
            allpossibledata += "<li class='possibleAccountDatalist'  id='possible_" + data.Number + "' >" + "</li>";
        }
    });
    $('#SourceAccountStructureData').html(allsourceaccountdata);
    $('#mostLikelyAccount').html(allmostlikelydata);
    $('#LikelyAccount').html(alllikelydata);
    $('#possibleAccount').html(allpossibledata);
});

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
    let x = document.getElementsByClassName('destinationData');
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
            alltabledata += "<div class='destinationData' >" + "&nbsp;⠿ " + data.AccountCode + '--' + data.AccountName + "</div>";
        }

    });
    $('#DestinationAccountStructureData').html(alltabledata);
};

function assetsdestinationdata() {
    let assettabledata = "";
    masterAccount_Object.forEach((data) => {
        if (data.AccountTypeName == "ASSETS" && data.AccountCode != "") {
            assettabledata += "<li class='destinationData' >" + "&nbsp;⠿ " + data.AccountCode + '--' + data.AccountName + "</li>";
        }
    });
    $('#DestinationAccountStructureData').html(assettabledata);
};

function libilitydestinationdata() {
    let liabilitytabledata = "";
    masterAccount_Object.forEach((data) => {
        if (data.AccountTypeName == "LIABILITIES") {
            liabilitytabledata += "<li class='destinationData'>" + "&nbsp;⠿ " + data.AccountCode + '--' + data.AccountName + "</li>";
        }
    });
    $('#DestinationAccountStructureData').html(liabilitytabledata);
};

function equitydestinationdata() {
    let equitytabledata = "";
    masterAccount_Object.forEach((data) => {
        if (data.AccountTypeName == "EQUITY/CAPITAL") {
            equitytabledata += "<li class='destinationData'>" + "&nbsp;⠿ " + data.AccountCode + '--' + data.AccountName + "</li>";
        }
    });
    $('#DestinationAccountStructureData').html(equitytabledata);
};

function revenuedestinationdata() {
    let equitytabledata = "";
    masterAccount_Object.forEach((data) => {
        if (data.AccountTypeName == "Professional Services Revenue" || data.AccountTypeName == "Product Revenue") {
            equitytabledata += "<li class='destinationData'>" + "&nbsp;⠿ " + data.AccountCode + '--' + data.AccountName + "</li>";
        }
    });
    $('#DestinationAccountStructureData').html(equitytabledata);
};

// function cogsdestinationdata() {
//     let equitytabledata = "";
//     masterAccount_Object.forEach((data) => {
//         if (data.AccountTypeName == "EQUITY/CAPITAL") {
//             equitytabledata += "<li class='destinationData'>" + "&nbsp;⠿ " + data.AccountCode + '--' + data.AccountName + "</li>";
//         }
//     });
//     $('#DestinationAccountStructureData').html(equitytabledata);
// };


$("#alldata").click(function () {
    alldestinationdata();
    console.log("master", masterAccount_Object);
});

$("#assetsdata").click(function () {
    assetsdestinationdata();
});

$("#libilitydata").click(function () {
    libilitydestinationdata();
});

$("#equitydata").click(function () {
    equitydestinationdata();
});

$("#revenuedata").click(function () {
    revenuedestinationdata();
});

$("#assetsbtn").click(function () {
    $(".sourceAccountDataList").each(function (index) {
        var id = this.id;
        $(`#${id}`).hide();
        $(`#mostlikely_${id}`).hide();
        $(`#likely_${id}`).hide();
        $(`#possible_${id}`).hide();
        if (standardAccount_Object[index].Type == "Assets" && standardAccount_Object[index].Number != "") {
            $(`#${id}`).show();
            $(`#mostlikely_${id}`).show();
            $(`#likely_${id}`).show();
            $(`#possible_${id}`).show();
        }
    });
    document.getElementById("assetsdata").click(assetsdestinationdata());
    console.log("standar", standardAccount_Object);
});

$("#liabilitybtn").click(function () {
    $(".sourceAccountDataList").each(function (index) {
        var id = this.id;
        $(`#${id}`).hide();
        $(`#mostlikely_${id}`).hide();
        $(`#likely_${id}`).hide();
        $(`#possible_${id}`).hide();
        console.log(standardAccount_Object[index].Type);
        if (standardAccount_Object[index].Type == "Liabilities" || standardAccount_Object[index].Type == "Liabilities " ) {
            $(`#${id}`).show();
            $(`#mostlikely_${id}`).show();
            $(`#likely_${id}`).show();
            $(`#possible_${id}`).show();
        }
    });
    document.getElementById("libilitydata").click(libilitydestinationdata());
});

$("#equitybtn").click(function () {
    $(".sourceAccountDataList").each(function (index) {
        var id = this.id;
        $(`#${id}`).hide();
        $(`#mostlikely_${id}`).hide();
        $(`#likely_${id}`).hide();
        $(`#possible_${id}`).hide();
        if (standardAccount_Object[index].Type == "Equity" ) {
            $(`#${id}`).show();
            $(`#mostlikely_${id}`).show();
            $(`#likely_${id}`).show();
            $(`#possible_${id}`).show();
        }
    });
    document.getElementById("equitydata").click(equitydestinationdata());
});

$("#revenuebtn").click(function () {
    $(".sourceAccountDataList").each(function (index) {
        var id = this.id;
        $(`#${id}`).hide();
        $(`#mostlikely_${id}`).hide();
        $(`#likely_${id}`).hide();
        $(`#possible_${id}`).hide();
        if (standardAccount_Object[index].Type == "Revenue" || standardAccount_Object[index].Type == "Revenue" ) {
            $(`#${id}`).show();
            $(`#mostlikely_${id}`).show();
            $(`#likely_${id}`).show();
            $(`#possible_${id}`).show();
        }
    });
    document.getElementById("revenuedata").click(revenuedestinationdata());
});

$("#submitbtn").click(function () {

});

$(function () {
    new Sortable(DestinationAccountStructureData, {
        group: {
            name: "DestinationDataShare",
            pull: 'clone',
            put: false,
        },
        animation: 150,
        sort: false,

        onEnd: function (evt) {
            var item = evt.item;
            if (evt.to !== DestinationAccountStructureData) {
                item.classList = "dropdata";
            }
        },
    });
    $(".mostLikelyAccountDatalist").each(function () {
        new Sortable(this, {
            group: "DestinationDataShare",
            animation: 150,
        });
    });
    $(".LikelyAccountDatalist").each(function () {
        new Sortable(this, {
            group: "DestinationDataShare",
            animation: 150,
        });
    });
    $(".possibleAccountDatalist").each(function () {
        new Sortable(this, {
            group: "DestinationDataShare",
            animation: 150,
        });
    });

});

