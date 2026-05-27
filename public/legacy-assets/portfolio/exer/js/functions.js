/* Funktionsaufruf (alert) mit Übergabe von Parametern
alert("Dies ist mein erstes Javascript mit Herrn Richardt");
alert("Das nächste Fenster wird nachdem bestätigen abgearbeitet");
alert("1. Zeile\n2. Zeile\n3. Zeile"); 
*/

/* Strings und Variablen
var meineVariable = "Hallo, ich lebe";
alert(meineVariable);
*/

/* wird überschrieben
meineVariable = 5;
alert(meineVariable);
*/

/* Kleine Rechnung
meineVariable = meineVariable + meineVariable + "5";
alert(meineVariable);
*/

/* Ausgabe und Interaktion mit dem Benutzer
var meineEingabe = prompt("Bitte gebe was ein");
alert(meineEingabe);
*/

/* mit Variablen
var name = prompt("Ihr Name?");
var adresse = prompt("Ihre Adresse?");
var plz = prompt("Ihre Postleitzahl?");
var ort = prompt("Ihr Ort?");
alert("Name: " + name + "\nAdresse: " + adresse + "\nPLZ: " + plz + "\nOrt: " + ort);
*/

/* ohne Variablen
prompt("Ihr Name?");
prompt("Ihre Adresse?");
prompt("Ihre PLZ?");
prompt("Ihr Ort?");
alert("Name: " + prompt("Ihr Name?") + "\nAdresse: " + prompt("Ihre Adresse?") + "\nPLZ: " + prompt("Ihre PLZ?") + "\nOrt: " + prompt("Ihr Ort?"));
*/

/* DOM Weiterleitung durch Location-Objekt
alert(window.location.href); // Pfad wird angezeigt
alert("Achtung, Weiterleitung!");
window.location.href = "http://www.google.de";
*/

// eigene Funktionen schreiben
function eigeneFunktion(){
	window.document.getElementById('headline').innerHTML = prompt('Gib eine neue Überschrift ein')
}
// Der Bildpfad wird geändert
function funktion1(){
	window.document.getElementById('meinBild').src = 'img/pic_bulbon.gif';
}
function funktion2(){
	window.document.getElementById('meinBild').src = 'img/pic_bulboff.gif';
}
// Alles was zwischen >...< ist, wird geändert!!
function funktion3(){
	window.document.getElementById('bild').innerHTML = "<img src='img/pic_bulbon.gif' style='width:50px' alt='AN'>";
}
function funktion4(){
	window.document.getElementById('bild').innerHTML = "<img src='img/pic_bulboff.gif' style='width:50px' alt='AUS'>";
}
// mit Parameter
function funktion5(bildName){
	window.document.getElementById('bild2').innerHTML = "<img src='img/pic_bulb" + bildName + ".gif' style='width:50px' alt='AUS'>";
}
// mit logischen Verknüpfungen 
function xyz(id,placeholder){
	if (document.getElementById(id).value != "") {
		document.getElementById(id).style.borderColor = "lightgrey";
}	else {
		document.getElementById(id).placeholder = placeholder;
		document.getElementById(id).style.borderColor = "red";
}
	if (document.getElementById('test1').value == "" || document.getElementById('test2').value == ""){
		document.getElementById('submit').disabled = true;
}	else {
		document.getElementById('submit').disabled = false;
}

}






















