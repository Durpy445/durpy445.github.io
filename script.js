button = document.getElementById("Button1")
backround = document.getElementById("HTMLBACKROUND")
flashing = document.getElementById("Flashing")
flashing2 = document.getElementById("Flashing2")

url = ["https://a.espncdn.com/combiner/i?img=/i/headshots/nba/players/full/1966.png&w=350&h=254","https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/LeBron_James_%2851959977144%29_%28cropped2%29.jpg/800px-LeBron_James_%2851959977144%29_%28cropped2%29.jpg","https://cdn.sanity.io/images/bl383u0v/production/b8bf3938336ab457e1045e90fe737ce0c59f1cde-1500x1000.jpg","https://media.tenor.com/wAUwI9jSbX8AAAAe/glorp-aliencat.png","https://m.media-amazon.com/images/I/71wp+0n4BNL.jpg","https://geemerch.com/cdn/shop/files/471946_1200x1200.jpg?v=1707363674","https://m.media-amazon.com/images/I/61Bq7fgA0IL._AC_UF894,1000_QL80_.jpg","https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHO5Mlq6iGHIkDZRThnWaKB0mVo9Y4NfUs3g&s","https://i.ebayimg.com/images/g/6RoAAOSwJpxgMFxj/s-l1200.jpg"]
mikue = ["https://static.wikia.nocookie.net/vocaloid/images/e/e4/MIKU_SP.png/revision/latest?cb=20241025033142",
    "https://images.squarespace-cdn.com/content/v1/642fe9d50ff3d476932fc101/32005b76-8cef-4ac6-8839-ed369522be87/miku.jpg",
    "https://m.media-amazon.com/images/I/51hI-h2Nc3L.jpg",
    "https://kawaji.co.uk/cdn/shop/articles/Art_by_kiyamachi_CFM_MIKU_1.png?v=1666890427&width=1100",
    "https://static.wikia.nocookie.net/all-fiction-battles/images/c/c0/Tray_large.png/revision/latest?cb=20240819145908",
    "https://preview.redd.it/because-i-love-hatsune-miku-v0-rw5fheq9n8ie1.png?auto=webp&s=a5e98d4290f0e2ed61c148b8e4e73aab9549cf68",
    "https://static.wikitide.net/projectsekaiwiki/thumb/3/32/Hatsune_Miku_V2.png/800px-Hatsune_Miku_V2.png",
    "https://www.researchgate.net/publication/356208764/figure/fig1/AS:1090388064518144@1636980181123/Official-Hatsune-Miku-Character.png",

]
num = 0
num2 = 0
num3 = 0

function ChangeBackround() {
    console.log("A");
    backround.style.backgroundImage = "url(" + url[num % url.length] + ")"
    num += 1
}

button.onmousedown = ChangeBackround;



function Flash(){
    
    flashing.src = url[num2 % url.length];

    num2 += 1
}

num3
function Flash2(){
    
    flashing2.src = mikue[num3 % mikue.length];

    num3 += 1
}

setInterval(Flash,50)
setInterval(Flash2,50)
setInterval(ChangeBackround,1000)
