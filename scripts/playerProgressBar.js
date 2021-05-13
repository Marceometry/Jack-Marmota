progressBar = {
    progressBar() {
        canvasWidth = 300
        canvas = document.getElementById("canvas-progress").getContext('2d')
        progressBar = document.getElementById('progressBar')

        audio.onloadedmetadata = () => this.audioLoadedData(),
        audio.ontimeupdate = () => this.audioOnTimeUpdate()
    },


    audioLoadedData() {
        canvas.fillStyle = "transparent"
        canvas.fillRect(0, 0, canvasWidth, 500)

        duration.innerHTML = utils.digitalClock(audio.duration)
        currentTime.innerHTML = utils.digitalClock(audio.currentTime)

        volumeBar.value = 100
        progressBar.max = audio.duration
    },

    audioOnTimeUpdate() {
        canvas.clearRect(0, 0, canvasWidth, 500)
        canvas.fillStyle = "transparent"
        canvas.fillRect(0, 0, canvasWidth, 500)

        utils.repeat()

        currentTime.innerHTML = utils.digitalClock(audio.currentTime)
        progressBar.value = audio.currentTime
    
        var percentage = audio.currentTime / audio.duration
        var progress = (canvasWidth * percentage)
        canvas.fillStyle = "black"
        canvas.fillRect(0, 0, progress, 500)
    }
}