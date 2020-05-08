function selectOptionToAddToTile() {
  if (document.querySelector('.option.selected')) {
    unselectOption.call(document.querySelector('.option.selected'))
  }

  this.removeEventListener('click', selectOptionToAddToTile)
  this.addEventListener('click', unselectOption)

  this.classList.add('selected')

  if (this.innerText == "Clear Tile") {
    prepareTilesForClearing()
  }
  else {
    let once;

    if (this.classList.contains('big-option')) {
      once = true
    }
    else {
      once = false
    }

    console.log(once)

    prepareTilesForClicking(once)
  }

}

function unselectOption() {
  this.removeEventListener('click', unselectOption)
  this.addEventListener('click', selectOptionToAddToTile)

  let option = this.innerText
  this.classList.remove('selected')

  if (this.innerText == "Clear Tile") {
    unprepareTilesForClearing()
  }
  else {
    unprepareTilesForClicking()
  }
}

function prepareTilesForClicking(once) {
  for (var i = 0; i < document.querySelectorAll('.cell').length; i++) {
    document.querySelectorAll('.cell')[i].classList.add('clickable')
    console.log(once)
    if (once == true) {
      document.querySelectorAll('.cell')[i].addEventListener('click', appendOptionToTileOnce)
    }
    else {
      document.querySelectorAll('.cell')[i].addEventListener('click', appendOptionToTile)
    }
  }
}

function unprepareTilesForClicking() {
  for (var i = 0; i < document.querySelectorAll('.cell').length; i++) {
    document.querySelectorAll('.cell')[i].classList.remove('clickable')
    document.querySelectorAll('.cell')[i].removeEventListener('click', appendOptionToTile)
    document.querySelectorAll('.cell')[i].removeEventListener('click', appendOptionToTileOnce)
  }
}

function prepareTilesForClearing() {
  for (var i = 0; i < document.querySelectorAll('.cell').length; i++) {
    document.querySelectorAll('.cell')[i].classList.add('clickable')
    document.querySelectorAll('.cell')[i].classList.add('red')
    document.querySelectorAll('.cell')[i].addEventListener('click', clearTile)
  }
}

function unprepareTilesForClearing() {
  for (var i = 0; i < document.querySelectorAll('.cell').length; i++) {
    document.querySelectorAll('.cell')[i].classList.remove('clickable')
    document.querySelectorAll('.cell')[i].classList.remove('red')
    document.querySelectorAll('.cell')[i].removeEventListener('click', clearTile)
  }
}

function appendOptionToTile() {
  let option = document.querySelector('.option.selected').innerText
  this.innerText = this.innerText + "\n" + option

  let name = "cell" + this.dataset.cellId
  let value = JSON.stringify(this.innerText);

  localStorage.setItem(name, value);
}

function appendOptionToTileOnce() {
  appendOptionToTile.call(this)

  unselectOption.call(document.querySelector('.option.selected'))
}


function clearTile() {
  this.innerText = ""

  let name = "cell" + this.dataset.cellId
  let value = JSON.stringify("");

  localStorage.setItem(name, value);
}