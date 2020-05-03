"use strict"

function selectOptionToAddToTile() {
  if (document.querySelector('.option.selected')) {
    unselectOption.call(document.querySelector('.option.selected'))
  }

  this.removeEventListener('click', selectOptionToAddToTile)
  this.addEventListener('click', unselectOption)

  this.classList.add('selected')

  prepareTilesForClicking()
}

function unselectOption() {
  this.removeEventListener('click', unselectOption)
  this.addEventListener('click', selectOptionToAddToTile)

  let option = this.innerText
  this.classList.remove('selected')

  unprepareTilesForClicking()
}

function prepareTilesForClicking() {
  for (var i = 0; i < document.querySelectorAll('.cell').length; i++) {
    document.querySelectorAll('.cell')[i].classList.add('clickable')
    document.querySelectorAll('.cell')[i].addEventListener('click', appendOptionToTile)
  }
}

function unprepareTilesForClicking() {
  for (var i = 0; i < document.querySelectorAll('.cell').length; i++) {
    document.querySelectorAll('.cell')[i].classList.remove('clickable')
  }
}

function appendOptionToTile() {
  let option = document.querySelector('.option.selected').innerText
  this.innerText = this.innerText + "\n" + option

  let name = "cell" + this.dataset.cellId
  let value = JSON.stringify(this.innerText);

  localStorage.setItem(name, value);
  console.log(localStorage)
}

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
