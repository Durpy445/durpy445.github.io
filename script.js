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
"Images/1767ad00940e5e54ff41cd1fd22d483339f015b1.jpg",
"Images/716gByubJlL._AC_SL1500_.jpg",
"Images/images.jpg",
"Images/tumblr_inline_n6wjth2uIz1sf3h99.png",
"Images/Untitled.jpg",
"Images/which-chiquita-wins-the-cute-war-of-2024-v0-8rb7hkl381bc1.webp",
"Images/1qtej0s1ojo71.webp",
"Images/Whersyourheadatjpg.jpg",
]


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
Cycle1 = 0

ChangeImage = function(){
    Main.style.backgroundImage = "url("+ Pictures[Cycle % Pictures.length] +")"
    Cycle += 1
}

Flash = function(){
    Flashing.src =  Pictures[Cycle1 % Pictures.length] 
    Cycle1 += 1
}


setInterval(ChangeImage,500)
setInterval(Flash,90)