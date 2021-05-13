mainFunctions = {
    start() {
        progressBar.progressBar()
        buttons.buttons()
        utils.sortByName(audios)
        this.update()
    },

    update() {
        currentSong = audios[elements.currentAudioPosition]
        title.innerText = currentSong.title
        artistAlbum.innerText = `${currentSong.artist} - ${currentSong.album}`
        artistAlbum.dataset.artist = currentSong.artist
        artistAlbum.dataset.album = currentSong.album
        audio.src = currentSong.source

        utils.verifyImg(audios, elements.currentAudioPosition, currentAlbumImg)
        utils.isTextOverflowing(titleContainer, title, 'centered')
        utils.isTextOverflowing(artistAlbumContainer, artistAlbum, 'centered')

        this.playingInList()
    },
    

    list() {
        playlist.innerHTML = ''
        this.createPlaylist(audios)
        buttons.selectSong()
        this.playingInList()
    },

    createPlaylist(array) {
        for (let i = 0; i < array.length; i++) {
            var music = document.createElement("li")
            // container geral
            divContainer = document.createElement("div")
            // container com informações da música
            divData = document.createElement("div")
            // capa do álbum
            divAlbum = document.createElement("div")
            album = document.createElement("img")
            // título, artista e álbum
            divTitle = document.createElement("div")
            titleH3 = document.createElement("h3")
            artistAlbumP = document.createElement("p")
            // opções
            divOptions = document.createElement("div")
            options = document.createElement("img")
            songOptionsPopUp = document.createElement("ul")
            liShare = document.createElement("li")
            liSelect = document.createElement("li")
            liDetails = document.createElement("li")
            liDelete = document.createElement("li")
            // datasets
            dataIndex = document.createAttribute("data-index")
            dataTitle = document.createAttribute("data-title")
            dataArtist = document.createAttribute("data-artist")
            dataAlbum = document.createAttribute("data-album")
            dataDisplay = document.createAttribute('data-display')
            
            // adicionar valores
            array[i].index = i
            dataIndex.value = i
            dataTitle.value = array[i].title 
            dataArtist.value = array[i].artist 
            dataAlbum.value = array[i].album
            dataDisplay.value = '0'

            titleH3.innerText = array[i].title
            artistAlbumP.innerHTML = `${dataArtist.value} - ${dataAlbum.value}`

            options.src = '../public/media/icons/more_vert-24px.svg'

            liSelect.innerText = 'Selecionar'
            liDetails.innerText = 'Detalhes'
            liShare.innerText = 'Compartilhar'
            liDelete.innerText = 'Excluir'

            // setar atributos
            music.setAttributeNode(dataTitle)
            music.setAttributeNode(dataArtist)
            music.setAttributeNode(dataAlbum)
            music.setAttributeNode(dataIndex) 
            songOptionsPopUp.setAttributeNode(dataDisplay)

            // organizar estrutura html
            music.appendChild(divContainer)
            divContainer.appendChild(divData)
            divData.appendChild(divAlbum)
            divData.appendChild(divTitle)
            divAlbum.appendChild(album)
            divTitle.appendChild(titleH3)
            divTitle.appendChild(artistAlbumP)
            music.appendChild(divOptions)
            divOptions.appendChild(options)
            divOptions.appendChild(songOptionsPopUp)
            songOptionsPopUp.appendChild(liShare)
            songOptionsPopUp.appendChild(liSelect)
            songOptionsPopUp.appendChild(liDetails)
            songOptionsPopUp.appendChild(liDelete)

            // ids e classes
            divAlbum.id = `album${i}`
            titleH3.id = `titleH3${i}`
            artistAlbumP.id = `artistAlbumP${i}`

            utils.addClass(divContainer, 'divContainer flex')
            utils.addClass(divData, 'flex')
            utils.addClass(divAlbum, 'album-img flex')
            utils.addClass(divTitle, 'divTitle')
            utils.addClass(divOptions, 'divOptions flex')
            utils.addClass(options, 'options button')
            utils.addClass(songOptionsPopUp, 'songOptionsPopUp optionsPopUp none flex column animate-options-down')
            utils.addClass(music, 'listedMusic flex')
            playlist.appendChild(music)

            // verificar tamanho do título e do artista
            divContainerI = document.querySelector('.divContainer')
            titleH3Id = document.getElementById(`titleH3${i}`)
            artistAlbumPId = document.getElementById(`artistAlbumP${i}`)
            utils.isTextOverflowing(divContainerI, titleH3Id, 'alignLeft')
            utils.isTextOverflowing(divContainerI, artistAlbumPId, 'alignLeft')

            // adicionar imagens dos álbuns
            img = document.querySelector(`#playlist li #album${i} img`)
            utils.verifyImg(array, i, img)
        }
    },

    playingInList() {
        for (var i = 0; i < listedMusic.length; i++) {
            listedMusic[i].classList.remove('playing')
        }

        for (let i = 0; i < listedMusic.length; i++) {
            if (listedMusic[i].dataset.title == title.innerText && listedMusic[i].dataset.artist == artistAlbum.dataset.artist) {
                utils.addClass(listedMusic[i], 'playing')

                if (elements.randomOn == false) {
                    elements.currentAudioPosition = listedMusic[i].dataset.index
                }
            }
        }
    },


    extendPlayer() {
        aditionalButton = document.querySelectorAll('.aditionalButton')
        player = document.querySelectorAll('.player')[0]
        buttonsDiv = document.querySelector('.buttons')
        section = document.querySelector('#songMetadata section')
        
        //all = document.querySelectorAll('.container.player *')

        //for (let i = 0; i < all.length; i++) {
        //    all[i].style.transition = '300ms'
        //}
        
        for (let i = 0; i < aditionalButton.length; i++) {
            aditionalButton[i].style.display = 'flex'
            utils.addClass(aditionalButton[i], '')
        }

        utils.addClass(player, 'extendedPlayer column')
        utils.addClass(currentSongAlbum, 'extendedPlayer')
        currentSongAlbum.classList.remove('minimizedPlayer')
        utils.addClass(songMetadata, 'extendedPlayer')
        songMetadata.classList.remove('minimizedPlayer')
        utils.addClass(title, 'extendedPlayer')
        utils.addClass(section, 'extendedPlayer')
        utils.addClass(artistAlbumContainer, 'extendedPlayer')
        utils.addClass(buttonsDiv, 'extendedPlayer')
        buttonsDiv.classList.remove('minimizedPlayer')

        playlist.style.height = '259px'
    },

    minimizePlayer() {
        for (let i = 0; i < aditionalButton.length; i++) {
            aditionalButton[i].style.display = 'none'
        }

        player.classList.remove('extendedPlayer', 'column')
        currentSongAlbum.classList.remove('extendedPlayer')
        utils.addClass(currentSongAlbum, 'minimizedPlayer')
        songMetadata.classList.remove('extendedPlayer')
        utils.addClass(songMetadata, 'minimizedPlayer')
        title.classList.remove('extendedPlayer')
        section.classList.remove('extendedPlayer')
        artistAlbumContainer.classList.remove('extendedPlayer')
        buttonsDiv.classList.remove('extendedPlayer')
        utils.addClass(buttonsDiv, 'minimizedPlayer')

        playlist.style.height = '650px'
    }
}