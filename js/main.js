var haslo = "Bez pracy nie ma kołaczy";
haslo = haslo.toUpperCase();
var dlugosc = haslo.length;
var ile_skuch = 0;
var yes = new Audio("yes.wav");
var no = new Audio("no.wav");
var haslo1 = "";

//zamiana hasła na ukryte zdanie pod symbolami "-"
for(var i=0;i<dlugosc;i++){
	if (haslo.charAt(i)==" ") {
		haslo1 = haslo1 + " ";
	}
	else{
		haslo1 = haslo1 + "-";
	}
}
//ukryte hasło
function wypisz_haslo(){
	document.getElementById('plansza').innerHTML = haslo1;
}
//uruchomienie rysowania guzików
window.onload = start;
//tablica z literami
var litery = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','Ą','Ć','Ę','Ł','Ń','Ó','Ś','Ź','Ż'];
var dlugoscTablicy = litery.length;
//funkcja rysująca guziki z literami
function start(){
  var tresc_diva = "";
  for (var i=0;i<dlugoscTablicy;i++){
    var element = "lit" +i;
    tresc_diva = tresc_diva + '<div class="litera" onclick="sprawdz('+i+')" id="'+element+'">'+ litery[i] +'</div>';
    if ((i+1)%7 == 0) tresc_diva = tresc_diva + '<div style="clear:both;"></div>';
  }
	document.getElementById('alfabet').innerHTML = tresc_diva;

	wypisz_haslo();
}
//zmiana znaku "-" na litere jeśli trafilismy
String.prototype.ustawZnak = function(miejsce,znak){
  if (miejsce> this.length -1) {
    return this.toString();
  }
  else {
    //wytnik wszytsko do miejsca, dodaj znak i dodaj wszytko po miejscu
    return this.substr(0,miejsce)+ znak +this.substr(miejsce+1);
  }
}
//sprawdzenie czy litera wystepuje w haśle
function sprawdz(nr){
  var trafiona = false;
  for (var i=0;i<dlugosc;i++){
    if (haslo.charAt(i)==litery[nr]){
      haslo1 = haslo1.ustawZnak(i,litery[nr]);
      trafiona = true;
    }
  }
  //jesli trafimy dzwiek i zmiana wygladu
  if (trafiona==true){
    yes.play();
    var element = "lit" + nr;
    document.getElementById(element).style.background = "#003300";
    document.getElementById(element).style.color = "#00C000";
    document.getElementById(element).style.border = "3px solid #00C000";
    document.getElementById(element).style.cursor = "default";
    wypisz_haslo();
    
  }
  else{
    no.play();
     var element = "lit" + nr;
    document.getElementById(element).style.background = "#330000";
    document.getElementById(element).style.color = "#c00000";
    document.getElementById(element).style.border = "3px solid #c00000";
    document.getElementById(element).style.cursor = "default";
    document.getElementById(element).setAttribute("onclick",";");
    //skucha
    ile_skuch++;
    var obraz = "image/s" + ile_skuch + ".jpg";
    document.getElementById('szubienica').innerHTML = '<image src="'+obraz+'" alt="" />';
  }
  //wygrana
  
  if (haslo==haslo1){
    document.getElementById('alfabet').innerHTML = "Tak jest podano prawidłowe hasło: " + haslo + '<br/><br/> <span class="reset" onclick="location.reload()"> Jeszcze raz? </span>';
  }
  
  //przegrana
  
  if (ile_skuch>=9){
    document.getElementById('alfabet').innerHTML = "Przegrana! Prawidłowe hasło: " + haslo + '<br/><br/> <span class="reset" onclick="location.reload()"> Jeszcze raz? </span>';
  }
}




















