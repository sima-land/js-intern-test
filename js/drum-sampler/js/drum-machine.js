"use strict";
$(function(){
  var currentKeyCode;
  var key;
  var keyToResize;
  var audioLink;
  var playingAudio;
  var audioArr;
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
    audioArr = prepareAudioArr();
  }

  // привязываем события для страницы
  function attachEvents() {
    $('body').on('keydown', keyWork);
  }

  // готовим массив ссылок на audio и связанных с ними ключей 
  function prepareAudioArr() {
    var allAudioElems = $('audio');
    var arr = new Array();
    allAudioElems.each(function() {
      arr.push({ key: $(this).data('key'), src: $(this).attr('src') });
    });
    return arr;
  }
  
  // основная работа с клавишами, получение кода клавиши, запуск озвучки и ресайза
  function keyWork(event) {
    event.preventDefault();
    key = getKeyCode(event);
    if (key) {
    getKeyElement(key);
    getAudioLink(key);
      if (audioLink) {
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
  function getAudioLink(key) {
    var link;
    $(audioArr).each(function() {
      if (this.key == key) {
        audioLink = this.src;
        return false;
      }
    });
  }

  // стопим звук, который проигрывается в данный момент и запускаем проигрывание нажатого
  function playCurrentSound() {
    if (playingAudio.src != '') {
      playingAudio.pause();
      playingAudio.currentTime = 0;
    }
    playingAudio.src = audioLink;

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