let Canvas = document.getElementById("Canvas");

Canvas.oncontextmenu = function (e) {
  e.preventDefault();
  e.stopPropagation();
};

let PixelSize = 10;
let width = 160;
let height = 80;
let CurrentColor = [255, 100, 100];
let ctx = Canvas.getContext("2d");
let WorkingArray = 1;

let PixelArray1 = [];
let PixelMap1 = [];
for (let i = 0; i < width; i++) {
  PixelMap1[i] = [];
  for (let j = 0; j < height; j++) {
    PixelMap1[i][j] = [255, 255, 255];
  }
}

let movementLookup = [
  [0, 1],
  [1, 0],
  [0, -1],
  [-1, 0],
];

let ColorLookupEmpty = [
  [255, 100, 100],
  [100, 255, 100],
  [100, 100, 255],
  [200, 100, 200],
];

let ColorLookupColoured = [
  [100, 255, 255],
  [255, 100, 255],
  [255, 255, 100],
  [100, 100, 100],
];

let PixelArray2 = [];
let PixelMap2 = [];
for (let i = 0; i < width; i++) {
  PixelMap2[i] = [];
  for (let j = 0; j < height; j++) {
    PixelMap2[i][j] = [255, 255, 255];
  }
}

function CompareColors(Color1, Color2) {
  if (
    Color1[0] == Color2[0] &&
    Color1[1] == Color2[1] &&
    Color1[2] == Color2[2]
  ) {
    return true;
  }
  return false;
}

function AddVector2(VectorA, VectorB) {
  return [VectorA[0] + VectorB[0], VectorA[1] + VectorB[1]];
}

function GetCursorPosition(event) {
  let rect = Canvas.getBoundingClientRect();
  let x = event.clientX - rect.left;
  let y = event.clientY - rect.top;
  x = Math.floor(x / PixelSize) * PixelSize;
  y = Math.floor(y / PixelSize) * PixelSize;
  return [x, y];
}

function InBounds(Vector2) {
  let x = Vector2[0];
  let y = Vector2[1];
  if (x < 0 && y < 0 && x >= width && y >= height) {
    return false;
  } else {
    return true;
  }
}

function GetSorounding(Vector2) {
  let Sorounding = [];
  for (let ix = x - 1; ix <= x + 1; ix++) {
    for (let iy = y - 1; iy <= y + 1; iy++) {
      if (!(ix === x && iy === y)) {
        NewX = Mod(ix, width);
        NewY = Mod(iy, height);
        Sorounding.push[(NewX, NewY)];
      }
    }
  }
  return Sorounding;
}

function GetSorounding4(Vector2) {
  let Sorounding = [];

  Sorounding.push(Wrap([Vector2[0] - 0, Vector2[1] - 1]));
  Sorounding.push(Wrap([Vector2[0] + 0, Vector2[1] + 1]));
  Sorounding.push(Wrap([Vector2[0] - 1, Vector2[1] - 0]));
  Sorounding.push(Wrap([Vector2[0] + 1, Vector2[1] + 0]));

  return Sorounding;
}

function Mirror(Num, Around) {
  return Around - Num + Around;
}

function Wrap(Vector2) {
  return [Mod(Vector2[0], width), Mod(Vector2[1], height)];
}

function Mod(n, m) {
  return ((n % m) + m) % m;
}

function AddVector2(VectorA, VectorB) {
  return [VectorA[0] + VectorB[0], VectorA[1] + VectorB[1]];
}

function ClearCanvas() {
  ctx.clearRect(0, 0, Canvas.width, Canvas.height);
}

function RefreshCanvas() {
  ctx.clearRect(0, 0, Canvas.width, Canvas.height);
  if (WorkingArray == 1) {
    PixelArray1.forEach((Pixel) => {
      Vector2 = Pixel[1];
      Color = Pixel[0];
      let R = Color[0];
      let G = Color[1];
      let B = Color[2];

      let A = Mirror(Vector2[0], width / 2);
      let Ba = Mirror(Vector2[1], height / 2);

      ctx.fillStyle = "rgb("
        .concat(R.toString())
        .concat(",")
        .concat(G.toString())
        .concat(",")
        .concat(B.toString())
        .concat(")");
      ctx.fillRect(A * PixelSize, Ba * PixelSize, PixelSize, PixelSize);
    });
  } else {
    PixelArray2.forEach((Pixel) => {
      Vector2 = Pixel[1];
      Color = Pixel[0];
      let R = Color[0];
      let G = Color[1];
      let B = Color[2];

      let A = Mirror(Vector2[0], width / 2);
      let Ba = Mirror(Vector2[1], height / 2);

      ctx.fillStyle = "rgb("
        .concat(R.toString())
        .concat(",")
        .concat(G.toString())
        .concat(",")
        .concat(B.toString())
        .concat(")");
      ctx.fillRect(A * PixelSize, Ba * PixelSize, PixelSize, PixelSize);
    });
  }
}

