slides = {
    start() {
        slideIndex = 1
        nextSlide.onclick = () => this.plusSlides(1)
        prevSlide.onclick = () => this.plusSlides(-1)
        this.showSlides(slideIndex)
    },

    plusSlides(n) {
        video = document.getElementsByTagName('video')
        for (let i = 0; i < video.length; i++) {
            video[i].pause()
        }

        this.showSlides(slideIndex += n)
    },

    currentSlide(n) {
        this.showSlides(slideIndex = n)
    },

    showSlides(n) {
        var slides = document.getElementsByClassName('mySlides')
        var dots = document.getElementsByClassName('dot')
        if (n > slides.length) { slideIndex = 1 }
        if (n < 1) { slideIndex = slides.length }
        for (i = 0; i < slides.length; i++) {
            slides[i].style.display = 'none'
        }
        for (i = 0; i < dots.length; i++) {
            dots[i].className = dots[i].className.replace(' active', '')
        }
        slides[slideIndex - 1].style.display = 'flex'
        dots[slideIndex - 1].className += ' active'
    }
}

window.addEventListener('load', slides.start())