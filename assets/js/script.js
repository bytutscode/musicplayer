let currentSong = 0;
let isPlaying = false;
let audio = document.querySelector('audio');
let disco = document.querySelector('.disc img');
let musicName = document.querySelector('header');
let volume = document.querySelector('#range-volume');

function updateSong() {
    musicName.innerHTML = `${songs[currentSong].name}`
    audio.setAttribute('src',`midia/${songs[currentSong].src}`);
    disco.setAttribute('src',`midia/${songs[currentSong].img}`);
    if(document.querySelector('.disc').classList.contains('animation')){
        document.querySelector('.disc').classList.remove('animation');
        setTimeout(()=>{
        document.querySelector('.disc').classList.add('animation')
        },032)
    } else {
        document.querySelector('.disc').classList.add('animation');
    }

    if(isPlaying){
        
        document.querySelectorAll('.music').forEach((item,index)=>{

        item.classList.remove('active-music');
        item.querySelector('.music-name').style.color = 'white';

        if(index == (currentSong + 1)){
            item.classList.add('active-music');
            item.querySelector('.music-name').style.color ='black';
        }
    });
        } else {
        document.querySelectorAll('.music').forEach((item,idx)=>{
            item.classList.remove('active-music');
            item.querySelector('.music-name').style.color = 'white';
            if(idx == (currentSong + 1)){
                item.classList.add('active-music');
                item.querySelector('.music-name').style.color ='black';
            }
        });
    };
    
    
}
function update () {
    document.querySelector('#range-music').setAttribute('min',0);
    document.querySelector('#range-music').setAttribute('max', `${audio.duration.toFixed(0)}`);
    document.querySelector('#range-music').value = `${audio.currentTime.toFixed(0)}`;
    document.querySelector('#range-music').style.background = `linear-gradient(to right,var(--header) ${((audio.currentTime * 100)/audio.duration + 1).toFixed(0)}%, white ${((audio.currentTime * 100)/audio.duration+ 1).toFixed(0)}%)`;
    document.querySelector('#range-volume').style.background = `linear-gradient(to right,var(--header) ${document.querySelector('#range-volume').value * 10}%, white ${document.querySelector('#range-volume').value * 10}%)`;
    if(document.querySelector('#range-music').value == audio.duration.toFixed(0)){
        next();
    }
    if(isPlaying){
        audio.play(); 
        document.querySelector('.disc').style.animationPlayState = "running";
    } else {
        audio.pause();
        document.querySelector('.disc').style.animationPlayState = "paused";
    }
    
    
}
setInterval(update,200)
document.querySelector('#range-music').addEventListener('change',()=>{
    audio.currentTime = `${document.querySelector('#range-music').value}`;
});
document.querySelector('#range-volume').addEventListener('change',()=>{
    if(document.querySelector('#range-volume').value == 10){
        audio.volume = 1.0;
    } else {
        audio.volume = `${0}.${parseInt(document.querySelector('#range-volume').value)}`;
    }
    
});

document.querySelector('.musics-button').addEventListener('click',backToMaim);

songs.map((item,index)=>{
    let itemM = document.querySelector('.music').cloneNode(true);
    itemM.querySelector('.music-name').innerHTML = `${item.name}`;
    itemM.querySelector('.music-icon img').setAttribute('src',`midia/${item.img}`);
    document.querySelector('.list').append(itemM);

    itemM.addEventListener('click',()=>{
        document.querySelector('.controls button:nth-child(2)').style.backgroundImage = 'url(assets/icons/pause.webp)';
        currentSong = index;
        updateSong();
        backToMaim();
        isPlaying = true;
    })
}) 

songs.forEach(item => {
   
});
   


update();

function prev () {
    audio.pause()
    audio.currentTime = 0;
    if(currentSong == 0) {
        currentSong = songs.length - 1;
    } else {
        currentSong--;
    }
    updateSong();
    update();
}

function pause () {
    if(isPlaying){
        document.querySelector('.controls button:nth-child(2)').style.backgroundImage = 'url(assets/icons/play.jpg)';
        isPlaying = false;
    } else {
        document.querySelector('.controls button:nth-child(2)').style.backgroundImage = 'url(assets/icons/pause.webp)';
        isPlaying = true;
    }
}

 function next () {
    audio.pause()
    audio.currentTime = 0;
    if(currentSong == songs.length - 1) {
        currentSong = 0;
    } else {
        currentSong++;
    }
    updateSong();
    update();
 }

function backToMaim () {

    if(document.querySelector('.list').style.marginLeft == `0%`){
        document.querySelector('.musics-button').style.backgroundImage = 'url(assets/icons/library.png)';
        document.querySelector('.list').style.marginLeft = `100%`;
    }else{
        document.querySelector('.musics-button').style.backgroundImage = 'url(assets/icons/closer.webp)';
        document.querySelector('.list').style.marginLeft = `0%`;
    }
    
}

updateSong();


