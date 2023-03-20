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
            alltabledata += "<div class='destinationData' data-atr='" + data.AccountCode + "' >" + "&nbsp;⠿ " + data.AccountCode + '--' + data.AccountName + "</div>";
        }

    });
    $('#DestinationAccountStructureData').html(alltabledata);

};

function assetsdestinationdata() {
    let assettabledata = "";
    masterAccount_Object.forEach((data) => {
        if (data.AccountTypeName == "ASSETS" && data.AccountCode != "") {
            assettabledata += "<li class='destinationData' data-atr='" + data.AccountCode + "' >" + "&nbsp;⠿ " + data.AccountCode + '--' + data.AccountName + "</li>";
        }
    });
    $('#DestinationAccountStructureData').html(assettabledata);
};

function libilitydestinationdata() {
    let liabilitytabledata = "";
    masterAccount_Object.forEach((data) => {
        if (data.AccountTypeName == "LIABILITIES") {
            liabilitytabledata += "<li class='destinationData' data-atr='" + data.AccountCode + "' >" + "&nbsp;⠿ " + data.AccountCode + '--' + data.AccountName + "</li>";
        }
    });
    $('#DestinationAccountStructureData').html(liabilitytabledata);
};

function equitydestinationdata() {
    let equitytabledata = "";
    masterAccount_Object.forEach((data) => {
        if (data.AccountTypeName == "EQUITY/CAPITAL") {
            equitytabledata += "<li class='destinationData' data-atr='" + data.AccountCode + "' >" + "&nbsp;⠿ " + data.AccountCode + '--' + data.AccountName + "</li>";
        }
    });
    $('#DestinationAccountStructureData').html(equitytabledata);
};

function revenuedestinationdata() {
    let revenuetabledata = "";
    masterAccount_Object.forEach((data) => {
        if (data.AccountTypeName == "Professional Services Revenue" || data.AccountTypeName == "Product Revenue") {
            revenuetabledata += "<li class='destinationData' data-atr='" + data.AccountCode + "' >" + "&nbsp;⠿ " + data.AccountCode + '--' + data.AccountName + "</li>";
        }
    });
    $('#DestinationAccountStructureData').html(revenuetabledata);
};

function cogsdestinationdata() {
    let cogstabledata = "";
    masterAccount_Object.forEach((data) => {
        if (data.AccountTypeName == "Professional Services Costs" || data.AccountTypeName == "Product Costs") {
            cogstabledata += "<li class='destinationData' data-atr='" + data.AccountCode + "' >" + "&nbsp;⠿ " + data.AccountCode + '--' + data.AccountName + "</li>";
        }
    });
    $('#DestinationAccountStructureData').html(cogstabledata);
};

function gaexpensesdestinationdata() {
    let garevenuetabledata = "";
    masterAccount_Object.forEach((data) => {
        if (data.AccountTypeName == "Labor Expense") {
            garevenuetabledata += "<li class='destinationData' data-atr='" + data.AccountCode + "' >" + "&nbsp;⠿ " + data.AccountCode + '--' + data.AccountName + "</li>";
        }
    });
    $('#DestinationAccountStructureData').html(garevenuetabledata);
};

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

$("#cogsdata").click(function () {
    cogsdestinationdata();
});

$("#gaexpensesdata").click(function () {
    gaexpensesdestinationdata();
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
        if (standardAccount_Object[index].Type == "Liabilities" || standardAccount_Object[index].Type == "Liabilities ") {
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
        if (standardAccount_Object[index].Type == "Equity") {
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
        if (standardAccount_Object[index].Type == "Revenue" || standardAccount_Object[index].Type == "Revenue") {
            $(`#${id}`).show();
            $(`#mostlikely_${id}`).show();
            $(`#likely_${id}`).show();
            $(`#possible_${id}`).show();
        }
    });
    document.getElementById("revenuedata").click(revenuedestinationdata());
});

$("#cogsbtn").click(function () {
    $(".sourceAccountDataList").each(function (index) {
        var id = this.id;
        $(`#${id}`).hide();
        $(`#mostlikely_${id}`).hide();
        $(`#likely_${id}`).hide();
        $(`#possible_${id}`).hide();
        if (standardAccount_Object[index].Type == "COGS") {
            $(`#${id}`).show();
            $(`#mostlikely_${id}`).show();
            $(`#likely_${id}`).show();
            $(`#possible_${id}`).show();
        }
    });
    document.getElementById("cogsdata").click(cogsdestinationdata());
});

