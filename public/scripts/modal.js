modal = {
    start() {
        this.showsDetails()
        this.showVideos()
    },

	showsDetails() {
        details = document.getElementsByClassName('showDetails')
        exitButton = document.getElementsByClassName('exitButton')

        for (let i = 0; i < details.length; i++) {
            details[i].onclick = () => {
                document.getElementById(`moreInfo${i}`).style.display = 'flex'

                exitButton[i].onclick = () => {
                    document.getElementById(`moreInfo${i}`).style.display = 'none'
                }
            
                window.onclick = (event) => {
                    if (event.target == document.getElementById(`moreInfo${i}`)) {
                        document.getElementById(`moreInfo${i}`).style.display = 'none'
                    }
                }
            }
        }
    },

    showVideos() {
        thumb = document.getElementsByClassName('photo')

        for (let i = 0; i < thumb.length; i++) {
            thumb[i].onclick = () => {
                document.getElementById(`allVideos${i}`).style.display = 'flex'

                exitButton[i].onclick = () => {
                    document.getElementById(`allVideos${i}`).style.display = 'none'
                }
            
                window.onclick = (event) => {
                    if (event.target == document.getElementById(`allVideos${i}`)) {
                        document.getElementById(`allVideos${i}`).style.display = 'none'
                    }
                }
            }
        }
    }
}

window.addEventListener('load', modal.start())