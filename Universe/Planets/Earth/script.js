let body = document.getElementById("body")

let Remove = document.getElementById("Remove")
Remove.remove()



let Canvas = document.createElement("Canvas")
Size = [window.screen.width, window.screen.height]
let Dimension = []
let Stack = []
let ToAddToStack
let FullPop = 1000
Canvas.setAttribute("height", Size[1].toString().concat("px"));
Canvas.setAttribute("width", Size[0].toString().concat("px"));
const context = Canvas.getContext('2d');

const DepthColours = [["Green", "Yellow", "White", "Orange"], ["Gold", "Gray", "Lime"], ["Red", "Orange", "Orange", "Gray", "White"], ["White", "Gray", "Blue", "Pink", "Blue"], ["Orange"], ["Yellow"], ["Pink"],["Blue"],["Purple"]]
const ColorToURL = {
    "Green": "https://img.magnific.com/free-vector/seamless-green-grass-pattern_1284-52275.jpg?semt=ais_hybrid&w=740&q=80",
    "Yellow": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdlmm5kJ_3vgYkzjArmNdjnxgjr1nipJaTgRKb5EUUbafY3s8eqJBqf3g&s=10",
    "White": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQXcQZ2BiQoWrcNUV7XZ4uRscB49XdE3DozMOdz4tVvYpPkJ47YIzBHGc7U&s=10",
    "Orange": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjPb0UfRwjtO8EbQekVOd3IN47a741L70L0RDmhJIs4Z-XhbzFw5j4VCE&s=10",
    "Blue":"https://img.magnific.com/premium-photo/photo-seamless-texture-calm-ocean-water_950361-43063.jpg?semt=ais_hybrid&w=740&q=80",
    "Gold":"https://cdn.architextures.org/textures/26/2/creative-oak-4152-staggered-barham--sons-g93oor.jpg",
    "Lime":"https://www.sketchuptextureclub.com/public/texture_m/157-green-grass-pbr-texture-seamless.jpg",
    "Gray": "https://cdn.architextures.org/textures/25/9/acquerrllo--3ez14u.jpg",
    "Red": "https://cdn.architextures.org/textures/23/4/rusted-iron-none-v2oxec-1200.jpg?w=400&h=320&q=60&f=webp",
    "Pink": "https://cdn.architextures.org/textures/21/07/loop-pile-carpet-60e33325b66d8-1200.jpg?w=400&h=320&q=60&f=webp",
    "Purple": "https://thumb.wikimedia.org/wikipedia/commons/thumb/5/59/Minecraft_missing_texture_block.svg/3840px-Minecraft_missing_texture_block.svg.png?utm_source=commons.wikimedia.org&utm_campaign=index&utm_content=thumbnail"
}

body.appendChild(Canvas);

function Refresh() {
    context.clearRect(0, 0, Canvas.width, Canvas.height);
    Dimension = []
}
function AddVector2(VectorA, VectorB) {
    return [VectorA[0] + VectorB[0], VectorA[1] + VectorB[1]]
}
function SubVector2(VectorA, VectorB) {
    return [VectorA[0] - VectorB[0], VectorA[1] - VectorB[1]]
}
function DrawRectangle(VectorA, VectorB) {
    let Difference = SubVector2(VectorB, VectorA)
    context.fillRect(VectorA[0], VectorA[1], Difference[0], Difference[1])
    context.stroke()
}
function DrawLocation(Location) {

    context.beginPath();
    context.fillStyle = Location.Color
    Dimension.push(Location)
    DrawRectangle(Location.Bounds[0], Location.Bounds[1])
    if (Location.Image) {
        let Img = document.createElement("img")
        Img.setAttribute('src', Location.Image);

        let Width = Math.abs(Location.Bounds[0][0] - Location.Bounds[1][0])
        let Height = Math.abs(Location.Bounds[0][1] - Location.Bounds[1][1])

        context.drawImage(Img, Location.Bounds[0][0],Location.Bounds[0][1],Width,Height)

    }else  if (ColorToURL[Location.Color]){
        let ImgURL = ColorToURL[Location.Color]

        let Img = document.createElement("img")
        Img.setAttribute('src', ImgURL);

        let Width = Math.abs(Location.Bounds[0][0] - Location.Bounds[1][0])
        let Height = Math.abs(Location.Bounds[0][1] - Location.Bounds[1][1])

        context.drawImage(Img, Location.Bounds[0][0],Location.Bounds[0][1],Width,Height)

    } 
}

function MakeLocation(CornerOne, CornerTwo, Color) {
    let Location = {
        "Bounds": [CornerOne, CornerTwo],
        "Color": Color,
        "Population": 0,
        "Inside": [],
        "Image": ""
    }
    return Location
}

function Overlapping(BoundsA, BoundsB) {
    let l1 = BoundsA[0];
    let l2 = BoundsA[1];
    let r1 = BoundsB[0];
    let r2 = BoundsB[1];
    if (
        l2[0] < r1[0] ||
        l1[0] > r2[0] ||
        l2[1] < r1[1] ||
        l1[1] > r2[1]
    ) {
        return false;
    }

    return true;
}


