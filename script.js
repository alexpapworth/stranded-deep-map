"use strict"

let ready

ready = function() {
  for (var i = 0; i < document.querySelectorAll('.option').length; i++) {
    document.querySelectorAll('.option')[i].addEventListener('click', selectOptionToAddToTile)
  }

  for (var i = 0; i < document.querySelectorAll('.cell').length; i++) {
    let name = "cell" + document.querySelectorAll('.cell')[i].dataset.cellId
    let value = localStorage.getItem(name)

    document.querySelectorAll('.cell')[i].innerHTML = JSON.parse(value)
  }
}

document.addEventListener('DOMContentLoaded', ready)
