empX = Math.floor(Math.random()*5)
empY = Math.floor(Math.random()*5)
colors = ["Red", "Blue", "Cyan","Pink", "Green"];
emptyCoordinates = "b" + empY.toString() + empX.toString();
const div = document.querySelector("#gameArea");
const goal = document.querySelector("#goal");
won = false;
gamebegan = false;

moves = 0;

//MOVEMENT SCRIPTS
function moveRight()
{
    if(empX == 4) return;
    refColor = document.querySelector(".b"+(empY)+(empX+1)).style.backgroundColor;
    const button1 = document.querySelector("."+emptyCoordinates).style.backgroundColor = refColor;
    empX++;
    emptyCoordinates = "b"+empY+empX;
    const button2 = document.querySelector("."+emptyCoordinates);
    button2.style.backgroundColor = "Grey";
    moves++;
    winCheck()
}
function moveLeft()
{
    if(empX == 0) return;
    refColor = document.querySelector(".b"+(empY)+(empX-1)).style.backgroundColor;
    const button1 = document.querySelector("."+emptyCoordinates).style.backgroundColor = refColor;
    empX--;
    emptyCoordinates = "b"+empY+empX;
    const button2 = document.querySelector("."+emptyCoordinates);
    button2.style.backgroundColor = "Grey";
    moves++;
    winCheck()
}
function moveUp()
{
    if(empY == 0) return;
    refColor = document.querySelector(".b"+(empY-1)+(empX)).style.backgroundColor;
    const button1 = document.querySelector("."+emptyCoordinates).style.backgroundColor = refColor;
    empY--;
    emptyCoordinates = "b"+empY+empX;
    const button2 = document.querySelector("."+emptyCoordinates);
    button2.style.backgroundColor = "Grey";
    moves++;
    winCheck()
}
function moveDown()
{
    if(empY == 4) return;
    refColor = document.querySelector(".b"+(empY+1)+(empX)).style.backgroundColor;
    const button1 = document.querySelector("."+emptyCoordinates).style.backgroundColor = refColor;
    empY++;
    emptyCoordinates = "b"+empY+empX;
    const button2 = document.querySelector("."+emptyCoordinates);
    button2.style.backgroundColor = "Grey";
    moves++;
    winCheck();
}

//SPAWNING MAP
for(i = 0; i < 5; i++)
{
    for( j=0; j<5; j++)
        div.innerHTML = div.innerHTML + "<button id = 'tiles' class = b" + i.toString() + j.toString() + "></button>";
    div.innerHTML += "<br>";
}
//ASSIGNING COLORS
for(i = 0; i < 5; i++)
{
    for( j=0; j<5; j++)
    {
        index = Math.floor(Math.random()*5);
        classIndex = "b" + i.toString() + j.toString();
        if(classIndex != emptyCoordinates)
        {
            const button = document.querySelector("."+classIndex);
            button.style.backgroundColor = colors[index];
        }
        else
        {
            const button = document.querySelector("."+classIndex);
            button.style.backgroundColor = "Grey";
        }
    }
}
//INITIAL STATE
const c11 = document.querySelector(".b11").style.backgroundColor;
const c12 = document.querySelector(".b12").style.backgroundColor;
const c13 = document.querySelector(".b13").style.backgroundColor;
const c21 = document.querySelector(".b22").style.backgroundColor;
const c22 = document.querySelector(".b22").style.backgroundColor;
const c23 = document.querySelector(".b23").style.backgroundColor;
const c31 = document.querySelector(".b31").style.backgroundColor;
const c32 = document.querySelector(".b32").style.backgroundColor;
const c33 = document.querySelector(".b33").style.backgroundColor;
//SHUFFLING THE BOARD
count = 0;
do
{
    moveRand = Math.floor(Math.round()*4)
    if(moveRand == 0)
        moveUp();
    if(moveRand == 1)
        moveDown();
    if(moveRand == 2)
        moveLeft();
    if(moveRand == 3)
        moveRight();
    count++;
}while(count<=100);
gamebegan = true;
//DISPLAYING THE TARGET POSITION
for(i = 0; i < 3; i++)
{
    for( j=0; j<3; j++)
        goal.innerHTML = goal.innerHTML + "<button id = 'tiles' class = t" + i.toString() + j.toString() + "></button>";
    goal.innerHTML += "<br>";
}
//00
const t11 = document.querySelector(".t00");
t11.style.backgroundColor = c11;
//01
const t12 = document.querySelector(".t01");
t12.style.backgroundColor = c12;
//02
const t13 = document.querySelector(".t02");
t13.style.backgroundColor = c13;
//10
const t21 = document.querySelector(".t10");
t21.style.backgroundColor = c21;
//11
const t22 = document.querySelector(".t11");
t22.style.backgroundColor = c22;
//12
const t23 = document.querySelector(".t12");
t23.style.backgroundColor = c23;
//20
const t31 = document.querySelector(".t20");
t31.style.backgroundColor = c31;
//21
const t32 = document.querySelector(".t21");
t32.style.backgroundColor = c32;
const t33 = document.querySelector(".t22");
t33.style.backgroundColor = c33;

//CHECKING FOR KEYBOARD INPUTS
document.addEventListener("keydown", function(event)
{
    if(won) return;
    if(!gamebegan) return;
    if(event.code == 'ArrowRight')
    {
        moveRight();
    }
    if(event.code == 'ArrowLeft')
    {
        moveLeft();
    }
    if(event.code == 'ArrowUp')
    {
        moveUp();
    }
    if(event.code == 'ArrowDown')
    {
        moveDown();
    }
})
function wonthegame()
{
    const victory = document.querySelector("#victoryArea");
    victory.innerHTML = "<h1>You WON THE GAME!!!</h1><p1>You used "+moves.toString()+" moves to win";
}
function winCheck()
{
    if(!gamebegan) return;
    m11 = document.querySelector(".b11").style.backgroundColor;
    m12 = document.querySelector(".b12").style.backgroundColor;
    m13 = document.querySelector(".b13").style.backgroundColor;
    m21 = document.querySelector(".b21").style.backgroundColor;
    m22 = document.querySelector(".b22").style.backgroundColor;
    m23 = document.querySelector(".b23").style.backgroundColor;
    m31 = document.querySelector(".b31").style.backgroundColor;
    m32 = document.querySelector(".b32").style.backgroundColor;
    m33 = document.querySelector(".b33").style.backgroundColor;

    if((m11==c11)&&(m12==c12)&&(m13==c13)&&(m21==c21)&&(m22==c22)&&(m23==c23)&&(m31==c31)&&(m32==c32)&&(m33==c33))
    {
        won = true;
        gamebegan = false;
        wonthegame();
    }    
}