function Populate(Parent, PopToAdd, Depth) {
    Parent.Population = PopToAdd
    let Amount = Math.ceil(Math.random() * (4 * (1 + Depth / 4))) + 2

    if (Amount * 5 > PopToAdd) {
        return false
    }

    let Splices = [PopToAdd]
    for (let index = 0; index < Amount; index++) {
        let Placed = false
        while (Placed == false) {
            let Splice = (Math.ceil(Math.random() * PopToAdd))
            if (Splices.includes(Splice) == false) {
                Splices.push(Splice)
                Placed = true
            }
        }
    }


    let Populations = []
    let Prev = 0

    Splices.sort(function (a, b) { return a - b })
    Splices.forEach(Splice => {
        Populations.push(Splice - Prev)
        Prev = Splice
    });

    Populations.forEach(PopCount => {
        let Area = Math.ceil(PopCount * (PopToAdd / Amount))
        Suitable = false
        let Width
        let Height
        let Pos
        let RectBounds
        let Total = 0
        while (Suitable == false && Total < 20) {
            let Square = Math.sqrt(Area)
            let Slider = Square * Math.random()
            Width = (Square - 10) * Math.random() + 10
            Height = (Square - 10) * Math.random() + 10
            Pos = [Math.ceil(Math.random() * Size[0]), Math.ceil(Math.random() * Size[1])]
            RectBounds = [[Pos[0] - Width / 2, Pos[1] - Height / 2], [Pos[0] + Width / 2, Pos[1] + Height / 2]]

            let Check = false

            Parent.Inside.forEach(Location => {
                context.strokeStyle = "red"
                if (Overlapping(RectBounds, Location.Bounds) == true) {
                    Check = true
                }
            });
            if (Check == false) {
                Suitable = true

            }
            Total += 1

        }
        context.strokeStyle = "White"
        Refresh()
        let Color = DepthColours[Depth][Math.floor(Math.random() * DepthColours[Depth].length)]
        let LocationToAdd = MakeLocation(RectBounds[0], RectBounds[1], Color)
        LocationToAdd.Population = PopCount

        Parent.Inside.push(LocationToAdd)
        Refresh()
        Populate(LocationToAdd, PopCount, Depth + 1)
    });

}

function MoveDimension(Location) {
    Refresh()
    console.log(Location)
    document.body.style.backgroundColor = Location.Color
    if (ColorToURL[Location.Color]){
        let ImgURL = ColorToURL[Location.Color]
        document.body.style.backgroundImage = "Url(".concat( ImgURL).concat(")")
    }
    
    Location.Inside.forEach(LittleGuys => {
        DrawLocation(LittleGuys)
    });
}


addEventListener("click", function (e) {
    let cursorX = e.pageX
    let cursorY = e.pageY
    let Found = []

    Dimension.forEach(Place => {

        let CornerOne = Place.Bounds[0]
        let CornerTwo = Place.Bounds[1]

        if (CornerOne[0] < cursorX && cursorX < CornerTwo[0] && CornerOne[1] < cursorY && cursorY < CornerTwo[1]) {
            Found.push(Place)
        }
    });

    let Smallest = [0, 99999 * 99999]
    console.log(Found)
    Found.forEach(Place => {

        let BoundsA = Place.Bounds[0]
        let BoundsB = Place.Bounds[1]
        let Width = BoundsA[0] - BoundsB[0]
        let Height = BoundsA[1] - BoundsB[1]
        let Area = Math.abs(Width * Height)
        if (Area < Smallest[1]) {
            Smallest = [Place, Area]
        }
    });
    if (Smallest[0]) {


        Stack.push(Smallest[0])
        ToAddToStack = Smallest[0]


        MoveDimension(Smallest[0])
    }

})



let SquareBounds = [Size[1] / 4, Size[1] / 4]
let Mid = [Size[0] / 2, Size[1] / 2]


let Earth = MakeLocation(SubVector2(Mid, SquareBounds), AddVector2(Mid, SquareBounds), "Blue")
Populate(Earth, 5000, 0)
Stack = []

Refresh()

Earth.Image = "https://upload.wikimedia.org/wikipedia/commons/7/7b/Earth_Western_Hemisphere.jpg?utm_source=commons.wikimedia.org&utm_campaign=index&utm_content=original"
DrawLocation(Earth)


document.addEventListener('contextmenu', event => event.preventDefault());

document.body.addEventListener("mousedown", event => {

    if (event.button == 2) {
        if (Stack.length > 1) {
            MoveDimension(Stack[Stack.length - 2])
            Stack.pop()
        } else {
            Refresh()
            DrawLocation(Earth)
            document.body.style.backgroundColor = null
            document.body.style.backgroundImage = "url(../../../Assets/stars_bg.gif)";
            Stack.pop()
        }
    }
});