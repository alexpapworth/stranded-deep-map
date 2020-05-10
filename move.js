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

function reduce(tiles) {
  var temporaryArray = []
  
  for (var i = 0; i < tiles.length; i++) {
    let cellId = tiles[i]
    let name = "cell" + cellId
    let value = localStorage.getItem(name)

    if (value) {
      let newCellId = cellId - 100
      let newName = "cell" + newCellId

      let object = {[newName]: value}
      temporaryArray.push(object)

      localStorage.removeItem(name)
      console.log("reduce: changing "+name+" for "+newName)
    }
  }
  
  updateLocalStorage(temporaryArray)
}

function reduceExtra(tiles) {
  var temporaryArray = []
  
  for (var i = 0; i < tiles.length; i++) {
    let cellId = tiles[i]
    let name = "cell" + cellId
    let value = localStorage.getItem(name)

    if (value) {
      let newCellId = cellId - 200
      let newName = "cell" + newCellId

      let object = {[newName]: value}
      temporaryArray.push(object)

      localStorage.removeItem(name)
      console.log("reduce extra: changing "+name+" for "+newName)
    }
  }
  
  updateLocalStorage(temporaryArray)
}

function moveUp() {
  let tiles = [
     101, 102, 103, 104, 105,
     106, 107, 108, 109, 110,
     111, 112, 113, 114, 115,
     116, 117, 118, 119, 120,
     // 121, 122, 123, 124, 125 
  ]

  let extraTiles = [
     221, 222, 223, 224, 225
  ]

  let moveNumber = 95

  expand(moveNumber)
  reduce(tiles)
  reduceExtra(extraTiles)

  loadLocalStorage()
}

function moveRight() {
  let tiles = [
    /* 101, */ 102, 103, 104, 105,
    /* 106, */ 107, 108, 109, 110,
    /* 111, */ 112, 113, 114, 115,
    /* 116, */ 117, 118, 119, 120,
    /* 121, */ 122, 123, 124, 125
  ]

  let extraTiles = [
    201,
    206,
    211,
    216,
    221
  ]

  let moveNumber = 101

  expand(moveNumber)
  reduce(tiles)
  reduceExtra(extraTiles)

  loadLocalStorage()
}

function moveDown() {
  let tiles = [
    // 101, 102, 103, 104, 105
    106, 107, 108, 109, 110,
    111, 112, 113, 114, 115,
    116, 117, 118, 119, 120,
    121, 122, 123, 124, 125
  ]

  let extraTiles = [
    201, 202, 203, 204, 205, 
  ]

  let moveNumber = 105

  expand(moveNumber)
  reduce(tiles)
  reduceExtra(extraTiles)

  loadLocalStorage()
}

function moveLeft() {
  let tiles = [
    101, 102, 103, 104, /* 105, */
    106, 107, 108, 109, /* 110, */
    111, 112, 113, 114, /* 115, */
    116, 117, 118, 119, /* 120, */
    121, 122, 123, 124, /* 125  */
  ]

  let extraTiles = [
    205, 
    210, 
    215, 
    220, 
    225
  ]

  let moveNumber = 99

  expand(moveNumber)
  reduce(tiles)
  reduceExtra(extraTiles)

  loadLocalStorage()
}

// Whelp, this is pretty close, but only works for one layer of off-screen
// Need to work out a different way where we add 100 for right and down, 
// but minus 100 for left and up. They then need different rules depending on
// if they're on the screen or not. Guess the padding it needed, but have to
// sit down and draw it to get it right