function ClearWorkingArray() {
  if (WorkingArray == 1) {
    PixelArray1 = [];
    PixelMap1 = [];
    for (let i = 0; i < width; i++) {
      PixelMap1[i] = [];
      for (let j = 0; j < height; j++) {
        PixelMap1[i][j] = [255, 255, 255];
      }
    }
  } else {
    PixelArray2 = [];
    PixelMap2 = [];
    for (let i = 0; i < width; i++) {
      PixelMap2[i] = [];
      for (let j = 0; j < height; j++) {
        PixelMap2[i][j] = [255, 255, 255];
      }
    }
  }
}

function CheckLocalCoordinatePos(Vector2) {
  let localX = Vector2[0];
  let localY = Vector2[1];
  if (WorkingArray == 1) {
    for (let i = 0; i < PixelArray1.length; i++) {
      let pixel = PixelArray1[i];
      if (pixel[1][0] == localX && pixel[1][1] == localY) {
        return i;
      }
    }
  } else {
    for (let i = 0; i < PixelArray2.length; i++) {
      let pixel = PixelArray2[i];
      if (pixel[1][0] == localX && pixel[1][1] == localY) {
        return i;
      }
    }
  }
  return null;
}

function CheckLocalCoordinateColor(Vector2) {
  let pos = CheckLocalCoordinatePos(Vector2);
  if (pos == null) {
    return null;
  }
  if (WorkingArray == 1) {
    return PixelArray1[pos];
  } else {
    return PixelArray2[pos];
  }
}

function PaintPixel(Vector2, Color) {
  let Pos = CheckLocalCoordinatePos(Vector2);
  console.log(Vector2);
  let R = Color[0];
  let G = Color[1];
  let B = Color[2];

  if (WorkingArray == 1) {
    if (Pos == null) {
      PixelArray1.push([[R, G, B], Vector2]);
    } else {
      PixelArray1[Pos][0] = [R, G, B];
    }
    PixelMap1[Vector2[0]][Vector2[1]] = [R, G, B];
  } else {
    if (Pos == null) {
      PixelArray2.push([[R, G, B], Vector2]);
    } else {
      PixelArray2[Pos][0] = [R, G, B];
    }
    PixelMap2[Vector2[0]][Vector2[1]] = [R, G, B];
  }

  console.log(Vector2);
  let A = Mirror(Vector2[0], width / 2);
  let Ba = Mirror(Vector2[1], height / 2);

  console.log(Vector2);
  ctx.fillStyle = "rgb("
    .concat(R.toString())
    .concat(",")
    .concat(G.toString())
    .concat(",")
    .concat(B.toString())
    .concat(")");
  ctx.fillRect(A * PixelSize, Ba * PixelSize, PixelSize, PixelSize);
}

function RemovePixel(Vector2) {
  let Pos = CheckLocalCoordinatePos(Vector2);

  if (Pos == null) {
    return null;
  }

  if (WorkingArray == 1) {
    PixelArray1.splice(Pos, 1);

    PixelMap1[Vector2[0]][Vector2[1]] = [255, 255, 255];
  } else {
    PixelArray2.splice(Pos, 1);

    PixelMap2[Vector2[0]][Vector2[1]] = [255, 255, 255];
  }

  let A = Mirror(Vector2[0], width / 2);
  let Ba = Mirror(Vector2[1], height / 2);

  ctx.fillStyle = "rgb(255,255,255)";
  ctx.fillRect(A * PixelSize, Ba * PixelSize, PixelSize, PixelSize);
}

