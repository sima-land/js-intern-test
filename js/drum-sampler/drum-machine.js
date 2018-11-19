(function () {

  const keys = Object.values(document.getElementsByClassName('key'))
  const audios = Object.values(document.getElementsByTagName('audio'))
  const stopLastEl = document.getElementById('stop-last')

  const toggleStopLastClass = () => {
    if (player.stopLast) {
      stopLastEl.classList.add('pressed')
    } else {
      stopLastEl.classList.remove('pressed')
    }
  }

  const player = {
    currentAudio: null,
    stopLast: true,

    toggleStopLast: () => {
      player.stopLast = !player.stopLast

      toggleStopLastClass()
    },

    sounds: audios.map(audio => {
      const kbd = keys.find(key => key.dataset.key === audio.dataset.key)

      const keyLetter = String.fromCharCode(Number(audio.dataset.key))

      const keyCodes = [
        keyLetter.toLowerCase().charCodeAt(),
        keyLetter.charCodeAt(),
      ]

      return {
        keyCodes,
        kbd,
        audio,
      }
    }, {}),
  }

  document.getElementById('stop-last').addEventListener('click', event => {
    player.toggleStopLast()
  })

  document.addEventListener('keydown', event => {
    const keyCode = event.keyCode || event.which

    const sound = player.sounds.find(sound => sound.keyCodes.indexOf(keyCode) > -1)

    if (sound) {
      sound.kbd.classList.add('pressed')

      if (player.stopLast) {
        if (player.currentAudio) {
          player.currentAudio.pause()
          player.currentAudio.currentTime = 0
        }
      }

      player.currentAudio = sound.audio
      player.currentAudio.ended = () => {
        player.currentAudio = null
      }

      player.currentAudio.play()
    }
  })

  document.addEventListener('keyup', event => {
    const keyCode = event.keyCode || event.which

    const sound = player.sounds.find(sound => sound.keyCodes.indexOf(keyCode) > -1)

    if (sound) {
      sound.kbd.classList.remove('pressed')
    }
  })

  toggleStopLastClass()
})()