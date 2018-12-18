var joueur;

function onLoad() {
    req = new XMLHttpRequest();
    req.onreadystatechange = function () {
        if (req.readyState === 4 && req.status === 200) {
            load();
        }
    };
    req.open("GET", "http://localhost:8080/create");
    req.send(null);
}


function create() {
    var req = new XMLHttpRequest();
    req.onreadystatechange = function () {
        if (req.readyState === 4 && req.status === 200) {
            save();
        }
    };

    req.open("GET", "http://localhost:8080/create?" +
        "name=" + document.getElementById('name').value +
        "&hp=" + document.getElementById('hp').value +
        "&strength=" + document.getElementById('strength').value +
        "&agility=" + document.getElementById('agility').value +
        "&intelligence=" + document.getElementById('intelligence').value, true);
    req.send(null);
}


function save() {
    var req = new XMLHttpRequest();
    req.onreadystatechange = function () {
        if (req.readyState === 4 && req.status === 200) {
            console.log('Save !\u{2197}\u{2714}');
            load();
        }
    };

    req.open("GET", "http://localhost:8080/save?" +
        "name=" + joueur.name +
        "&hp=" + joueur.hp +
        "&strength=" + joueur.strength +
        "&agility=" + joueur.agility +
        "&intelligence=" + joueur.intelligence +
        "&inventaire=" + joueur.inventaire +
        "&posX=" + joueur.posX +
        "&posY=" + joueur.posY +
        "&direction=" + joueur.direction, true);
    req.send(null);
}

function load() {
    var req = new XMLHttpRequest();
    req.onreadystatechange = function () {
        if (req.readyState === 4 && req.status === 200) {
            joueur = JSON.parse(req.responseText).joueur;
            console.log('Load !\u{2198}\u{2714}');
            if (joueur.hp < 0) document.getElementById('body').innerHTML += "<style>#direction button, #load button{cursor: not-allowed;pointer-events: none;opacity: 0.5;}</style>";
            actualiseALL();
        }
    };
    req.open("GET", "http://localhost:8080/load");
    req.send(null);
}


function moveTo(btn) {
    var req = new XMLHttpRequest();
    req.onreadystatechange = function () {
        if (req.readyState === 4 && req.status === 200) {
            save();
            var requestSplit = req.responseText.split("$");
            document.getElementById('history').innerHTML += requestSplit[0];
            console.log(requestSplit[1]);
            if (requestSplit[1] == "mort") {
                finDePartie();
            }
        }
    };
    req.open("GET", "http://localhost:8080/moveTo?direction=" + btn.value);
    req.send(null);
}




function actualiseALL() {
    actualisePlayer();
    actualiseDirection();
    actualiseInventory();
    var el = document.getElementById('history');
    el.scrollTop = el.scrollHeight;
}

function actualisePlayer() {
    document.getElementById("tableValuePlayer").innerHTML =
        "<tr>" +
        "<th>Name</th>" +
        "<th>HP</th>" +
        "<th>Strength</th>" +
        "<th>Agility</th>" +
        "<th>Intelligence</th>" +
        "<th>Position X</th>" +
        "<th>Position Y</th>" +
        "</tr>" +
        "<tr>" +
        "<td>" + (joueur.name) + "</td>" +
        "<td>" + (joueur.hp) + "</td>" +
        "<td>" + (joueur.strength) + "</td>" +
        "<td>" + (joueur.agility) + "</td>" +
        "<td>" + (joueur.intelligence) + "</td>" +
        "<td>" + (joueur.posX) + "</td>" +
        "<td>" + (joueur.posY) + "</td>" +
        "</tr>";
}

function actualiseDirection() {
    document.getElementById("directionChoosed").innerHTML =
        "<br>" +
        "Player has moved to " + joueur.direction;
}

function actualiseInventory() {
    document.getElementById("tableValueInventory").innerHTML =
        "<tr>" +
        "<th></th>" +
        "<th>Strength</th>" +
        "</tr>" +
        "<tr>" +
        "<td>Weapon</td>" +
        "<td>" + (joueur.inventaire[0].strength) + "</td>" +
        "</tr>" +
        "<tr>" +
        "<td>Armor</td>" +
        "<td>" + (joueur.inventaire[1].strength) + "</td>" +
        "</tr>";
}


function finDePartie() {
    document.getElementById('body').innerHTML = "<div id='test' style='font-size : 16em;'><b>taperdu</b></div><button onclick ='location.href = \"../html_css/test.html\"'>Retry</button>";


}