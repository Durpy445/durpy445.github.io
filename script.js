Main = document.getElementById("Main")
Flashing = document.getElementById("Flashing")

Pictures = ["Images/ReiPlush.jpg",
"Images/Teto_Kasane_illustration.png",
"Images/800px-Hatsune_Miku_V2.webp",
"Images/miku.jpg",
"Images/Miku1.webp",
"Images/KanameMadoka.png",
"Images/61ABFOWC-QL.jpg",
"Images/happy-birthday-baguette-loving-drill-hair-girl-kasane-teto-v0-qttv00dch6ra1.webp",
"Images/Kasane_Pearto_Original.webp",
"Images/Synthesizer_V_AI_KASANE_TETO_Illust.webp",
"Images/Tasateko.webp",
"Images/Teto.webp",
"Images/Teto_Kasane_illustration.png",
"Images/hqdefault.jpg",
"Images/1767ad00940e5e54ff41cd1fd22d483339f015b1.jpg",]

function shuffle(array) {
    let currentIndex = array.length;
  
    // While there remain elements to shuffle...
    while (currentIndex != 0) {
  
      // Pick a remaining element...
      let randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  }

  shuffle(Pictures)

Cycle = 0

ChangeImage = function(){
    Main.style.backgroundImage = "url("+ Pictures[Cycle % Pictures.length] +")"
    Cycle += 1
}

Flash = function(){
    Flashing.src =  Pictures[Cycle % Pictures.length] 
    Cycle += 1
}


setInterval(ChangeImage,500)
setInterval(Flash,90)