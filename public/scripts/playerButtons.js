buttons = {
    buttons() {
        //////// botões ////////

        reorder.onclick = () => this.reorder()
        orderByName.onclick = () => utils.sortByName(audios) & this.reorder()
        orderByArtist.onclick = () => utils.sortByArtist(audios) & this.reorder()
        orderByAlbum.onclick = () => utils.sortByAlbum(audios) & this.reorder()

        songMetadata.onclick = () => mainFunctions.extendPlayer()
        minimizePlayer.onclick = () => mainFunctions.minimizePlayer()

        songOptions.onclick = () => this.songOptionsList()

        mute.onclick = () => this.mute()
        volumeBar.oninput = () => this.setVolume(volumeBar.value)
        volumeBar.onchange = () => this.setVolume(volumeBar.value)

        random.onclick = () => this.random()
        repeat.onclick = () => this.toggleRepeat()

        progressBar.oninput = () => this.setProgress(progressBar.value) & this.pause()
        progressBar.onchange = () => this.setProgress(progressBar.value) & this.play()

        playPause.onclick = () => this.playPause()

        replay10.onclick = () => {audio.currentTime -= 10}
        forward10.onclick = () => {audio.currentTime += 10}

        back.onclick = () => this.back()
        next.onclick = () => this.next()
        audio.onended = () => this.next()
    },


    //////// funções dos botões ////////

    reorder() {
        utils.toggleClass(reorderOptions, 'none')
    },


    songOptionsList() {
        utils.toggleClass(songOptionsList, 'none')
    },


    mute() {
        if (audio.muted) {
            audio.muted = false
            mute.src = './public/media/icons/volume_up-24px.svg'
        } else {
            audio.muted = true
            mute.src = './public/media/icons/volume_off-24px.svg'
        }
    },

    setVolume(value) {
        audio.volume = value / 100
        mute.src = './public/media/icons/volume_up-24px.svg'
        
        if (volumeBar.value == 0) {
            mute.src = './public/media/icons/volume_off-24px.svg'
        }
        
        if (audio.muted) {
            audio.muted = false
        }
    },


    random() {       
        if (elements.randomOn == false) {
            elements.randomOn = true
            random.style.opacity = 1
            utils.sortRandom(audios)
        } else if (elements.randomOn == true) {
            elements.randomOn = false;
            random.style.opacity = 0.5

            elements.currentAudioPosition = audios[elements.currentAudioPosition].index

            if (elements.randomOff == 0) {
                utils.sortByName(audios)
            }
             else if (elements.randomOff == 1) {
                utils.sortByArtist(audios)
            }
             else if (elements.randomOff == 2) {
                utils.sortByAlbum(audios)
            }
        }
    },


    toggleRepeat() {
        if (repeat.src.indexOf('repeat-24px.svg')!=-1) {
            repeat.src = './public/media/icons/repeat_one-24px.svg';
        } else {
            repeat.src = './public/media/icons/repeat-24px.svg';
        }
       
    },


    setProgress(value) {
        audio.currentTime = value;
    },


    playPause() {
        if (audio.paused) {
            this.play()
        } else {
            this.pause()
        }
    },

    play() {
        audio.play()
        playPause.src = './public/media/icons/pause-24px.svg'
    },

    pause() {
        audio.pause()
        playPause.src = './public/media/icons/play_arrow-24px.svg'
    },


    back() {
        if (audio.currentTime <= 5) {
            if (elements.currentAudioPosition == 0) {
                elements.currentAudioPosition = audios.length
            }
            elements.currentAudioPosition--
            mainFunctions.update()
            this.play()
        } else {
            audio.currentTime = 0
        }
    },

    next() {
        elements.currentAudioPosition++
        if (elements.currentAudioPosition == audios.length) {
            elements.currentAudioPosition = 0
        }
        mainFunctions.update()
        this.play()
    },


    selectSong() {
        listedMusic = document.getElementsByClassName('listedMusic')
        divContainer = document.getElementsByClassName('divContainer')
        options = document.getElementsByClassName('options')
        songOptionsPopUp = document.getElementsByClassName('songOptionsPopUp')
        
        for (let i = 0; i < divContainer.length; i++) {
            divContainer[i].onclick = () => {
                dataTitle = listedMusic[i].dataset.title
                dataArtist = listedMusic[i].dataset.artist

                for (let j = 0; j < audios.length; j++) {
                    if (audios[j].title == dataTitle && audios[j].artist == dataArtist) {
                        var newPosition = j
                    }
                }

                elements.currentAudioPosition = newPosition
                mainFunctions.update()
                this.play()
            }

            options[i].onclick = () => {
                if (songOptionsPopUp[i].dataset.display == '0') {
                    for (let j = 0; j < listedMusic.length; j++) {
                        utils.addClass(songOptionsPopUp[j], 'none')
                        songOptionsPopUp[j].dataset.display = '0'
                    }
                    songOptionsPopUp[i].classList.remove('none')
                    songOptionsPopUp[i].dataset.display = '1'
                } else {
                    utils.addClass(songOptionsPopUp[i], 'none')
                    songOptionsPopUp[i].dataset.display = '0'
                }
                
                // if (i = listedMusic[i].dataset.index) {}
            }
        }
    }
}