$("#gaexpenses").click(function () {
    $(".sourceAccountDataList").each(function (index) {
        var id = this.id;
        $(`#${id}`).hide();
        $(`#mostlikely_${id}`).hide();
        $(`#likely_${id}`).hide();
        $(`#possible_${id}`).hide();
        if (standardAccount_Object[index].Type == "Expense") {
            $(`#${id}`).show();
            $(`#mostlikely_${id}`).show();
            $(`#likely_${id}`).show();
            $(`#possible_${id}`).show();
        }
    });
    document.getElementById("gaexpensesdata").click(gaexpensesdestinationdata());
});

var todaydate = new Date();
var dd = String(todaydate.getDate()).padStart(2, '0');
var mm = String(todaydate.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = todaydate.getFullYear();
todaydate = mm + '/' + dd + '/' + yyyy;
var date = new Date();
var time = date.toLocaleString([], { hour: '2-digit', minute: '2-digit' });
$("#submitbtn").click(function () {
    const tabledata = new Array;
    standardAccount_Object.forEach(function (li) {
        let data = li.Number;
        const obj = {
            sourcedata: data,
            Mostlikely: $("#mostlikely_" + data).html(),
            Likely: $("#likely_" + data).html(),
            Possible: $("#possible_" + data).html(),
        }
        tabledata.push(obj);
    })
    localStorage.setItem("Data", JSON.stringify(tabledata));


    // var time = new Date();
    // time.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
    $("#lastupdatedtime").html("Last Updated On  " + todaydate + " at " + time);
});

$(function () {
    var getlocalstoragedata = JSON.parse(localStorage.getItem("Data"));
    standardAccount_Object.forEach(function (li, index) {
        let getdata = li.Number;
        $("#mostlikely_" + getdata).html(getlocalstoragedata[index].Mostlikely)
        $("#likely_" + getdata).html(getlocalstoragedata[index].Likely)
        $("#possible_" + getdata).html(getlocalstoragedata[index].Possible)
    });
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
            onAdd: function (evt) {
                var destination = evt.item.parentNode.getAttribute('id').substring(evt.item.parentNode.getAttribute('id').indexOf('_'));
                var possibleID = document.getElementById('possible' + destination);
                var likelyID = document.getElementById('likely' + destination);

                if (evt.item.parentNode.children.length == 2) {
                    var ml0 = evt.item.parentNode.children[0].getAttribute("data-atr");
                    var ml1 = evt.item.parentNode.children[1].getAttribute("data-atr");
                    console.log(ml0, ml1);
                    if (ml0 == ml1) {
                        alert("same data found");
                        evt.item.parentNode.children[1].remove();
                    }
                }

                if (evt.item.parentNode.children.length > 1) {

                    var secondItem = evt.item.parentNode.children[1];
                    if (likelyID.children.length == 0) {
                        likelyID.appendChild(secondItem);
                    }
                    else if (likelyID.children.length == 1) {
                        likelyID.appendChild(secondItem)

                        if (possibleID.children.length == 0) {
                            var secondlikelychild = likelyID.children[0]
                            possibleID.appendChild(secondlikelychild)
                        }
                        else if (possibleID.children.length == 1) {
                            possibleID.children[0].remove();
                            var secondlikelychild = likelyID.children[0];
                            possibleID.appendChild(secondlikelychild)
                        }
                    }
                }

            }

        });
    });

    $(".LikelyAccountDatalist").each(function () {
        new Sortable(this, {
            group: "DestinationDataShare",
            animation: 150,
            onAdd: function (evt) {
                var destination = evt.item.parentNode.getAttribute('id').substring(evt.item.parentNode.getAttribute('id').indexOf('_'));
                var possiblesdata = document.getElementById('possible' + destination);
                if (evt.item.parentNode.children.length == 2) {
                    var firstdata = evt.item.parentNode.children[1];
                    possiblesdata.appendChild(firstdata);
                }
                if (possiblesdata.children.length == 2) {
                    possiblesdata.children[0].remove();
                }
            }
        });
    });

    $(".possibleAccountDatalist").each(function () {
        new Sortable(this, {
            group: "DestinationDataShare",
            animation: 150,
            onAdd: function (evt) {
                if (evt.item.parentNode.children.length == 2) {
                    evt.item.parentNode.children[1].remove();
                }
            }
        });
    });

});

$(function () {
    document.getElementById("assetsbtn").click();
    $("#lastupdatedtime").html("Last Updated On  " + todaydate + " at " + time);
});



