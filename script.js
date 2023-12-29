var board;
var score = 0;
var best = 0;
var rows =4;
var columns =4;

window.onload = function(){
  setGame();
}

function setGame()
{
  let r,c,tile,num;
  board = [
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0]
  ]
  for(r = 0; r < rows; r++)
  {
    for(c = 0; c < columns ; c++)
    {
      tile = document.createElement("div");
      tile.id = r.toString() + "-" + c.toString();
      num = board[r][c];
      updateTile(tile,num);
      document.getElementById("board").append(tile);
    }
  }
  setTwo();
  setTwo();
}

function resetGame() {
  board = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
  ];
  score = 0;
  document.getElementById("board").innerHTML = "";
  setGame();
  setTwo();
  setTwo();
  document.getElementById("score").innerText = score;
}

function hasValidMove() 
{
  for (let r = 0; r < rows; r++) 
  {
    for (let c = 0; c < columns; c++) 
    {
      if (board[r][c] === 0) {
        return true; 
      }

      if (c < columns - 1 && board[r][c] !== 0 && board[r][c] === board[r][c + 1]) 
      {
        return true;
      }

      if (r < rows - 1 && board[r][c] !== 0 && board[r][c] === board[r + 1][c]) 
      {
        return true;
      }
    }
  }

  return false;
}


function hasEmptyTile()
{
  for( let r = 0; r< rows ; r++)
  {
    for( let c = 0; c< columns ; c++)
    {
      if(board[r][c] == 0)
      {
        return true;
      }
    }
  }
  return false;
}
function setTwo()
{
  if (!hasEmptyTile() && !hasValidMove()) {
    alert("Game Over! No more moves available.");
    if(score > best)
    {
      best = score;
      document.getElementById("best").innerText = score;
    } 
    resetGame();
  }
  else if(!hasEmptyTile())
  {
    return;
  }
  let found = false;
  while(!found)
  {
    let r = Math.floor(Math.random()*rows);
    let c = Math.floor(Math.random()*columns);
    if(board[r][c] == 0)
    {
      board[r][c] = 2;
      let tile = document.getElementById(r.toString() + "-" + c.toString());
      tile.innerText = "2";
      tile.classList.add("x2");
      found = true;
    }
  }
}

function updateTile(tile,num)
{
  tile.innerText = "";
  tile.classList.value = "";
  tile.classList.add("tile");
  if(num >0)
  {
    tile.innerText = num;
    if(num <=4096)
    {
      tile.classList.add("x" + num.toString());
    }
    else
    {
      tile.classList.add("x8192");
    }
  }
}

document.addEventListener("keyup", (e) => 
{
  if(e.code == "ArrowLeft")
  {
    slideLeft();
    setTwo();
  }
  else if(e.code == "ArrowRight")
  {
    slideRight();
    setTwo();
  }
  else if(e.code == "ArrowUp")
  {
    slideUp();
    setTwo();
  }
  else if(e.code == "ArrowDown")
  {
    slideDown();
    setTwo();
  }
  document.getElementById("score").innerText = score
})

function filterZero(row)
{
  return row.filter(num => num !=0);
}

function slide(row)
{
  let i;
  row= filterZero(row);
  for(i = 0 ; i < row.length-1 ; i++)
  {
    if(row[i] == row[i+1])
    {
      row[i] *=2;
      row[i+1] =0;
      score += row[i];
    }
  }
  row = filterZero(row);
  while(row.length <columns)
  {
    row.push(0);
  }
  return row;
}
function slideLeft()
{
  let r,c,row,tile,num;
  for(r = 0 ; r < rows ; r++)
  {
    row = board[r];
    row = slide(row);
    board[r]=row;
    for(c = 0 ; c < columns ; c++)
    {
      tile = document.getElementById(r.toString() + "-" + c.toString());
      num = board[r][c];
      updateTile(tile,num);
    }
  }
}

function slideRight()
{
  let r,c,row,tile,num;
  for(r = 0 ; r < rows ; r++)
  {
    row = board[r];
    row.reverse();
    row = slide(row);
    row.reverse();
    board[r]=row;
    for(c = 0 ; c < columns ; c++)
    {
      tile = document.getElementById(r.toString() + "-" + c.toString());
      num = board[r][c];
      updateTile(tile,num);
    }
  }
}

function slideUp() {
  let c, r, tile, num;
  for (c = 0; c < columns; c++) {
    let row = [board[0][c], board[1][c], board[2][c], board[3][c]];
    console.log('row:', row);
    row = slide(row);
    for (r = 0; r < rows; r++) {
      board[r][c] = row[r];
      tile = document.getElementById(r.toString() + "-" + c.toString());
      num = board[r][c];
      updateTile(tile, num);
    }
  }
}

function slideDown() {
  let c, r, tile, num;
  for (c = 0; c < columns; c++) {
    let row = [board[0][c], board[1][c], board[2][c], board[3][c]];
    console.log('row:', row);
    row.reverse();
    row = slide(row);
    row.reverse();
    for (r = 0; r < rows; r++) {
      board[r][c] = row[r];
      tile = document.getElementById(r.toString() + "-" + c.toString());
      num = board[r][c];
      updateTile(tile, num);
    }
  }
}


