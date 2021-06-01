//Generating the scene
const div = document.querySelector("#gameArea");
localName = localStorage.getItem("name");
const goal = document.querySelector("#goal");
const greetingText = document.querySelector("#greeting");
function homeScreenGeneration()
{
    goal.innerHTML = "";
    div.innerHTML = "";
    greetingText.innerHTML = "";
    if(localName == null)
        div.innerHTML  = div.innerHTML + "<div id='input_fields'><p id = 'nameText'><b>NAME: </b></p><input type='text' id = 'name_input_field' placeholder='Enter your Name'><br><br><input type = 'button' value='EASY LEVEL' onclick='startGameEasy()' id = 'button'><br><br><input type = 'button' value='HARD LEVEL' onclick='startGameHard()' id = 'button'><br><br><input type = 'button' value='RESET SCORES' onclick='resetHighScore()' id = 'button'><p id='errorText'></p></div>";
    else
        div.innerHTML = div.innerHTML + "<div id='input_fields'<p id = 'nameText'>Welcome, " + localName + "</p><br><br><input type = 'button' value='EASY LEVEL' onclick='startGameEasy()' id = 'button'><br><br><input type = 'button' value='HARD LEVEL' onclick='startGameHard()' id = 'button'><br><br><input type = 'button' value='RESET SCORES' onclick='resetHighScore()' id = 'button'><br><br><input type = 'button' value='RESET NAME' onclick='resetName()' id = 'button'><p id='errorText'></p></div>";
}
homeScreenGeneration();
//Getting the values
empX = Math.floor(Math.random()*5)
empY = Math.floor(Math.random()*5)
const colors = ["Red", "Blue", "Cyan","Pink", "Green"];
emptyCoordinates = "b" + empY.toString() + empX.toString();

const moveSound = document.querySelector("#moves");
const inputName = document.querySelector("#name_input_field");
const errorText = document.querySelector("#errorText");

const buttonArea = document.querySelector("#mobileButtons");
won = false;
gamebegan = false;
moves = 0;

const amount = 200;

function Greet()
{
    greetingText.innerHTML = "Hello "+localName;
}
function startGameEasy()
{
    if(inputName != null && inputName.value == "") 
    {
        errorText.innerHTML = "ENTER A NAME";
        return;
    }
    if(inputName != null)
    {
        localName = inputName.value;
        localStorage.setItem("name", inputName.value);
    }    
    Greet();
    const inputFields = document.querySelector("#input_fields");
    inputFields.innerHTML = "";
    div.innerHTML = div.innerHTML + "<h2>YOUR PUZZLE:</h2>";
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
    div.innerHTML += "<br><input type = 'button' value = 'BACK' onclick = 'homeScreenGeneration()' id = 'button'>";
    gameManageEasy();
}



const intro = document.querySelector("#intro");
function gameManageEasy()
{
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
        moveSound.play();
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
        moveSound.play();
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
        moveSound.play();
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
        moveSound.play();
        winCheck();
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
    moveRand = Math.floor(Math.round()*4);
    moveCount = Math.floor(Math.round()*5)+1;
    if(moveRand == 0)
        for(i=0; i<moveCount; i++)    
            moveUp();
    if(moveRand == 1)
        for(i=0; i<moveCount; i++)          
            moveDown();
    if(moveRand == 2)
        for(i=0; i<moveCount; i++)        
            moveLeft();
    if(moveRand == 3)
        for(i=0; i<moveCount; i++)    
            moveRight();
    count++;
    }while(count<=amount);
    gamebegan = true;
    //DISPLAYING THE TARGET POSITION
    goal.innerHTML = goal.innerHTML + "<h2>GOAL:</h2>";
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
        div.innerHTML = "";
        goal.innerHTML = "";

        highScore = localStorage.getItem("highScore");
        if(highScore == null)
        {
            localStorage.setItem("highScore", moves.toString());
            localStorage.setItem("highScoreOwner", localName);
        }
        if(moves<parseInt(highScore))
        {
            localStorage.setItem("highScore", moves.toString());
            highScore = localStorage.getItem("highScore");
            localStorage.setItem("highScoreOwner",localName);
        }
            
        
        intro.play();
        const victory = document.querySelector("#victoryArea");
        if(highScore!=null)
        {
            victory.innerHTML = "<h1>You WON THE GAME!!!</h1><p1>You used "+moves.toString()+" moves to win<br>HIGH SCORE: "+highScore.toString() + " by "+localStorage.getItem("highScoreOwner");
        }            
        else
        {
            victory.innerHTML = "<h1>You WON THE GAME!!!</h1><p1>You used "+moves.toString()+" moves to win<br>HIGH SCORE: "+moves.toString()+" by "+localName;
        }
            
    
            victory.innerHTML = victory.innerHTML + "<br><br><input type = 'button' value = 'retry?' onclick = 'reloadPage()' id = 'button'>"
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
}