function Conway() {
  let Array = [];
  let Map = [];
  let Check = [];

  if (WorkingArray == 1) {
    Array = PixelArray1;
    Map = PixelMap1;
    WorkingArray = 2;
    ClearWorkingArray();
  } else {
    Array = PixelArray2;
    Map = PixelMap2;
    WorkingArray = 1;
    ClearWorkingArray();
  }

  Array.forEach((pixel) => {
    for (let ix = pixel[1][0] - 1; ix <= pixel[1][0] + 1; ix++) {
      for (let iy = pixel[1][1] - 1; iy <= pixel[1][1] + 1; iy++) {
        NewX = Mod(ix, width);
        NewY = Mod(iy, height);

        let allowed = true;
        Check.forEach((ToBeChecked) => {
          if (ToBeChecked[0] == NewX && ToBeChecked[1] == NewY) allowed = false;
        });

        if (allowed == true) {
          Check.push([NewX, NewY]);
        }
      }
    }
  });

  Check.forEach((Vector2) => {
    let x = Vector2[0];
    let y = Vector2[1];
    let Count = 0;
    let SeenColors = [];
    let BaseColor = Map[x][y];
    let ColouredPixel = CompareColors(BaseColor, [255, 255, 255]) == false;

    for (let ix = x - 1; ix <= x + 1; ix++) {
      for (let iy = y - 1; iy <= y + 1; iy++) {
        if (!(ix === x && iy === y)) {
          NewX = Mod(ix, width);
          NewY = Mod(iy, height);
          if (CompareColors(Map[NewX][NewY], [255, 255, 255]) == false) {
            Count++;
            SeenColors.push(Map[NewX][NewY]);
          }
        }
      }
    }

    switch (Count) {
      case 3:
        let Color = [];
        if (ColouredPixel == false) {
          if (CompareColors(SeenColors[0], SeenColors[1])) {
            Color = SeenColors[0];
          }
          if (CompareColors(SeenColors[0], SeenColors[2])) {
            Color = SeenColors[0];
          }
          if (CompareColors(SeenColors[1], SeenColors[2])) {
            Color = SeenColors[1];
          } else {
            let A = SeenColors[0][0] + SeenColors[0][1] + SeenColors[0][2];
            let B = SeenColors[1][0] + SeenColors[1][1] + SeenColors[1][2];
            let C = SeenColors[2][0] + SeenColors[2][1] + SeenColors[2][2];

            if (A <= B && A <= C) {
              Color = SeenColors[0];
            }
            if (B <= A && B <= C) {
              Color = SeenColors[1];
            }
            if (C <= B && C <= A) {
              Color = SeenColors[2];
            }
          }
        } else {
          Color = BaseColor;
        }

        if (WorkingArray == 1) {
          PixelArray1.push([Color, Vector2]);
          PixelMap1[Vector2[0]][Vector2[1]] = Color;
        } else {
          PixelArray2.push([Color, Vector2]);
          PixelMap2[Vector2[0]][Vector2[1]] = Color;
        }

      case 2:
        if (ColouredPixel == true) {
          if (WorkingArray == 1) {
            PixelArray1.push([BaseColor, Vector2]);
            PixelMap1[Vector2[0]][Vector2[1]] = BaseColor;
          } else {
            PixelArray2.push([BaseColor, Vector2]);
            PixelMap2[Vector2[0]][Vector2[1]] = BaseColor;
          }
        }
        break;
      default:
    }
  });
}

let Ants = [[], [], [], []];
function Ant() {
  let Array = [];
  let Map = [];

  if (WorkingArray == 1) {
    Array = PixelArray1;
    Map = PixelMap1;
  } else {
    Array = PixelArray2;
    Map = PixelMap2;
  }

  ToCheck = [[], [], [], []];

  Array.forEach((pixel) => {
    if (CompareColors(pixel[0], ColorLookupEmpty[0])) {
      ToCheck[0].push(pixel[1]);
    } else if (CompareColors(pixel[0], ColorLookupEmpty[1])) {
      ToCheck[1].push(pixel[1]);
    } else if (CompareColors(pixel[0], ColorLookupEmpty[2])) {
      ToCheck[2].push(pixel[1]);
    } else if (CompareColors(pixel[0], ColorLookupEmpty[3])) {
      ToCheck[3].push(pixel[1]);
    }

    if (CompareColors(pixel[0], ColorLookupColoured[0])) {
      ToCheck[0].push(pixel[1]);
    } else if (CompareColors(pixel[0], ColorLookupColoured[1])) {
      ToCheck[1].push(pixel[1]);
    } else if (CompareColors(pixel[0], ColorLookupColoured[2])) {
      ToCheck[2].push(pixel[1]);
    } else if (CompareColors(pixel[0], ColorLookupColoured[3])) {
      ToCheck[3].push(pixel[1]);
    }
  });

  CurrentAnts = [[], [], [], []];
  for (let i = 0; i < ToCheck.length; i++) {
    ToCheck[i].forEach((Vector2) => {
      let test = true;
      for (let j = 0; j < Ants[i].length; j++) {
        if (Ants[i][j][1][0] == Vector2[0] && Ants[i][j][1][0] == Vector2[0]) {
          test = false;
          CurrentAnts[i].push(Ants[i][j]);
        }
      }
      if (test == true) {
        CurrentAnts[i].push([[Math.floor(Math.random()*254),Math.floor(Math.random()*254),Math.floor(Math.random()*254)], Vector2]);
      }
    });
  }

  let ChangedPixels = [];
  let NewAnts = [[], [], [], []];
  for (let i = 0; i < CurrentAnts.length; i++) {
    for (let j = 0; j < CurrentAnts[i].length; j++) {
      let Ant = CurrentAnts[i][j];
      let AntColor = Map[Ant[1][0]][Ant[1][1]];

      let Direction = movementLookup[i];
      let NextPosition = Wrap(AddVector2(Ant[1], Direction));
      let NextColor = Map[NextPosition[0]][NextPosition[1]];

      let ToBePainted = [255, 255, 255];
      let Painting = false;

      if (
        CompareColors(AntColor, ColorLookupColoured[0]) ||
        CompareColors(AntColor, ColorLookupColoured[1]) ||
        CompareColors(AntColor, ColorLookupColoured[2]) ||
        CompareColors(AntColor, ColorLookupColoured[3])
      ) {
        ToBePainted = Ant[0];
        Painting = true;
      }

      let Coloured = true;
      if (CompareColors(NextColor, [255, 255, 255]) == false) {
        ToBePainted = NextColor;
        Coloured = false;
      } else {
      }

      let NewAntColor = [];
      if (Coloured == true) {
        newDirection = Mod(i - 1, 4);
        NewAntColor = ColorLookupColoured[newDirection];
      } else {
        newDirection = Mod(i + 1, 4);
        NewAntColor = ColorLookupEmpty[newDirection];
      }

      if (Painting == true) {
        ChangedPixels.push([Ant[0], Ant[1]]);
      } else {
        ChangedPixels.push([[255, 255, 255], Ant[1]]);
      }

      ChangedPixels.push([NewAntColor, NextPosition]);

      if (CompareColors(ToBePainted, [255, 255, 255])) {
        ToBePainted = Ant[0];
      }
      NewAnts[newDirection].push([ToBePainted, NextPosition]);
    }
  }

  for (let i = 0; i < ChangedPixels.length; i++) {
    if (CompareColors(ChangedPixels[i][0], [255, 255, 255]) == false) {
      PaintPixel(ChangedPixels[i][1], ChangedPixels[i][0]);
    } else {
      RemovePixel(ChangedPixels[i][1]);
    }
  }

  Ants = NewAnts;
}

