const audios = [...document.getElementsByTagName("audio")]
const plates = [...document.querySelectorAll(".key")]
const keys = plates.map(plate => plate.dataset.key)

window.addEventListener("keydown", playMisic)

function playMisic(event) {
  const keyCode = event.keyCode.toString()
  if(keys.indexOf(keyCode) === -1) return

  audios.forEach(audio => {audio.load()})
  const audioToPlay = audios.find(audio => audio.dataset.key === keyCode)
  audioToPlay.play()
  
  plates.forEach(plate => {plate.classList.remove("playing")})
  const plateToShow = plates.find(plate => plate.dataset.key === keyCode)
  plateToShow.classList.add("playing")
}
