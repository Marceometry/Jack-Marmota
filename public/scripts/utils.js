utils = {
    sortRandom(array) {
        var length = array.length, temp, i;

        while (length > 0) {
            i = Math.floor(Math.random() * length);
            length--;
            
            temp = array[length];
            array[length] = array[i];
            array[i] = temp;
        }
        return array;
    },

    checkIfRandom(value, array) {
        if (elements.randomOn == true) {
            this.sortRandom(array)
        }
        elements.randomOff = value
    },


    sortByName(array) {
        array.sort((a, b) => (a.title > b.title) ? 1 : (a.title === b.title) ? ((a.artist > b.artist) ? 1 : -1) : -1)
        mainFunctions.list()
        this.checkIfRandom(0, array)
    },

    sortByArtist(array) {
        array.sort((a, b) => (a.artist > b.artist) ? 1 : (a.artist === b.artist) ? ((a.title > b.title) ? 1 : -1) : -1)
        mainFunctions.list()
        this.checkIfRandom(1, array)
    },

    sortByAlbum(array) {
        array.sort((a, b) => (a.album > b.album) ? 1 : (a.album === b.album) ? ((a.title > b.title) ? 1 : -1) : -1)
        mainFunctions.list()
        this.checkIfRandom(2, array)
    },
    

    repeat() {
        if (repeat.src.indexOf('repeat_one-24px.svg')!=-1) {
            if (audio.currentTime == audio.duration) {
                elements.currentAudioPosition --
            }
        }
    },


    verifyImg(array, i, j) {
        if (array[i].albumImg == undefined) {
            j.src = '../jm-media/icons/audiotrack-24px.svg'
            j.style.width =  '75%'
            j.style.height =  '75%'
        } else {
            j.src = array[i].albumImg
            j.style.width =  '100%'
            j.style.height =  '100%'
        }
    },


    addClass(element, className) {
        var name, arr
        name = className
        arr = element.className.split(" ")
        if (arr.indexOf(name) == -1) {
            element.className += " " + name
        }
    },

    toggleClass(element, className) {
        if (element.classList) {
            element.classList.toggle(className);
        } else {
            // For IE9
            var classes = element.className.split(" ");
            var i = classes.indexOf(className);
      
            if (i >= 0)
                classes.splice(i, 1);
            else
                classes.push(className);
                element.className = classes.join(" ");
      }
    },


    isTextOverflowing(container, element, a) {
        cont = container.scrollWidth
        elem = element.scrollWidth

        if (cont < elem) {
            this.addClass(element, 'animate-float-text')
            i = (elem - cont) * 2

            if (a == 'centered') {
                element.style.marginLeft = `${i}px`
            }
        } else {
            element.classList.remove('animate-float-text')
            
            if (a == 'centered') {
                element.style.marginLeft = `0`
            }
        }
    },


    digitalClock(timeInSeconds) {
        seconds = Math.floor(timeInSeconds % 60)
        if (seconds < 10) {
            seconds = `0${seconds}`
        }
    
        minutes = Math.floor(timeInSeconds / 60)
        if (minutes < 10) {
            minutes = `0${minutes}`
        }

        return `${minutes}:${seconds}`
    }
}