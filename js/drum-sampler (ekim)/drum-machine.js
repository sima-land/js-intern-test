document.addEventListener("keypress", (e)=> {
    const keyName = e.key;
    const newKeyName=keyName.toUpperCase()
    let keys= document.querySelectorAll('.key');
    keys.forEach((i)=>{
    if(newKeyName==i.childNodes[1].firstChild.nodeValue){
    showMustGoOn(i.dataset.key,i)
    }
    })

})

function showMustGoOn(dataKey,targetKey){
let dataAudio=[];
let resultKey=dataKey
let keytarget=targetKey
keytarget.classList.add('active')


let sound=document.querySelectorAll('audio');
sound.forEach((i)=>{
dataAudio.push(i.dataset.key)
i.setAttribute('id',i.dataset.key)
})
if(dataAudio.includes(resultKey) ){
    let music=document.getElementById(resultKey)
 
    


    music.play()
    music.addEventListener('ended',()=>{
        keytarget.classList.remove('active')
        
    })
    
    }
    
}
