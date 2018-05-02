"use strict";
$(function(){
  var currentKeyCode;
  var key;
  var keyToResize;
  var audioToPlay;
  var playingAudio;
  var tmr;

  prepareDoc();
  prepareVars();

  // по готовности документа прикрепляем обработчики
  function prepareDoc() {
    attachEvents();
  }

  // нам нужна одна переменная типа Audio, с ней мы будем манипулировать, проигрывая звуки
  function prepareVars() {
    playingAudio = new Audio();
  }

  // привязываем события для страницы
  function attachEvents() {
    $('body').on('keydown', keyWork);
  }

  // основная работа с клавишами, получение кода клавиши, запуск озвучки и ресайза
  function keyWork(event) {
    event.preventDefault();
    key = getKeyCode(event);
    if (key) {
    getKeyElement(key);
    getAudioElement(key);
      if (audioToPlay.length > 0) {
        playCurrentSound();
      }
      if (keyToResize.length > 0) {
        resizeCurrentKey();
      }
    }
  }

  // получаем код нажатой клавиши кроссбраузерно
  function getKeyCode(event) {
    if (event.which == null) { // IE
      if (event.keyCode < 32) { return null; } // спец. символ
      return parseInt(event.keyCode)
    }
  
    if (event.which != 0) { // все кроме IE
      if (event.which < 32) return null; // спец. символ
      return parseInt(event.which); // остальные
    }
  }

  // находим элемент на странице с нужным data-key
  function getKeyElement(key) {
    keyToResize = $('[data-key='+key+']', '.keys');
  }

  // находим в каком тэге audio у нас хранится нужный звук
  function getAudioElement(key) {
    audioToPlay = $('audio[data-key='+key+']');
  }

  // стопим звук, который проигрывается в данный момент и запускаем проигрывание нажатого
  function playCurrentSound() {
    if (playingAudio.src != '') {
      playingAudio.pause();
      playingAudio.currentTime = 0;
    }
    playingAudio.src = audioToPlay.attr('src');

    var playPromise = playingAudio.play();
    
    if (playPromise !== undefined) {
      playPromise.then(_ => {
        // Если у нас все хорошо с загрузкой контента для проигрывания, то играем
        playingAudio.play();
      })
      .catch(error => {
        // Если не успевает прогрузить контент, чтобы ошибка не вылезала в консоль, обрабатываем ее
        console.log(error);
      });
    }
  }

  // изменяем размер клавиши
  function resizeCurrentKey() {
    var currentKey = keyToResize;
    // надеюсь ваш класс playing - это именно про увеличение клавиши (про крайней мере, тут я именно эту часть задания делал)
    currentKey.addClass('playing');
    tmr = window.setTimeout(function() { currentKey.removeClass('playing'); }, 100);
  }
});