function Neumann() {
  let Array = [];
  let Map = [];

  let FutureMap = [];
  let FutureArray = [];

  if (WorkingArray == 1) {
    Array = PixelArray1;
    Map = PixelMap1;
  } else {
    Array = PixelArray2;
    Map = PixelMap2;
  }

  let Sensitized = [[], [], [], [], [], [], [], []];
  let ColorS = [
    [255, 0, 0],
    [255, 125, 0],
    [255, 175, 50],
    [251, 255, 0],
    [255, 200, 75],
    [255, 150, 25],
    [255, 255, 100],
    [255, 250, 125],
  ];

  let Confluent = [[], [], [], []];
  let ColorC = [
    [0, 255, 128],
    [33, 215, 215],
    [255, 255, 128],
    [255, 128, 64],
  ];

  let OrdinaryTransmission = [
    [[], []],
    [[], []],
    [[], []],
    [[], []],
  ];
  let ColorOT = [
    [
      [36, 200, 36],
      [106, 106, 255],
    ],
    [
      [106, 255, 106],
      [139, 139, 255],
    ],
    [
      [73, 255, 73],
      [122, 122, 255],
    ],
    [
      [27, 176, 27],
      [89, 89, 255],
    ],
  ];

  let SpecialTransmission = [
    [[], []],
    [[], []],
    [[], []],
    [[], []],
  ];
  let ColorST = [
    [
      [191, 73, 255],
      [255, 56, 56],
    ],
    [
      [203, 106, 255],
      [255, 89, 89],
    ],
    [
      [197, 89, 255],
      [255, 73, 73],
    ],
    [
      [185, 56, 255],
      [235, 36, 36],
    ],
  ];

  Array.forEach((pixel) => {
    let Color = pixel[0];
    let IsCell = false;
    for (let i = 0; i < ColorS.length; i++) {
      if (CompareColors(ColorS[i], Color)) {
        Sensitized[i].push(pixel[1]);
        IsCell = true;
      }
    }

    for (let i = 0; i < ColorC.length; i++) {
      if (CompareColors(ColorC[i], Color)) {
        Confluent[i].push(pixel[1]);
        IsCell = true;
      }
    }

    for (let i = 0; i < ColorOT.length; i++) {
      if (CompareColors(ColorOT[i][0], Color)) {
        OrdinaryTransmission[i][0].push(pixel[1]);
        IsCell = true;
      } else if (CompareColors(ColorOT[i][1], Color)) {
        OrdinaryTransmission[i][1].push(pixel[1]);
        IsCell = true;
      }
    }

    for (let i = 0; i < ColorST.length; i++) {
      if (CompareColors(ColorST[i][0], Color)) {
        SpecialTransmission[i][0].push(pixel[1]);
        IsCell = true;
      } else if (CompareColors(ColorST[i][1], Color)) {
        SpecialTransmission[i][1].push(pixel[1]);
        IsCell = true;
      }
    }
  });

  function GetInputsNormal(Vector2) {
    let Sorounding = GetSorounding4(Vector2);
    let inputs = [];
    for (let i = 0; i < Sorounding.length; i++) {
      let X = Sorounding[i][0];
      let Y = Sorounding[i][1];
      let PixelColor = Map[X][Y];

      if (
        CompareColors(PixelColor, ColorOT[i][0]) ||
        CompareColors(PixelColor, ColorOT[i][1]) ||
        CompareColors(PixelColor, ColorST[i][0]) ||
        CompareColors(PixelColor, ColorST[i][1])
      ) {
        inputs.push([PixelColor, [X, Y]]);
      }
    }
    return inputs;
  }

  function GetPoweredInputsNormal(Vector2) {
    let Inputs = GetInputsNormal(Vector2);
    let PoweredInputs = [];

    Inputs.forEach((input) => {
      let Color = input[0];
      for (let i = 0; i < 4; i++) {
        if (
          CompareColors(Color, ColorOT[i][0]) ||
          CompareColors(Color, ColorST[i][0])
        ) {
          PoweredInputs.push(input);
        }
      }
    });
    return PoweredInputs;
  }

  function GetPoweredNormal(Vector2) {
    let Inputs = GetInputsNormal(Vector2);
    let Test = false;
    Inputs.forEach((input) => {
      let Color = input[0];

      for (let i = 0; i < 4; i++) {
        if (
          CompareColors(Color, ColorOT[i][0]) ||
          CompareColors(Color, ColorST[i][0])
        ) {
          Test = true;
        }
      }
    });

    return Test;
  }

  function GetTrasnmissionDirection(Vector2) {
    for (let i = 0; i < 4; i++) {
      let Color = Map[Vector2[0]][Vector2[1]];
      if (
        CompareColors(Color, ColorOT[i][0]) ||
        CompareColors(Color, ColorST[i][0]) ||
        CompareColors(Color, ColorOT[i][1]) ||
        CompareColors(Color, ColorST[i][1])
      ) {
        return i;
      }
    }
    return null;
  }

  function GetInputsTransmission(Vector2) {
    let Sorounding = GetSorounding4(Vector2);
    let Facing = GetTrasnmissionDirection(Vector2);
    let Opposite = 0;
    if (Facing == 0) {
      Opposite = 1;
    } else if (Facing == 1) {
      Opposite = 0;
    } else if (Facing == 2) {
      Opposite = 3;
    } else if (Facing == 3) {
      Opposite = 2;
    }
    let inputs = [];
    for (let i = 0; i < Sorounding.length; i++) {
      let Color = Map[Sorounding[i][0]][Sorounding[i][1]];
      if (i != Opposite) {
        if (
          CompareColors(Color, ColorOT[i][0]) ||
          CompareColors(Color, ColorST[i][0]) ||
          CompareColors(Color, ColorOT[i][1]) ||
          CompareColors(Color, ColorST[i][1]) ||
          CompareColors(Color, ColorC[0]) ||
          CompareColors(Color, ColorC[1]) ||
          CompareColors(Color, ColorC[2]) ||
          CompareColors(Color, ColorC[3])
        ) {
          inputs.push(Sorounding[i]);
        }
      }
    }
    return inputs;
  }

  function GetPoweredInputsTransmission(Vector2) {
    let Sorounding = GetSorounding4(Vector2);
    let Facing = GetTrasnmissionDirection(Vector2);
    let Opposite = 0;
    if (Facing == 0) {
      Opposite = 1;
    } else if (Facing == 1) {
      Opposite = 0;
    } else if (Facing == 2) {
      Opposite = 3;
    } else if (Facing == 3) {
      Opposite = 2;
    }

    let inputs = [];

    for (let i = 0; i < Sorounding.length; i++) {
      let Color = Map[Sorounding[i][0]][Sorounding[i][1]];
      if (i != Opposite) {
        if (
          CompareColors(Color, ColorOT[i][0]) ||
          CompareColors(Color, ColorST[i][0]) ||
          CompareColors(Color, ColorC[2]) ||
          CompareColors(Color, ColorC[3])
        ) {
          inputs.push(Sorounding[i]);
        }
      }
    }
    return inputs;
  }

  function IsTransmissionToBePowered(Vector2) {
    //Assuming its a transmission cell
    if (GetPoweredInputsTransmission(Vector2).length > 0) {
      return true;
    }
    return false;
  }

  function GetOrdinaryTranmission(List) {
    let Transmissions = [];
    List.forEach((Cell) => {
      let Color = Cell[0];
      for (let i = 0; i < 4; i++) {
        if (
          CompareColors(Color, OrdinaryTransmission[i][0]) ||
          CompareColors(Color, OrdinaryTransmission[i][1])
        ) {
          Transmissions.push(Cell);
        }
      }
    });
    return Transmissions;
  }

  function PoweredFromArray(List) {
    let Powered = [];
    for (let i = 0; i < List.length; i++) {
      let Color = Map[Sorounding[i][0]][Sorounding[i][1]];
      if (
        CompareColors(Color, ColorOT[i][0]) ||
        CompareColors(Color, ColorST[i][0]) ||
        CompareColors(Color, ColorC[2]) ||
        CompareColors(Color, ColorC[3])
      ) {
        Powered.push(Sorounding[i]);
      }
    }
    return Powered;
  }

  function IsConfluentToBePowered(Vector2) {
    //Assuming its a Confluent cell
    if (
      GetInputsNormal(Vector2).length == GetPoweredInputsNormal(Vector2).length
    ) {
      return true;
    }
    return false;
  }
  function NextSensitized(Vector2, Powered) {
    //AssumingCorrect
    let Color = Map[Vector2[0]][Vector2[1]];
    let Num = 0;
    for (let i = 0; i < 8; i++) {
      if (CompareColors(Color, ColorS[i])) {
        Num = i;
      }
    }
    if (CompareColors(Color, [255, 255, 255]) && 1) {
      return 0;
    }
    if (Num == 0 && Powered == 1) {
      return 5;
    } else if (Num == 0 && Powered == 0) {
      return 1;
    } else if (Num == 5 && Powered == 1) {
      return 7;
    } else if (Num == 5 && Powered == 0) {
      return 6;
    } else if (Num == 1 && Powered == 1) {
      return 4;
    } else if (Num == 1 && Powered == 0) {
      return 2;
    } else if (Num == 2 && Powered == 0) {
      return 3;
    }

    return false;
  }

  function SensitizedToCell(State, Powered) {
    if (State == 3 && Powered == 0) {
      return [3, 3];
    } else if (State == 3 && Powered == 1) {
      return [3, 0];
    } else if (State == 2 && Powered == 1) {
      return [3, 2];
    } else if (State == 4 && Powered == 0) {
      return [3, 1];
    } else if (State == 4 && Powered == 1) {
      return [4, 3];
    } else if (State == 6 && Powered == 0) {
      return [4, 0];
    } else if (State == 6 && Powered == 1) {
      return [4, 2];
    } else if (State == 7 && Powered == 0) {
      return [4, 1];
    } else if (State == 7 && Powered == 1) {
      return [2, 0];
    }
    return null;
  }

  function CellCodeToColor(Array) {
    type = Array[0];
    subtype = Array[1];

    if (type == 0) {
      return [255, 255, 255];
    }
    if (type == 1) {
      return ColorS[subtype];
    }
    if (type == 2) {
      return ColorC[subtype];
    }
    if (type == 3) {
      return ColorOT[subtype][1];
    }
    if (type == 4) {
      return ColorST[subtype][1];
    }
    return null;
  }

  function NextConfluent(Vector2, Powered) {
    let Color = Map[Vector2[0]][Vector2[1]];
    let Num = 0;
    for (let i = 0; i < ColorC.length; i++) {
      if (CompareColors(Color, ColorC[i])) {
        Num = i;
      }
    }

    if (Num == 0 && Powered == 0) {
      return 0;
    } else if (Num == 0 && Powered == 1) {
      return 1;
    } else if (Num == 1 && Powered == 0) {
      return 2;
    } else if (Num == 1 && Powered == 1) {
      return 3;
    } else if (Num == 2 && Powered == 0) {
      return 0;
    } else if (Num == 2 && Powered == 1) {
      return 1;
    } else if (Num == 3 && Powered == 0) {
      return 2;
    } else if (Num == 3 && Powered == 1) {
      return 3;
    }
  }
  let TransmissionDirections = [
    [0, 1],
    [0, -1],
    [1, 0],
    [-1, 0],
  ];
  function TransmissionLocation(Vector2) {
    let Direction = GetTrasnmissionDirection(Vector2);

    return Wrap(AddVector2(Vector2, TransmissionDirections[Direction]));
  }

  let ToPaint = [];
  //Sensitized
  for (let i = 0; i < Sensitized.length; i++) {
    for (let j = 0; j < Sensitized[i].length; j++) {
      let Vector2 = Sensitized[i][j];
      let Powered = GetPoweredNormal(Vector2);

      let PoweredEtc = 0;
      if (Powered == true) {
        PoweredEtc = 1;
      }

      let Next = NextSensitized(Vector2, PoweredEtc);
      if (Next === false) {
        let Num = 0;
        let Color = Map[Vector2[0]][Vector2[1]];
        for (let i = 0; i < 8; i++) {
          if (CompareColors(Color, ColorS[i])) {
            Num = i;
          }
        }
        let CellCode = SensitizedToCell(Num, PoweredEtc);

        ToPaint.push([CellCodeToColor(CellCode), Vector2]);
      } else {
        ToPaint.push([CellCodeToColor([1, Next]), Vector2]);
      }
    }
  }
  //Confluent
  for (let i = 0; i < Confluent.length; i++) {
    for (let j = 0; j < Confluent[i].length; j++) {
      let Vector2 = Confluent[i][j];
      let Powered = IsConfluentToBePowered(Vector2);
      console.log("COnfluent Powered", Powered);
      let PoweredEtc = 0;
      if (Powered == true) {
        PoweredEtc = 1;
      }
      let Next = NextConfluent(Vector2, PoweredEtc);
      let Color = CellCodeToColor([2, Next]);

      ToPaint.push([Color, Vector2]);
    }
  }

  //Ordinary Transmission
  for (let i = 0; i < OrdinaryTransmission.length; i++) {
    for (let Powered = 0; Powered < OrdinaryTransmission[i].length; Powered++) {
      for (let j = 0; j < OrdinaryTransmission[i][Powered].length; j++) {
        let Vector2 = OrdinaryTransmission[i][Powered][j];
        let PoweredEtc = Mod(Powered + 1, 2);
        let TobePowered = IsTransmissionToBePowered(Vector2);

        let CellToPowerLocaiton = TransmissionLocation(Vector2);

        let CellToPowerColor =
          Map[CellToPowerLocaiton[0]][CellToPowerLocaiton[1]];

        let Inputs = GetPoweredInputsNormal(Vector2);
        let Delete = false;

        Inputs.forEach((Cell) => {
          for (let Test = 0; Test < ColorST.length; Test++) {
            if (CompareColors(Cell[0], ColorST[Test][0])) {
              Delete = true;
            }
          }
        });

        if (
          PoweredEtc == 1 &&
          CompareColors(CellToPowerColor, [255, 255, 255])
        ) {
          ToPaint.push([ColorS[0], CellToPowerLocaiton]);
        }

        if (Delete == false) {
          if (TobePowered == false) {
            ToPaint.push([ColorOT[i][1], Vector2]);
          } else {
            ToPaint.push([ColorOT[i][0], Vector2]);
          }
        } else {
          ToPaint.push([[255, 255, 255], Vector2]);
        }
      }
    }
  }
  //SpecialTranmssion
  for (let i = 0; i < SpecialTransmission.length; i++) {
    for (let Powered = 0; Powered < SpecialTransmission[i].length; Powered++) {
      for (let j = 0; j < SpecialTransmission[i][Powered].length; j++) {
        let Vector2 = SpecialTransmission[i][Powered][j];
        let PoweredEtc = Mod(Powered + 1, 2);
        let TobePowered = IsTransmissionToBePowered(Vector2);

        let CellToPowerLocaiton = TransmissionLocation(Vector2);
        let CellToPowerColor =
          Map[CellToPowerLocaiton[0]][CellToPowerLocaiton[1]];

        let Inputs = GetPoweredInputsNormal(Vector2);
        let Delete = false;
        Inputs.forEach((Cell) => {
          for (let Test = 0; Test < ColorOT.length; Test++) {
            if (CompareColors(Cell[0], ColorOT[Test][0])) {
              Delete = true;
            }
          }
        });

        let PoweringConfluent = false;
        for (let Test = 0; Test < ColorC.length; Test++) {
          if (CompareColors(CellToPowerColor, ColorC[Test])) {
            PoweringConfluent = true;
          }
        }
        if (PoweringConfluent == true) {
          ToPaint.push([[255, 255, 255], CellToPowerLocaiton]);
        }

        if (
          PoweredEtc == 1 &&
          CompareColors(CellToPowerColor, [255, 255, 255])
        ) {
          ToPaint.push([ColorS[0], CellToPowerLocaiton]);
        }

        if (Delete == false) {
          if (TobePowered == false) {
            ToPaint.push([ColorST[i][1], Vector2]);
          } else {
            ToPaint.push([ColorST[i][0], Vector2]);
          }
        } else {
          ToPaint.push([[255, 255, 255], Vector2]);
        }
      }
    }
  }

  ToPaint.forEach((Pixel) => {
    console.log(Pixel);
    PaintPixel(Pixel[1], Pixel[0]);
  });
  ToPaint.forEach((Pixel) => {
    if (CompareColors(Pixel[0], [255, 255, 255])) {
      RemovePixel(Pixel);
    }
  });
}

