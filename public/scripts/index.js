index = {
    start() {
        this.openModal()
        this.seeAll()
        this.gridColumns()
        this.photoGallery()
        
        slideIndex = 1
        nextSlide.onclick = () => this.plusSlides(1)
        prevSlide.onclick = () => this.plusSlides(-1)
        this.showSlides(slideIndex)
    },


    showSlides(n) {
        slides = document.getElementsByClassName('mySlides')
        dots = document.getElementsByClassName('dot')

        if (n > slides.length) { slideIndex = 1 }
        if (n < 1) { slideIndex = slides.length }
        for (i = 0; i < slides.length; i++) {
            slides[i].style.display = 'none'
        }
        if (dots.length > 0) {
            for (i = 0; i < dots.length; i++) {
                dots[i].className = dots[i].className.replace(' active', '')
            }
            dots[slideIndex - 1].className += ' active'
        }
        slides[slideIndex - 1].style.display = 'flex'
    },

    plusSlides(n) {
        this.showSlides(slideIndex += n)

        for (let i = 0; i < 3; i++) {
            this.verifyVideo(i)
        }
    },

    currentSlide(n) {
        this.showSlides(slideIndex = n)
    },


	openModal() {
        openModal = document.getElementsByClassName('openModal')
        modal = document.getElementsByClassName('modal')
        exitButton = document.getElementsByClassName('exitButton')
        
        for (let i = 0; i < openModal.length; i++) {
            openModal[i].onclick = () => {
                // abrir modal
                modal[i].style.display = 'flex'
                this.disablePageScrolling()

                // fechar modal
                window.onclick = (event) => this.closeModal(event)

                // pausar vídeo do banner
                for (let j = 0; j < 3; j++) {
                    this.verifyVideo(j)
                }
            }
        }
    },

    closeModal(event) {
        for (let j = 0; j < modal.length; j++) {
            if (event.target == modal[j] || event.target == exitButton[j]) {
                modal[j].style.display = 'none'
                this.enablePageScrolling()
            }
            this.verifyVideo(j)
        }
    },


    disablePageScrolling() {
        nav = document.getElementsByClassName('nav')[0]

        if (body.style.height !== '100vh') {
            scrollIndex = window.pageYOffset
            nav.style.display = 'none'
            body.style.height = '100vh' 
            body.style.overflowY = 'scroll'
            body.scrollTop = scrollIndex
        }
    },

    enablePageScrolling() {
        nav.style.display = 'flex'
        body.style.height = 'initial'
        body.style.overflow = 'auto'
        window.scrollTo(0, scrollIndex)
    },


    verifyVideo(i) {
        video = document.getElementsByTagName('video')

        if (video.length > 0) {
            if (video[i].paused == false) {
                video[i].pause()
            }
        }
    },


    photoGallery() {
        gridModal = document.querySelectorAll('.grid .modal')
        prevPhoto = document.getElementsByClassName('prevPhoto')
        nextPhoto = document.getElementsByClassName('nextPhoto')
        mainImg = document.getElementsByClassName('mainImg')
        topBar = document.getElementsByClassName('topBar')

        for (let i = 0; i < mainImg.length; i++) {
            mainImg[i].onmouseover = () => {
                topBar[i].style.display = 'flex'
            }
        }

        if (mainImg.length > 0) {
            for (let i = 0; i < gridModal.length; i++) {
                prevPhoto[i].onclick = () => {
                    gridModal[i].style.display = 'none'
                    if (i != 0) {
                        gridModal[i-1].style.display = 'flex'
                    } else {
                        gridModal[gridModal.length - 1].style.display = 'flex'
                    }
                }

                nextPhoto[i].onclick = () => {
                    gridModal[i].style.display = 'none'
                    if (i != gridModal.length-1) {
                        gridModal[i+1].style.display = 'flex'
                    } else {
                        gridModal[0].style.display = 'flex'
                    }
                }
            }
        }
    },


    seeAll() {
        seeAll = document.getElementsByClassName('moreInfo seeAll flex')
        hiddenContent = document.getElementsByClassName('hiddenContent')

        for (let i = 0; i < seeAll.length; i++) {
            seeAll[i].onclick = () => {
                utils.toggleClass(hiddenContent[i], 'none')

                if (seeAll[i].innerText == 'Mostrar mais') {
                    seeAll[i].innerText = 'Mostrar menos'
                } else {
                    seeAll[i].innerText = 'Mostrar mais'
                }
            }
        }
    },


    gridColumns() {
        grid = document.querySelectorAll('.showsCards .grid:last-child')
        card = document.querySelectorAll('.showsCards .grid:last-child .card')

        if (card.length == 2) {
            grid[0].style.gridTemplateColumns = 'auto auto'
        } else if (card.length == 3) {
            grid[0].style.gridTemplateColumns = 'auto auto auto'
        }
    }
}

window.addEventListener('load', index.start())