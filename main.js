//selecting elements
const section = document.querySelector('.boxes')
const lostMessage = document.querySelector(".end")
const playerLivesCount = document.querySelector('span')
const restart = document.querySelector("#restart")
const won = document.querySelector(".won")
const revealButton = document.querySelector("#revealed")
const revealDisplay = document.querySelector(".revealCount")
const backMusic = document.querySelector("#backmusic")
const wonMusic = document.querySelector("#wonmusic")
const lostMusic = document.querySelector("#lostmusic")
const pausebtnog = document.querySelector("#pause")
const clickaud = document.querySelector("#clickm")
const body = document.querySelector("body")
const sound = document.querySelector("#sound")
const movesDisplay = document.querySelector(".numberOfMoves")
const moveshead = document.querySelector(".moments")

/*function playMusic() {
    backMusic.play()
}
window.addEventListener('onload', playMusic())*/


let timesClicked = 0
pausebtnog.addEventListener('click', e => {
    timesClicked += 1
    if (timesClicked % 2 == 0) {
        backMusic.pause()
        e.target.src = "./images/off.png"


    } else if (timesClicked % 2 == 1) {
        backMusic.play()
        e.target.src = "./images/on.png"
    }

})

let moves = 0
let playLives = 5
let correct = 0
let revealCount = 0

//Link text
movesDisplay.textContent = moves
playerLivesCount.textContent = playLives
revealDisplay.textContent = revealCount

//Generate Data


//here we dont have curly brackets after the function so its going to automatically return the array for us
const getData = () => [
    { imgSrc: './images/1.png', name: '1' },
    { imgSrc: './images/2.png', name: '2' },
    { imgSrc: './images/3.png', name: '3' },
    { imgSrc: './images/4.png', name: '4' },
    { imgSrc: './images/5.png', name: '5' },
    { imgSrc: './images/6.png', name: '6' },
    { imgSrc: './images/7.png', name: '7' },
    { imgSrc: './images/8.png', name: '8' },
    { imgSrc: './images/1.png', name: '1' },
    { imgSrc: './images/2.png', name: '2' },
    { imgSrc: './images/3.png', name: '3' },
    { imgSrc: './images/4.png', name: '4' },
    { imgSrc: './images/5.png', name: '5' },
    { imgSrc: './images/6.png', name: '6' },
    { imgSrc: './images/7.png', name: '7' },
    { imgSrc: './images/8.png', name: '8' },

]
//console.log(getData())

//Randomize
const randomize = () => {
    const cardData = getData()
    cardData.sort(() => Math.random() - 0.5) //this takes each object in the array of cardData and 
    return cardData
}


//Card Generator 
let check = []
const cardGenerator = () => {
    const cardData = randomize()
    cardData.forEach(item => {
        const card = document.createElement('div')
        card.classList = 'card'

        const face = document.createElement('img')
        face.classList = 'image'
        const back = document.createElement('div')
        back.classList = 'back'

        //Attach info to the cards
        face.src = item.imgSrc
        card.name = item.name
        //Attach the cards to the section

        card.appendChild(face)
        card.appendChild(back)
        section.appendChild(card)


        card.addEventListener('click', (e) => {
            moves += 1

            clickaud.play()
            movesDisplay.textContent = moves
            card.classList.toggle('toggleCard')
            currentCard = e.target
            check.push(currentCard)

            if (check.length == 2) {
                //console.log("working")
                if (check[0].name != check[1].name) {
                    playLives -= 1
                    playerLivesCount.textContent = playLives
                    setTimeout(reverse, 1500, check)

                } else if (check[0].name == check[1].name) {
                    correct += 1
                }
                check = []
            }

            if (playLives == 0) {
                section.classList.add("finished")
                setTimeout(gameEnded, 1500)
            }
            else if (correct == 8) {
                section.classList.add("finished")
                setTimeout(gameEnded, 1500)
            }

        })

    })
}
function gameEnded() {
    //console.log(timesClicked)
    //console.log("ended")
    pausebtn = pausebtnog.cloneNode(true)
    body.appendChild(pausebtn)
    //console.log(pausebtn)
    moveshead.classList.remove("moments")
    moveshead.classList.add("later")

    pausebtnog.remove()
    backMusic.pause()
    section.remove()
    console.log(moves)
    if (playLives == 0) {
        if (timesClicked % 2 == 1) {
            lostMusic.play()
            timesClicked = 0
        }

        pausebtn.addEventListener('click', e => {
            timesClicked += 1
            //console.log(timesClicked)
            if (timesClicked % 2 == 0) {
                //console.log(timesClicked)
                lostMusic.pause()
                e.target.src = "./images/off.png"
            } else if (timesClicked % 2 == 1) {
                lostMusic.play()
                e.target.src = "./images/on.png"
            }

        })
        lostMessage.classList.remove("hide")
        revealButton.classList.add("hide")

    } else if (correct == 8) {
        if (timesClicked % 2 == 1) {
            wonMusic.play()
            timesClicked = 0
        }
        pausebtn.addEventListener('click', e => {
            timesClicked += 1
            if (timesClicked % 2 == 0) {
                wonMusic.pause()
                e.target.src = "./images/off.png"
            } else if (timesClicked % 2 == 1) {
                wonMusic.play()
                e.target.src = "./images/on.png"
            }
            timesClicked += 1
        })

        won.classList.remove("hide")
        revealButton.classList.add("hide")
    }
}
function reverse(check) {
    check[0].classList.toggle('toggleCard')
    check[1].classList.toggle("toggleCard")
    //console.log(check[0])
    //console.log(check[1])

}


cardGenerator()

restart.addEventListener("click", () => {
    //console.log("restarted")
    location.reload();
})

revealButton.addEventListener("click", () => {
    //backMusic.pause()
    sound.play()
    revealCount += 1
    revealDisplay.textContent = revealCount
    facedCards = document.querySelectorAll(".image")

    facedCards.forEach(item => {
        item.classList.add("face")
    })


    setTimeout(() => {
        facedCards.forEach(item => {
            item.classList.remove("face")
        })
    }, 2000)


})

