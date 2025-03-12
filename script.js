Main = document.getElementById("Main")

Pictures = ["Images/ReiPlush.jpg",
"Images/Teto_Kasane_illustration.png",
"Images/800px-Hatsune_Miku_V2.webp",
"Images/miku.jpg",
"Images/Miku1.webp",
"Images/KanameMadoka.png"]
Cycle = 0

ChangeImage = function(){
    Main.style.backgroundImage = "url("+ Pictures[Cycle % Pictures.length] +")"
    Cycle += 1
}

setInterval(ChangeImage,500)