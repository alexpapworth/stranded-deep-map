"use strict"

function loadLocalStorage() {
  for (var i = 0; i < document.querySelectorAll('.cell').length; i++) {
    let name = "cell" + document.querySelectorAll('.cell')[i].dataset.cellId
    let value = localStorage.getItem(name)

    document.querySelectorAll('.cell')[i].innerHTML = JSON.parse(value)
  }
}

let ready

ready = function() {
  // Options
  for (var i = 0; i < document.querySelectorAll('.option').length; i++) {
    document.querySelectorAll('.option')[i].addEventListener('click', selectOptionToAddToTile)
  }

  // Load data from localStorage
  loadLocalStorage()

  // Move arrows
  document.querySelector('.arrow.up').addEventListener('click', moveUp)
  document.querySelector('.arrow.right').addEventListener('click', moveRight)
  document.querySelector('.arrow.down').addEventListener('click', moveDown)
  document.querySelector('.arrow.left').addEventListener('click', moveLeft)
}

document.addEventListener('DOMContentLoaded', ready)
