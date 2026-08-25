let MOTD = document.getElementById("MOTD")
let MessageList = [
    "Now with even more bullshit",
    "You can scroll on things!!",
    "Also try Terraria",
    "Also try Minecraft",
    "Will be finished in 15 years",
    "I love the world and everything in it!",
    "I hate javascript",
    "I hate html",
    "I hate css",
    "Made with love, care and caffiene",
    "I hate random number generation",
    "I cant spell",
    "Find my secrets...",
    "BOO",
    "Error 3",
    "Update schedule worse than my sleep schedule",
    "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
    "Be Kind",
    "Thanks",
    "Live laugh love",
    "Kiss the Cook",
    "I cant think of any more MOTDs",
    "Just who the hell do you think i am",
    "Do the impossible",
    "Row! Row! Fight The Power!",
    "Question Authority",
    "Your Amazing!!",
    "greg tech ):",
    "When i was, When i was, When i was, When i was",
    "Papyrus = Roaring Knight",
    "print(\"I am sentient \") --WOAH ITS SENTIENT ",
    "It was always Me vs. The World until i found out it was Me vs. Me",
    "Website been AI free since 1970"
]
let Day = Date.now()/86400000
Day = Math.floor(Day)

ListNum = (Day  ) % MessageList.length
MOTD.innerHTML = MessageList[ListNum]