Canvas.addEventListener("mousedown", function (e) {
  if (e.buttons == 1) {
    console.log("  ");
    let Vector2 = GetCursorPosition(e);
    let x = Vector2[0];
    let y = Vector2[1];
    let localX = x / PixelSize;
    let localY = y / PixelSize;

    console.log([localX, localY]);

    localX = Mirror(localX, width / 2);
    localY = Mirror(localY, height / 2);

    PaintPixel([localX, localY], CurrentColor);
  }
  if (e.buttons == 2) {
    let Vector2 = GetCursorPosition(e);
    let x = Vector2[0];
    let y = Vector2[1];
    let localX = x / PixelSize;
    let localY = y / PixelSize;

    localX = Mirror(localX, width / 2);
    localY = Mirror(localY, height / 2);

    RemovePixel([localX, localY]);
  }
  if (e.buttons == 4) {
    Neumann();
  }
  if (e.buttons == 3) {
  }
});



let Info = [
  ["Conways Game Of Life", [["Pixels"], ["Alive Pixel", [150, 150, 150]]]],
  [
    "Langtons Ant",
    [
      ["Colored Ants"],
      ["North|Colored", [255, 100, 100]],
      ["East|Colored", [100, 255, 100]],
      ["South|Colored", [100, 100, 255]],
      ["West|Colored", [255, 100, 100]],
      ["Empty Ants"],
      ["North|Empty", [100, 255, 255]],
      ["East|Empty", [255, 100, 255]],
      ["South|Empty", [255, 255, 100]],
      ["West|Empty", [100, 100, 100]],
    ],
  ],
  [
    "Von Neumann cellular automaton",
    [
      ["Ground"],
      ["Ground", [255, 255, 255]],
      ["Sensitized States"],
      ["Newly Sensitised", [255, 0, 0]],
      ["Sensitised, having received no input for one cycle", [255, 125, 0]],
      ["Sensitised, having received no input for two cycles", [255, 175, 50]],
      ["Sensitised, having received no input for three cycles", [251, 255, 0]],
      [
        "Sensitised, having received no input for one cycle and then an input for one cycle",
        [255, 200, 75],
      ],
      ["Sensitised, having received an input for one cycle", [255, 150, 25]],
      [
        "Sensitised, having received an input for one cycle and then no input for one cycle",
        [255, 255, 100],
      ],
      ["Sensitised, having received input for two cycles", [255, 250, 125]],
      ["Confluent States"],
      ["Confluent|Quiescent", [0, 255, 128]],
      ["Confluent|Next-Excited", [33, 215, 215]],
      ["Confluent|Excited", [255, 255, 128]],
      ["Confluent|Excited Next-Excited", [255, 128, 64]],
      ["Ordinary Transmissions"],
      ["Ordinary Tranmission|Excited|North ", [36, 200, 36]],
      ["Ordinary Tranmission|Excited|South", [106, 255, 106]],
      ["Ordinary Tranmission|Excited|West", [73, 255, 73]],
      ["Ordinary Tranmission|Excited|East", [27, 176, 27]],
      ["Ordinary Tranmission|Quiescent|North", [106, 106, 255]],
      ["Ordinary Tranmission|Quiescent|South", [139, 139, 255]],
      ["Ordinary Tranmission|Quiescent|West", [122, 122, 255]],
      ["Ordinary Tranmission|Quiescent|East", [89, 89, 255]],
      ["Special Transmissions"],
      ["Special Tranmission|Excited|North ", [191, 73, 255]],
      ["Special Tranmission|Excited|South", [203, 106, 255]],
      ["Special Tranmission|Excited|West", [197, 89, 255]],
      ["Special Tranmission|Excited|East", [185, 56, 255]],
      ["Special Tranmission|Quiescent|North", [255, 56, 56]],
      ["Special Tranmission|Quiescent|South", [255, 89, 89]],
      ["Special Tranmission|Quiescent|West", [255, 73, 73]],
      ["Special Tranmission|Quiescent|East", [235, 36, 36]],
    ],
  ],
];

