const musicContainer=document.querySelector('.music-container')
const playBtn=document.querySelector('#play')
const prevBtn=document.querySelector('#prev')
const nextBtn=document.querySelector('#next')
const audio=document.querySelector('#audio')
const progress=document.querySelector('.progress')
const progressContainer=document.querySelector('.progress-container')
const title=document.querySelector('#title')
const cover=document.querySelector('#cover')

//song titles
const songs=['Masquerade','Jazz Joe','Suspesenful Third Day','Metal Xenon','Aventyr']

//keep track of songs
let songIndex=0

//initially load song info DOM
loadSong(songs[songIndex])

// update song details
function loadSong(song){
	title.innerText=song
	audio.src=`data/${song}.mp3`
	cover.src=`images/${song}.jpg`
}

function playSong(){
	musicContainer.classList.add('play')
	// bat tat
	playBtn.querySelector('i.fas').classList.remove('fa-play')
	playBtn.querySelector('i.fas').classList.add('fa-pause')

	audio.play()
}

function pauseSong(){
	musicContainer.classList.remove('play')
	// bat tat
	playBtn.querySelector('i.fas').classList.add('fa-play')
	playBtn.querySelector('i.fas').classList.remove('fa-pause')

	audio.pause()
}

function prevSong(){
	songIndex--
	if(songIndex<0){
		songIndex=songs.length - 1
	}

	loadSong(songs[songIndex])

	playSong()
}

function nextSong(){
	songIndex++
	if(songIndex>songs.length-1){
		songIndex=0
	}

	loadSong(songs[songIndex])

	playSong()
}

// time trick progress bar
function updateProgress(e){
	const {duration,currentTime} = e.srcElement
	const progressPercent= (currentTime / duration) *100
	progress.style.width = `${progressPercent}%`
}

//change time progress
function setProgress(e){
	const width=this.clientWidth
	// su dung dich vi tri tra bang gg dev tools
	const clickX=e.offsetX
	// console.log(clickX)
	// sau khi biet vi tri
	const duration=audio.duration
	audio.currentTime=(clickX/width)*duration
}

//event listeners
playBtn.addEventListener('click',()=>{
	const isPlaying=musicContainer.classList.contains('play')
	if(isPlaying){
		pauseSong()
	}else{
		playSong()
	}
})

// change song events
prevBtn.addEventListener('click',prevSong)
nextBtn.addEventListener('click',nextSong)

audio.addEventListener('timeupdate',updateProgress)

progressContainer.addEventListener('click',setProgress)

// het bai thi tu chuyen
audio.addEventListener('ended',nextSong)