function resetHighScore()
{
    localStorage.removeItem("highScore");
    localStorage.removeItem("highScoreHard");
    localStorage.removeItem("highScoreHardOwner");
}
function resetName()
{
    localStorage.removeItem("name");
    location.reload();
}
function reloadPage()
{
    location.reload();
}






function startGameHard()
{
    if(inputName != null && inputName.value == "") 
    {
        errorText.innerHTML = "ENTER A NAME";
        return;
    }
    if(inputName != null)
    {
        localName = inputName.value;
        localStorage.setItem("name", inputName.value);
    }    
    Greet();
    const inputFields = document.querySelector("#input_fields");
    inputFields.innerHTML = "";
    div.innerHTML = div.innerHTML + "<h2>YOUR PUZZLE:</h2>";
    for(i = 0; i < 6; i++)
    {
        for( j=0; j<6; j++)
            div.innerHTML = div.innerHTML + "<button id = 'tiles' class = b" + i.toString() + j.toString() + "></button>";
        div.innerHTML += "<br>";
    }

//ASSIGNING COLORS
    for(i = 0; i < 6; i++)
    {
        for( j=0; j<6; j++)
        {
            index = Math.floor(Math.random()*4);
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
    div.innerHTML += "<br><input type = 'button' value = 'BACK' onclick = 'homeScreenGeneration()' id = 'button'>";
    gameManageHard();
}
function gameManageHard()
{
    //MOVEMENT SCRIPTS
    function moveRight()
    {
        if(empX == 5) return;
        refColor = document.querySelector(".b"+(empY)+(empX+1)).style.backgroundColor;
        const button1 = document.querySelector("."+emptyCoordinates).style.backgroundColor = refColor;
        empX++;
        emptyCoordinates = "b"+empY+empX;
        const button2 = document.querySelector("."+emptyCoordinates);
        button2.style.backgroundColor = "Grey";
        moves++;
        moveSound.play();
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
        moveSound.play();
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
        moveSound.play();
        winCheck()
    }
    function moveDown()
    {
        if(empY == 5) return;
        refColor = document.querySelector(".b"+(empY+1)+(empX)).style.backgroundColor;
        const button1 = document.querySelector("."+emptyCoordinates).style.backgroundColor = refColor;
        empY++;
        emptyCoordinates = "b"+empY+empX;
        const button2 = document.querySelector("."+emptyCoordinates);
        button2.style.backgroundColor = "Grey";
        moves++;
        moveSound.play();
        winCheck();
    }
    //INITIAL STATE
    const c11 = document.querySelector(".b11").style.backgroundColor;
    const c12 = document.querySelector(".b12").style.backgroundColor;
    const c13 = document.querySelector(".b13").style.backgroundColor;
    const c14 = document.querySelector(".b14").style.backgroundColor;
    const c21 = document.querySelector(".b22").style.backgroundColor;
    const c22 = document.querySelector(".b22").style.backgroundColor;
    const c23 = document.querySelector(".b23").style.backgroundColor;
    const c24 = document.querySelector(".b24").style.backgroundColor;
    const c31 = document.querySelector(".b31").style.backgroundColor;
    const c32 = document.querySelector(".b32").style.backgroundColor;
    const c33 = document.querySelector(".b33").style.backgroundColor;
    const c34 = document.querySelector(".b34").style.backgroundColor;
    const c41 = document.querySelector(".b41").style.backgroundColor;
    const c42 = document.querySelector(".b42").style.backgroundColor;
    const c43 = document.querySelector(".b43").style.backgroundColor;
    const c44 = document.querySelector(".b44").style.backgroundColor;
    //SHUFFLING THE BOARD
    count = 0;
    do
    {
    moveRand = Math.floor(Math.round()*5);
    moveCount = Math.floor(Math.round()*6)+1;
    if(moveRand == 0)
        for(i=0; i<moveCount; i++)    
            moveUp();
    if(moveRand == 1)
        for(i=0; i<moveCount; i++)          
            moveDown();
    if(moveRand == 2)
        for(i=0; i<moveCount; i++)        
            moveLeft();
    if(moveRand == 3)
        for(i=0; i<moveCount; i++)    
            moveRight();
    count++;
    }while(count<=amount*2);
    gamebegan = true;
    //DISPLAYING THE TARGET POSITION
    goal.innerHTML = goal.innerHTML + "<h2>GOAL:</h2>";
    for(i = 0; i < 4; i++)
    {
    for( j=0; j<4; j++)
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
    //04
    const t14 = document.querySelector(".t03");
    t14.style.backgroundColor = c14;
    //10
    const t21 = document.querySelector(".t10");
    t21.style.backgroundColor = c21;
    //11
    const t22 = document.querySelector(".t11");
    t22.style.backgroundColor = c22;
    //12
    const t23 = document.querySelector(".t12");
    t23.style.backgroundColor = c23;
    //14
    const t24 = document.querySelector(".t13");
    t24.style.backgroundColor = c24;
    //20
    const t31 = document.querySelector(".t20");
    t31.style.backgroundColor = c31;
    //21
    const t32 = document.querySelector(".t21");
    t32.style.backgroundColor = c32;
    const t33 = document.querySelector(".t22");
    t33.style.backgroundColor = c33;
    //24
    const t34 = document.querySelector(".t23");
    t34.style.backgroundColor = c34;
    //40
    const t41 = document.querySelector(".t30");
    t41.style.backgroundColor = c41;
    //04
    const t42 = document.querySelector(".t31");
    t42.style.backgroundColor = c42;
    //04    
    const t43 = document.querySelector(".t32");
    t43.style.backgroundColor = c43;
    //04
    const t44 = document.querySelector(".t33");
    t44.style.backgroundColor = c44;

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
        div.innerHTML = "";
        goal.innerHTML = "";

        highScore = localStorage.getItem("highScoreHard");
        if(highScore == null)
        {
            localStorage.setItem("highScoreHard", moves.toString());
            localStorage.setItem("highScoreHardOwner", localName);
        }
        if(moves<parseInt(highScore))
        {
            localStorage.setItem("highScoreHard", moves.toString());
            localStorage.setItem("highScoreHardOwner", localName);
            highScore = localStorage.getItem("highScoreHard");
        }
            
        
        intro.play();
        const victory = document.querySelector("#victoryArea");
        if(highScore!=null)
            victory.innerHTML = "<h1>You WON THE GAME!!!</h1><p1>You used "+moves.toString()+" moves to win<br>HIGH SCORE: "+highScore.toString()+"by"+localStorage.getItem("highScoreHardOwner");
        else
            victory.innerHTML = "<h1>You WON THE GAME!!!</h1><p1>You used "+moves.toString()+" moves to win<br>HIGH SCORE: "+moves.toString()+" by "+localName;

        victory.innerHTML = victory.innerHTML + "<br><br><input type = 'button' value = 'retry?' onclick = 'reloadPage()' id = 'button'>"
    }
    function winCheck()
    {

        if(!gamebegan) return;
        m11 = document.querySelector(".b11").style.backgroundColor;
        m12 = document.querySelector(".b12").style.backgroundColor;
        m13 = document.querySelector(".b13").style.backgroundColor;
        m14 = document.querySelector(".b14").style.backgroundColor;
        m21 = document.querySelector(".b21").style.backgroundColor;
        m22 = document.querySelector(".b22").style.backgroundColor;
        m23 = document.querySelector(".b23").style.backgroundColor;
        m24 = document.querySelector(".b24").style.backgroundColor;
        m31 = document.querySelector(".b31").style.backgroundColor;
        m32 = document.querySelector(".b32").style.backgroundColor;
        m33 = document.querySelector(".b33").style.backgroundColor;
        m34 = document.querySelector(".b34").style.backgroundColor;
        m41 = document.querySelector(".b41").style.backgroundColor;
        m42 = document.querySelector(".b42").style.backgroundColor;
        m43 = document.querySelector(".b43").style.backgroundColor;
        m44 = document.querySelector(".b44").style.backgroundColor;

        if((m11==c11)&&(m12==c12)&&(m13==c13)&&(m21==c21)&&(m22==c22)&&(m23==c23)&&(m31==c31)&&(m32==c32)&&(m14==c14)&&(m24==c24)&&(m34==c34)&&(m41==c41)&&(m42==c42)&&(m43==c43)&&(m44==c44))
        {
            won = true;
            gamebegan = false;
            wonthegame();
        }    
    }
}