let HTMLTOADD = "";
Info.forEach((Automata) => {
  HTMLTOADD = HTMLTOADD.concat("<li><h2>")
    .concat(Automata[0])
    .concat("</h2> <ul>");
  Automata[1].forEach((Data) => {
    if (Data.length == 1) {
      HTMLTOADD = HTMLTOADD.concat("<li><h3>")
        .concat(Data[0])
        .concat("</h3> </li>");
    } else {
      HTMLTOADD = HTMLTOADD.concat(
        '<li><button style = "cursor: pointer; background-color:rgb(',
      )
        .concat(Data[1][0].toString())
        .concat(",")
        .concat(Data[1][1].toString())
        .concat(",")
        .concat(Data[1][2].toString())
        .concat(')" onclick = "')
        .concat("CurrentColor =[")
        .concat(Data[1][0].toString())
        .concat(",")
        .concat(Data[1][1].toString())
        .concat(",")
        .concat(Data[1][2].toString())
        .concat(']">')
        .concat(Data[0])
        .concat("</button></li>");
    }
  });
  HTMLTOADD = HTMLTOADD.concat("</ul></li>");
});

let List = document.getElementById("List");
List.innerHTML = HTMLTOADD;

window.addEventListener("keydown", (Button) => {
  console.log(Button);
  switch (Button.key) {

    case "c":
      Conway();
      RefreshCanvas()
      break;

    case "a":
      Ant();
      RefreshCanvas()
      break;
    case "v":
      Neumann()
      break;
    default:
  }
});
