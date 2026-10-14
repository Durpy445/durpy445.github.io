let body = document.getElementById("body")

let Remove = document.getElementById("Remove")
Remove.remove()


let Canvas = document.createElement("Canvas")
const GravitationalConstant = 0.1
Size = [window.screen.width ,window.screen.height ]
console.log(Size)


Canvas.setAttribute("height",Size[1].toString().concat("px"));
Canvas.setAttribute("width", Size[0].toString().concat("px"));
const context = Canvas.getContext('2d');

body.appendChild(Canvas);

function Refresh(){
    context.clearRect(0, 0, Canvas.width, Canvas.height);
}

function AddVector2(VectorA,VectorB){
    return [VectorA[0] + VectorB[0],VectorA[1] + VectorB[1]]
}

Sun = {
    "Name": "Sun",
    "Mass" : 50,
    "Position" : [-149,0],
    "Color" : "yellow",
    "Size" : 5,
    "Clockwise": 1,
    "Satellites" : []
}
let Universe = [Sun]
function MakePlanet(Name,Mass,Pos,Color,Size,Clockwise,Parent){
    let Planet = {
    "Name": Name,
    "Mass" : Mass,
    "Position" : Pos,
    "Color" : Color,
    "Size" : Size,
    "Clockwise": Clockwise,
    "Satellites" : []}
    if (Parent == "Universe"){
        Universe.push(Planet)
    }else{
        Parent.Satellites.push(Planet)
    }
    
    return Planet
}

let Mercury = MakePlanet("Mercury",5.5,[57,0],"Cyan",0.5,1,Sun)
let Venus = MakePlanet("Venus",82,[108,0],"Gold",1,1,Sun)
let Earth = MakePlanet("Earth",100,[0,0],"Lime",1.5,1,"Universe")
let Luna = MakePlanet("Luna",5.15,[-15,0],"Gray",0.5,1,Earth)
let Mars = MakePlanet("Mars",50,[227,0],"Orange",1,1,Sun)
let Jupiter = MakePlanet("Jupiter",30,[300,0],"Sun Yellow",4,1,Sun)
let Saturn = MakePlanet("Saturn",24,[400,0],"Tan",3,1,Sun)
let Uranus = MakePlanet("Uranus",12.5,[500,0],"Turquoise",2,1,Sun)
let Neptune = MakePlanet("Neptune",9,[600,0],"Blue",2,1,Sun)

Earth.Satellites.push(Sun)

function DrawPlanet(WorkingPos,Planet){
    let GlobalPosition = AddVector2(WorkingPos,Planet.Position)
    context.strokeStyle = Planet.Color
    context.beginPath();
    context.arc(GlobalPosition[0], GlobalPosition[1], Planet.Size * 5, 0, 2 * Math.PI);
    context.stroke();
    return GlobalPosition
}

function RecursiveDraw(WorkingPos,Planet){
    let NewPos = DrawPlanet(WorkingPos,Planet)
    Planet.Satellites.forEach(Satellite => {
        RecursiveDraw(NewPos,Satellite)
    });
}

function DrawUniverse(){
    Universe.forEach(Planet => {
        RecursiveDraw([Size[0]/2,Size[1]/2],Planet)
    });    
}

function RecursiveOrbit(Planet){
    let Radius = Math.hypot(Planet.Position[0],Planet.Position[1])
    let Velocity = Math.sqrt((Planet.Mass * GravitationalConstant) / Radius)

    let CurrentAngle = Math.atan2(Planet.Position[0],Planet.Position[1])
    let NextAngle = CurrentAngle + (Velocity/10) * Planet.Clockwise
    let NextPos = [Radius*Math.sin(NextAngle),Radius*Math.cos(NextAngle)]
    Planet.Position = [NextPos[0],NextPos[1]]

    Planet.Satellites.forEach(Satellite => {
        RecursiveOrbit(Satellite)
    });
}

function OrbitStep(){
    undefined
}



function Step(){
    Refresh()
    DrawUniverse()
    Universe.forEach(Planet => {
        Planet.Satellites.forEach(Satellite => {
            RecursiveOrbit(Satellite)
        });
    });
}

setInterval(Step,25)

let div = document.createElement("div")
body.appendChild(div);
div.style.height= "20px"
div.style.width= "20px"
div.style.color = "White"
div.innerHTML = "Your here \n--> \n "
div.style.position = "absolute"
div.style.top = (Size[1]/2 - 55).toString().concat("px")
div.style.left = (Size[0]/2 - 30).toString().concat("px")