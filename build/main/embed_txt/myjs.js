var theUrl = "http://"+window.location.hostname+"/aps/test.php";
function setVisible(number) {
    httpGetAsync(theUrl+"?id="+number,setValues)
    window.document.getElementById("mainList").className = "container hidden_block";
    document.getElementById('hidden_input').className = "container visible_block";
}

function setHide() {
    document.getElementById('ssid').value = '';
    document.getElementById("mainList").className = "container visible_block";
    document.getElementById('hidden_input').className ="container hidden_block"
}

function httpGetAsync(url,callback)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.responseType = "text";
    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.responseText);
    }
    xmlHttp.open("GET", url, true); // true for asynchronous
    xmlHttp.send(null);
}

var setContent = function(responseText) {
    var Res = JSON.parse(responseText);
    //window.alert(count);
    var keys = Object.keys(Res);
    var count = keys.length;
    var result = "";
    keys.forEach(key => {
        result += "<tr><td>";
        result += Res[key]['ssid'];
        result +="</td><td>";
        result += Res[key]['signal'];
        result += "</td><td>";
        result += Res[key]['security'];
        result += "</td>";
        result += "<td><button class=\"btn btn-sm btn-a\" onclick=\"setVisible("+ key +")\">connect</button></td></tr>";
    });
    document.getElementById("tbody").innerHTML = result;
}

var setValues = function (responseText) {
  var Res = JSON.parse(responseText);
  document.getElementById('ssid').value = Res['ssid'];
  document.getElementById('security').selectedIndex=Res['sec_id'];
}
 