function updateLocalStorage(temporaryArray) {
  for (var i = 0; i < temporaryArray.length; i++) {
    let name = Object.keys(temporaryArray[i])[0]
    let value = temporaryArray[i][name]

    localStorage.setItem(name, value)
  }
}

function expand(moveNumber) {
  var temporaryArray = []
  
  for (var i = 0; i < localStorage.length; i++) {
    let name = localStorage.key(i)
    let value = localStorage.getItem(name)

    if (name.includes("cell")) {
      let cellId = parseInt(name.substring(4))

      let newCellId = cellId + moveNumber

      let newName = "cell" + newCellId

      let object = {[newName]: value}
      temporaryArray.push(object)

      localStorage.removeItem(name)
      console.log("expand: changing "+name+" for "+newName)
    }
  }
  
  updateLocalStorage(temporaryArray)
}

function reduce(tiles, paddingNumber) {
  var temporaryArray = []
  
  for (var i = 0; i < tiles.length; i++) {
    let cellId = tiles[i]
    let name = "cell" + cellId
    let value = localStorage.getItem(name)

    if (value) {
      let newCellId = cellId + paddingNumber
      let newName = "cell" + newCellId

      let object = {[newName]: value}
      temporaryArray.push(object)

      localStorage.removeItem(name)
      console.log("reduce: changing "+name+" for "+newName+" (difference: "+(newCellId - cellId))
    }
  }
  
  updateLocalStorage(temporaryArray)
}

function moveUp() {
  console.log("moving up")
  let tiles = [
    1,  2,  3,  4,  5, 
    6,  7,  8,  9,  10, 
    11, 12, 13, 14, 15, 
    16, 17, 18, 19, 20,
    21, 22, 23, 24, 25, 
  ]

  let moveNumber = -105
  let paddingNumber = 100

  reduce(tiles, paddingNumber)
  expand(moveNumber)

  loadLocalStorage()
}

function moveRight() {
  console.log("moving right\n")
  let tiles = [
    1,  2,  3,  4,  /* 5, */
    6,  7,  8,  9,  /* 10, */
    11, 12, 13, 14, /* 15, */
    16, 17, 18, 19, /* 20,*/
    21, 22, 23, 24, /* 25, */
  ]

  let moveNumber = 101
  let paddingNumber = -100

  reduce(tiles, paddingNumber)
  expand(moveNumber)

  loadLocalStorage()
}

function moveDown() {
  console.log("moving down")
  let tiles = [
    1,  2,  3,  4,  5, 
    6,  7,  8,  9,  10, 
    11, 12, 13, 14, 15, 
    16, 17, 18, 19, 20,
    21, 22, 23, 24, 25, 
  ]

  let extraTiles = [
    201, 202, 203, 204, 205, 
  ]

  let moveNumber = 105
  let paddingNumber = -100

  reduce(tiles, paddingNumber)
  expand(moveNumber)

  loadLocalStorage()
}

function moveLeft() {
  console.log("moving left")
  let tiles = [
    /*1, */  2,  3,  4,  5, 
    /*6, */  7,  8,  9,  10, 
    /*11, */ 12, 13, 14, 15, 
    /*16, */ 17, 18, 19, 20,
    /*21, */ 22, 23, 24, 25, 
  ]

  let moveNumber = -101
  let paddingNumber = 100

  reduce(tiles, paddingNumber)
  expand(moveNumber)

  loadLocalStorage()
}

// Whelp, this is pretty close, but only works for one layer of off-screen
// Need to work out a different way where we add 100 for right and down, 
// but minus 100 for left and up. They then need different rules depending on
// if they're on the screen or not. Guess the padding it needed, but have to
// sit down and draw it to get it right