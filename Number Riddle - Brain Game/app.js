// DOM Elements
let nRboxes = document.querySelectorAll('.game-container > div.g')
let nRnumberBoxes = document.querySelectorAll('.game-container > div.g > div.rNumber')
let nRemptyBox = document.querySelector('.g-empty')
let nRemptyBoxMain = document.getElementById('main-g-empty')
let moveBoxSound = document.getElementById('moveBoxSound')
    // Timer Elements
let timerElement = document.querySelector('.timer-container .timer')
let finishTimerElement = document.querySelector('.finish-timer-container .finish-timer')
    //  Sound Control Elements
let soundControlButton = document.querySelector('.sound-control-container .sound-control-button')
    // Restart Elements
let restartButton = document.querySelector('.restart-container .restart-button')
let finishRestartButton = document.querySelector('.finish-restart-container .finish-restart-button')
    // Alert Elements
let alertContainerElement = document.querySelector('.alert-container')
let gameFinishMenuContainer = document.querySelector('.alert-container .game-finish-menu-container')
let lastPlayedMenuContainer = document.querySelector('.alert-container .last-played-menu-container')
let cancelLPGButton = document.querySelector('.alert-container .last-played-menu-container .cancel-container .cancel-button')
let sureLPGameButton = document.querySelector('.alert-container .last-played-menu-container .sure-container .sure-button')

// Storage
let nR = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]
let localStorageSampleArray = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,0]
let userNumberRiddle = []
let nRgenarated = []
let boxClicked = false
let moveSound = true
let timer 
let sec = 0
let min = 0
let s = 0
let m = 0

// Number Riddle Genarator
function nRgenarator(n) {
    for (let i = 0; i < n+100; i++) {
        let nRsingleRandom = Math.floor(Math.random() * nR.length+1)
        if (nRgenarated.indexOf(nRsingleRandom) === -1) {
            nRgenarated.push(nRsingleRandom)
        }
    }
    for (let i = 0; i < nRnumberBoxes.length; i++) {
        nRnumberBoxes[i].classList = ''
        nRnumberBoxes[i].setAttribute('class', `rNumber rNchker rNumber${nRgenarated[i]} rNchker${nRgenarated[i]}`)
        nRnumberBoxes[i].innerHTML = nRgenarated[i]
    }
}

function timerMechanism() {
    s++
    if (s >= 59) {
        s = 0
        m++
    }
    if (s < 10) {
        sec = `0${s}`
    } else {
        sec = s
    }
    if (m < 10) {
        min = `0${m}`
    } else {
        min = m
    }
    // Timer localStorage Mechanism
    localStorage.setItem('lastPlayedTimerMin', `${min}`)
    localStorage.setItem('lastPlayedTimerSec', `${sec}`)
    // Display timer
    timerElement.innerHTML = `${min}:${sec}`
    finishTimerElement.innerHTML = `${min}:${sec}`
}

function arrayProRemover(arr) {
    var what, a = arguments, L = a.length, ax;
    while (L > 1 && arr.length) {
        what = a[--L]
        while ((ax= arr.indexOf(what)) !== -1) {
            arr.splice(ax, 1)
        }
    }
    return arr
}

// Window Load after todos <><><>
// Set display randomized riddle chart
window.addEventListener('load', (e) => {
    // CSS Display Settings
    for (let i = 0; i < nRboxes.length; i++) {
        nRboxes[i].style.height = nRboxes[0].clientWidth + 'px'
    }
    // CSS Display Settings
    
    // Sound Control - Local Storage Mechanism
    if (localStorage.getItem('sound') === 'off') {
        moveSound = false
        soundControlButton.classList.toggle('off')
    }
    // Puzzle loading - if boxClicked - Local Storage Mechanism
    if (localStorage.getItem('boxClicked') === 'true') /* If True */ {
        // Timer - Local Storage Mechanism
        timerElement.innerHTML = `${localStorage.getItem('lastPlayedTimerMin')}:${localStorage.getItem('lastPlayedTimerSec')}`
        finishTimerElement.innerHTML = `${localStorage.getItem('lastPlayedTimerMin')}:${localStorage.getItem('lastPlayedTimerSec')}`
        // Alert Settings
        alertContainerElement.classList.add('active')
        lastPlayedMenuContainer.classList.add('active')
        // ? Sure Clicked Settings
        sureLPGameButton.addEventListener('click', (e) => {
            // Timer - Local Storage Mechanism
            m = Number(localStorage.getItem('lastPlayedTimerMin'))
            s = Number(localStorage.getItem('lastPlayedTimerSec'))
            timer = setInterval(timerMechanism, 1000)
            
            let userLastPlayRiddle = localStorage.getItem('lastPlayedRiddle').split(',')
            for (let i = 0; i < userLastPlayRiddle.length; i++) {
                if (userLastPlayRiddle[i] === '0' && i !== 15) {
                    nRboxes[i].classList.add('g-empty')
                    nRemptyBox.classList.remove('g-empty')
                    nRemptyBox.innerHTML = nRboxes[i].innerHTML
                    nRboxes[i].innerHTML = `<div style="display: none; opacity: 0; z-index: -99999;" class="rNchker">0</div>`
                    arrayProRemover(userLastPlayRiddle, '0')
                }
            }
            // RE-SET DOM Elements Value & Property
            nRboxes = document.querySelectorAll('.game-container > div.g')
            nRnumberBoxes = document.querySelectorAll('.game-container > div.g > div.rNumber')
            nRemptyBox = document.querySelector('.g-empty')

            for (let i = 0; i < nRnumberBoxes.length; i++) {
                if (userLastPlayRiddle[i] !== '0') {
                    nRnumberBoxes[i].classList = ''
                    nRnumberBoxes[i].setAttribute('class', `rNumber rNchker rNumber${userLastPlayRiddle[i]} rNchker${userLastPlayRiddle[i]}`)
                    nRnumberBoxes[i].innerHTML = userLastPlayRiddle[i]
                }
            }
            // Alert Settings
            alertContainerElement.classList.remove('active')
            lastPlayedMenuContainer.classList.remove('active')
        })
        // : Cancel Clicked Settings
        cancelLPGButton.addEventListener('click', (e) => {
            // Timer - Local Storage Mechanism
            localStorage.setItem('lastPlayedTimerMin', '00')
            localStorage.setItem('lastPlayedTimerSec', '00')
            timerElement.innerHTML = `00:00`
            finishTimerElement.innerHTML = `00:00`
            timer = setInterval(timerMechanism, 1000)
            nRgenarator(nR.length)
            // Puzzle loading - if boxClicked - Local Storage Mechanism
            boxClicked = false
            localStorage.setItem('boxClicked', boxClicked)
            localStorage.setItem('lastPlayedRiddle', '')
            // Alert Settings
            alertContainerElement.classList.remove('active')
            lastPlayedMenuContainer.classList.remove('active')
        })
    } else {
        // Timer - Local Storage Mechanism
        localStorage.setItem('lastPlayedTimerMin', '00')
        localStorage.setItem('lastPlayedTimerSec', '00')
        timer = setInterval(timerMechanism, 1000)
        nRgenarator(nR.length)
    }
})

// Window Resize after todos
window.addEventListener('resize', (e) => {
    // CSS Display Setting
    for (let i = 0; i < nRboxes.length; i++) {
        nRboxes[i].style.height = nRboxes[0].clientWidth + 'px'
    }
    // CSS Display Setting
})

// Playing Mechanism
nRboxes.forEach(nRbox => { 
    nRbox.addEventListener('click', (e) => {
        if (nRbox && nRbox.classList.value.match(/g-empty/g) === null) {
            let nRemptyBoxNumber = nRemptyBox.classList[1].slice(2, 4) // Empty box
            let nRboxNumber = nRbox.classList[1].slice(2, 4) // Clicked Box
            let difference = nRemptyBoxNumber - nRboxNumber
            let arr1 = []

            // Play move sound
            if (moveSound) {
                moveBoxSound.currentTime = 0
                moveBoxSound.play()
            }
            
            // Sorting riddle to array
            for (let i = 0; i < nRbox.querySelector('.rNumber').classList.length; i++) {
                arr1.push(nRbox.querySelector('.rNumber').classList[i])
                arr1.sort()
            }
            
            let nRboxdNumber = arr1[1].slice(7, 10)

            // Move box logic
            if (difference === -4) { // Top
                nRbox.classList.add('g-empty')
                nRemptyBox.classList.add('box-animation-t-move', 'box-animation')
                nRemptyBox.classList.remove('g-empty')
                nRemptyBox.innerHTML = ''
                nRbox.innerHTML = `<div style="display: none; opacity: 0; z-index: -99999;" class="rNchker">0</div>`
                nRemptyBox.innerHTML = `<div class="rNumber rNumber${nRboxdNumber} rNchker rNchker${nRboxdNumber}" id="rNumber${nRboxdNumber}">${nRboxdNumber}</div>`
            } else if (difference === -1 &&
                (nRboxNumber !== 5 && nRemptyBoxNumber == 4) === false && 
                (nRboxNumber !== 9 && nRemptyBoxNumber == 8) === false &&
                (nRboxNumber !== 13 && nRemptyBoxNumber == 12) === false) { // Left
                nRbox.classList.add('g-empty')
                nRemptyBox.classList.add('box-animation-l-move', 'box-animation')
                nRemptyBox.classList.remove('g-empty')
                nRemptyBox.innerHTML = ''
                nRbox.innerHTML = `<div style="display: none; opacity: 0; z-index: -99999;" class="rNchker">0</div>`
                nRemptyBox.innerHTML = `<div class="rNumber rNumber${nRboxdNumber} rNchker rNchker${nRboxdNumber}" id="rNumber${nRboxdNumber}">${nRboxdNumber}</div>`
            } else if (difference === 1 &&
                (nRboxNumber !== 4 && nRemptyBoxNumber == 5) === false && 
                (nRboxNumber !== 8 && nRemptyBoxNumber == 9) === false &&
                (nRboxNumber !== 12 && nRemptyBoxNumber == 13) === false) { // Right
                nRbox.classList.add('g-empty')
                nRemptyBox.classList.add('box-animation-r-move', 'box-animation')
                nRemptyBox.classList.remove('g-empty')
                nRemptyBox.innerHTML = ''
                nRbox.innerHTML = `<div style="display: none; opacity: 0; z-index: -99999;" class="rNchker">0</div>`
                nRemptyBox.innerHTML = `<div class="rNumber rNumber${nRboxdNumber} rNchker rNchker${nRboxdNumber}" id="rNumber${nRboxdNumber}">${nRboxdNumber}</div>`
                // Remove animation class from nRemptyBox
            } else if (difference === 4) { // Bottom
                nRbox.classList.add('g-empty')
                nRemptyBox.classList.add('box-animation-b-move', 'box-animation')
                nRemptyBox.classList.remove('g-empty')
                nRemptyBox.innerHTML = ''
                nRbox.innerHTML = `<div style="display: none; opacity: 0; z-index: -99999;" class="rNchker">0</div>`
                nRemptyBox.innerHTML = `<div class="rNumber rNumber${nRboxdNumber} rNchker rNchker${nRboxdNumber}" id="rNumber${nRboxdNumber}">${nRboxdNumber}</div>`
            }

            // Move box logic 2
            if (difference === 3 &&
                (nRboxNumber !== 2 && nRemptyBoxNumber == 5) === false &&
                (nRboxNumber !== 3 && nRemptyBoxNumber == 6) === false &&
                (nRboxNumber !== 4 && nRemptyBoxNumber == 7) === false &&
                (nRboxNumber !== 6 && nRemptyBoxNumber == 9) === false &&
                (nRboxNumber !== 7 && nRemptyBoxNumber == 10) === false &&
                (nRboxNumber !== 8 && nRemptyBoxNumber == 11) === false &&
                (nRboxNumber !== 10 && nRemptyBoxNumber == 13) === false &&
                (nRboxNumber !== 11 && nRemptyBoxNumber == 14) === false &&
                (nRboxNumber !== 12 && nRemptyBoxNumber == 15) === false) {
                let nRbox3F1 = nRbox
                let nRbox3F2 = nRboxes[+nRboxNumber + 0]
                let nRbox3F3 = nRboxes[+nRboxNumber + 1]
                
                let nRbox3F1dNumber = nRbox.querySelector('.rNumber').textContent
                let nRbox3F2dNumber = nRboxes[+nRboxNumber + 0].querySelector('.rNumber').textContent
                let nRbox3F3dNumber = nRboxes[+nRboxNumber + 1].querySelector('.rNumber').textContent

                nRbox.classList.add('g-empty')
                nRemptyBox.classList.remove('g-empty')
                nRemptyBox.innerHTML = ''

                // 1st Make empty
                nRbox3F1.innerHTML = `<div style="display: none; opacity: 0; z-index: -99999;" class="rNchker">0</div>`
                nRbox3F1.classList.add('box-animation-r-move', 'box-animation')
                // 2nd F2 Val = F1 Val
                nRbox3F2.innerHTML = `<div class="rNumber rNumber${nRbox3F1dNumber} rNchker rNchker${nRbox3F1dNumber}" id="rNumber${nRbox3F1dNumber}">${nRbox3F1dNumber}</div>`
                nRbox3F2.classList.add('box-animation-r-move', 'box-animation')
                // 3rd F3 Val = F2 Val
                nRbox3F3.innerHTML = `<div class="rNumber rNumber${nRbox3F2dNumber} rNchker rNchker${nRbox3F2dNumber}" id="rNumber${nRbox3F2dNumber}">${nRbox3F2dNumber}</div>`
                nRbox3F3.classList.add('box-animation-r-move', 'box-animation')
                // 4th Empty Val = F3 Val
                nRemptyBox.innerHTML = `<div class="rNumber rNumber${nRbox3F3dNumber} rNchker rNchker${nRbox3F3dNumber}" id="rNumber${nRbox3F3dNumber}">${nRbox3F3dNumber}</div>`
                nRemptyBox.classList.add('box-animation-r-move', 'box-animation')
            }
            if (difference === -3 &&
                (nRboxNumber !== 5 && nRemptyBoxNumber == 2) === false &&
                (nRboxNumber !== 6 && nRemptyBoxNumber == 3) === false &&
                (nRboxNumber !== 7 && nRemptyBoxNumber == 4) === false &&
                (nRboxNumber !== 9 && nRemptyBoxNumber == 6) === false &&
                (nRboxNumber !== 10 && nRemptyBoxNumber == 7) === false &&
                (nRboxNumber !== 11 && nRemptyBoxNumber == 8) === false &&
                (nRboxNumber !== 13 && nRemptyBoxNumber == 10) === false &&
                (nRboxNumber !== 14 && nRemptyBoxNumber == 11) === false &&
                (nRboxNumber !== 15 && nRemptyBoxNumber == 12) === false) {
                let nRbox3F1 = nRbox
                let nRbox3F2 = nRboxes[+nRboxNumber - 2]
                let nRbox3F3 = nRboxes[+nRboxNumber - 3]
                
                let nRbox3F1dNumber = nRbox.querySelector('.rNumber').textContent
                let nRbox3F2dNumber = nRboxes[+nRboxNumber - 2].querySelector('.rNumber').textContent
                let nRbox3F3dNumber = nRboxes[+nRboxNumber - 3].querySelector('.rNumber').textContent

                nRbox.classList.add('g-empty')
                nRemptyBox.classList.remove('g-empty')
                nRemptyBox.innerHTML = ''

                // 1st Make empty
                nRbox3F1.innerHTML = `<div style="display: none; opacity: 0; z-index: -99999;" class="rNchker">0</div>`
                nRbox3F1.classList.add('box-animation-l-move', 'box-animation')
                // 2nd F2 Val = F1 Val
                nRbox3F2.innerHTML = `<div class="rNumber rNumber${nRbox3F1dNumber} rNchker rNchker${nRbox3F1dNumber}" id="rNumber${nRbox3F1dNumber}">${nRbox3F1dNumber}</div>`
                nRbox3F2.classList.add('box-animation-l-move', 'box-animation')
                // 3rd F3 Val = F2 Val
                nRbox3F3.innerHTML = `<div class="rNumber rNumber${nRbox3F2dNumber} rNchker rNchker${nRbox3F2dNumber}" id="rNumber${nRbox3F2dNumber}">${nRbox3F2dNumber}</div>`
                nRbox3F3.classList.add('box-animation-l-move', 'box-animation')
                // 4th Empty Val = F3 Val
                nRemptyBox.innerHTML = `<div class="rNumber rNumber${nRbox3F3dNumber} rNchker rNchker${nRbox3F3dNumber}" id="rNumber${nRbox3F3dNumber}">${nRbox3F3dNumber}</div>`
                nRemptyBox.classList.add('box-animation-l-move', 'box-animation')
            }
            if (difference === 12) {
                let nRbox3F1 = nRbox
                let nRbox3F2 = nRboxes[+nRboxNumber + 3]
                let nRbox3F3 = nRboxes[+nRboxNumber + 7]
                
                let nRbox3F1dNumber = nRbox.querySelector('.rNumber').textContent
                let nRbox3F2dNumber = nRboxes[+nRboxNumber + 3].querySelector('.rNumber').textContent
                let nRbox3F3dNumber = nRboxes[+nRboxNumber + 7].querySelector('.rNumber').textContent

                nRbox.classList.add('g-empty')
                nRemptyBox.classList.remove('g-empty')
                nRemptyBox.innerHTML = ''

                // 1st Make empty
                nRbox3F1.innerHTML = `<div style="display: none; opacity: 0; z-index: -99999;" class="rNchker">0</div>`
                nRbox3F1.classList.add('box-animation-b-move', 'box-animation')
                // 2nd F2 Val = F1 Val
                nRbox3F2.innerHTML = `<div class="rNumber rNumber${nRbox3F1dNumber} rNchker rNchker${nRbox3F1dNumber}" id="rNumber${nRbox3F1dNumber}">${nRbox3F1dNumber}</div>`
                nRbox3F2.classList.add('box-animation-b-move', 'box-animation')
                // 3rd F3 Val = F2 Val
                nRbox3F3.innerHTML = `<div class="rNumber rNumber${nRbox3F2dNumber} rNchker rNchker${nRbox3F2dNumber}" id="rNumber${nRbox3F2dNumber}">${nRbox3F2dNumber}</div>`
                nRbox3F3.classList.add('box-animation-b-move', 'box-animation')
                // 4th Empty Val = F3 Val
                nRemptyBox.innerHTML = `<div class="rNumber rNumber${nRbox3F3dNumber} rNchker rNchker${nRbox3F3dNumber}" id="rNumber${nRbox3F3dNumber}">${nRbox3F3dNumber}</div>`
                nRemptyBox.classList.add('box-animation-b-move', 'box-animation')
            }
            if (difference === -12) {
                let nRbox3F1 = nRbox
                let nRbox3F2 = nRboxes[+nRboxNumber - 5]
                let nRbox3F3 = nRboxes[+nRboxNumber - 9]
                
                let nRbox3F1dNumber = nRbox.querySelector('.rNumber').textContent
                let nRbox3F2dNumber = nRboxes[+nRboxNumber - 5].querySelector('.rNumber').textContent
                let nRbox3F3dNumber = nRboxes[+nRboxNumber - 9].querySelector('.rNumber').textContent

                nRbox.classList.add('g-empty')
                nRemptyBox.classList.remove('g-empty')
                nRemptyBox.innerHTML = ''

                // 1st Make empty
                nRbox3F1.innerHTML = `<div style="display: none; opacity: 0; z-index: -99999;" class="rNchker">0</div>`
                nRbox3F1.classList.add('box-animation-t-move', 'box-animation')
                // 2nd F2 Val = F1 Val
                nRbox3F2.innerHTML = `<div class="rNumber rNumber${nRbox3F1dNumber} rNchker rNchker${nRbox3F1dNumber}" id="rNumber${nRbox3F1dNumber}">${nRbox3F1dNumber}</div>`
                nRbox3F2.classList.add('box-animation-t-move', 'box-animation')
                // 3rd F3 Val = F2 Val
                nRbox3F3.innerHTML = `<div class="rNumber rNumber${nRbox3F2dNumber} rNchker rNchker${nRbox3F2dNumber}" id="rNumber${nRbox3F2dNumber}">${nRbox3F2dNumber}</div>`
                nRbox3F3.classList.add('box-animation-t-move', 'box-animation')
                // 4th Empty Val = F3 Val
                nRemptyBox.innerHTML = `<div class="rNumber rNumber${nRbox3F3dNumber} rNchker rNchker${nRbox3F3dNumber}" id="rNumber${nRbox3F3dNumber}">${nRbox3F3dNumber}</div>`
                nRemptyBox.classList.add('box-animation-t-move', 'box-animation')
            }
            // Move box logic 2

            // Move box logic 3
            if (difference === 2 && 
                (nRboxNumber !== 3 && nRemptyBoxNumber == 5) === false &&
                (nRboxNumber !== 4 && nRemptyBoxNumber == 6) === false &&
                (nRboxNumber !== 8 && nRemptyBoxNumber == 10) === false &&
                (nRboxNumber !== 7 && nRemptyBoxNumber == 9) === false &&
                (nRboxNumber !== 11 && nRemptyBoxNumber == 13) === false && 
                (nRboxNumber !== 12 && nRemptyBoxNumber == 14) === false) /* nRbox2F2 */ {
                let nRbox2F1 = nRbox
                let nRbox2F2 = nRboxes[+nRboxNumber]
                
                let nRbox2F1dNumber = nRbox.querySelector('.rNumber').textContent
                let nRbox2F2dNumber = nRboxes[+nRboxNumber].querySelector('.rNumber').textContent

                nRbox.classList.add('g-empty')
                nRemptyBox.classList.remove('g-empty')
                nRemptyBox.innerHTML = ''

                // 1st Make empty
                nRbox2F1.innerHTML = `<div style="display: none; opacity: 0; z-index: -99999;" class="rNchker">0</div>`
                nRbox2F1.classList.add('box-animation-r-move', 'box-animation')
                // 2nd Empty Val = F3 Val
                nRbox2F2.innerHTML = `<div class="rNumber rNumber${nRbox2F1dNumber} rNchker rNchker${nRbox2F1dNumber}" id="rNumber${nRbox2F1dNumber}">${nRbox2F1dNumber}</div>`
                nRbox2F2.classList.add('box-animation-r-move', 'box-animation')
                // 3rd Empty Val = F2 Val
                nRemptyBox.innerHTML = `<div class="rNumber rNumber${nRbox2F2dNumber} rNchker rNchker${nRbox2F2dNumber}" id="rNumber${nRbox2F2dNumber}">${nRbox2F2dNumber}</div>`
                nRemptyBox.classList.add('box-animation-r-move', 'box-animation')
            } 

            if (difference === -2 &&
                (nRboxNumber !== 5 && nRemptyBoxNumber == 3) === false && 
                (nRboxNumber !== 6 && nRemptyBoxNumber == 4) === false &&
                (nRboxNumber !== 10 && nRemptyBoxNumber == 8) === false && 
                (nRboxNumber !== 9 && nRemptyBoxNumber == 7) === false &&
                (nRboxNumber !== 13 && nRemptyBoxNumber == 11) === false && 
                (nRboxNumber !== 14 && nRemptyBoxNumber == 12) === false) /* nRbox2F2 */ {
                let nRbox2F1 = nRbox
                let nRbox2F2 = nRboxes[+nRboxNumber - 2]
                
                let nRbox2F1dNumber = nRbox.querySelector('.rNumber').textContent
                let nRbox2F2dNumber = nRboxes[+nRboxNumber - 2].querySelector('.rNumber').textContent

                nRbox.classList.add('g-empty')
                nRemptyBox.classList.remove('g-empty')
                nRemptyBox.innerHTML = ''    

                // 1st Make empty
                nRbox2F1.innerHTML = `<div style="display: none; opacity: 0; z-index: -99999;" class="rNchker">0</div>`
                nRbox2F1.classList.add('box-animation-l-move', 'box-animation')
                // 2nd Empty Val = F3 Val
                nRbox2F2.innerHTML = `<div class="rNumber rNumber${nRbox2F1dNumber} rNchker rNchker${nRbox2F1dNumber}" id="rNumber${nRbox2F1dNumber}">${nRbox2F1dNumber}</div>`
                nRbox2F2.classList.add('box-animation-l-move', 'box-animation')
                // 3rd Empty Val = F2 Val
                nRemptyBox.innerHTML = `<div class="rNumber rNumber${nRbox2F2dNumber} rNchker rNchker${nRbox2F2dNumber}" id="rNumber${nRbox2F2dNumber}">${nRbox2F2dNumber}</div>`
                nRemptyBox.classList.add('box-animation-l-move', 'box-animation')
            } 

            if (difference === 8) {
                let nRbox2F1 = nRbox
                let nRbox2F2 = nRboxes[+nRboxNumber + 3]
                
                let nRbox2F1dNumber = nRbox.querySelector('.rNumber').textContent
                let nRbox2F2dNumber = nRboxes[+nRboxNumber + 3].querySelector('.rNumber').textContent

                nRbox.classList.add('g-empty')
                nRemptyBox.classList.remove('g-empty')
                nRemptyBox.innerHTML = ''    

                // 1st Make empty
                nRbox2F1.innerHTML = `<div style="display: none; opacity: 0; z-index: -99999;" class="rNchker">0</div>`
                nRbox2F1.classList.add('box-animation-b-move', 'box-animation')
                // 2nd Empty Val = F3 Val
                nRbox2F2.innerHTML = `<div class="rNumber rNumber${nRbox2F1dNumber} rNchker rNchker${nRbox2F1dNumber}" id="rNumber${nRbox2F1dNumber}">${nRbox2F1dNumber}</div>`
                nRbox2F2.classList.add('box-animation-b-move', 'box-animation')
                // 3rd Empty Val = F2 Val
                nRemptyBox.innerHTML = `<div class="rNumber rNumber${nRbox2F2dNumber} rNchker rNchker${nRbox2F2dNumber}" id="rNumber${nRbox2F2dNumber}">${nRbox2F2dNumber}</div>`
                nRemptyBox.classList.add('box-animation-b-move', 'box-animation')
            } 

            if (difference === -8) {
                let nRbox2F1 = nRbox
                let nRbox2F2 = nRboxes[+nRboxNumber - 5]
                
                let nRbox2F1dNumber = nRbox.querySelector('.rNumber').textContent
                let nRbox2F2dNumber = nRboxes[+nRboxNumber - 5].querySelector('.rNumber').textContent

                nRbox.classList.add('g-empty')
                nRemptyBox.classList.remove('g-empty')
                nRemptyBox.innerHTML = '' 

                // 1st Make empty
                nRbox2F1.innerHTML = `<div style="display: none; opacity: 0; z-index: -99999;" class="rNchker">0</div>`
                nRbox2F1.classList.add('box-animation-t-move', 'box-animation')
                // 2nd Empty Val = F3 Val
                nRbox2F2.innerHTML = `<div class="rNumber rNumber${nRbox2F1dNumber} rNchker rNchker${nRbox2F1dNumber}" id="rNumber${nRbox2F1dNumber}">${nRbox2F1dNumber}</div>`
                nRbox2F2.classList.add('box-animation-t-move', 'box-animation')
                // 3rd Empty Val = F2 Val
                nRemptyBox.innerHTML = `<div class="rNumber rNumber${nRbox2F2dNumber} rNchker rNchker${nRbox2F2dNumber}" id="rNumber${nRbox2F2dNumber}">${nRbox2F2dNumber}</div>`
                nRemptyBox.classList.add('box-animation-t-move', 'box-animation')
            } 
            // Move box logic 3

            // RE-SET DOM Elements Value & Property
            nRboxes = document.querySelectorAll('.game-container > div.g')
            nRnumberBoxes = document.querySelectorAll('.game-container > div.g > div.rNumber')
            nRemptyBox = document.querySelector('.g-empty')

            // Remove animation class from nRemptyBox
            setTimeout(() => {
                nRboxes.forEach(nRbox => {
                    nRbox.classList.remove('box-animation-t-move', 'box-animation-l-move', 'box-animation-r-move', 'box-animation-b-move', 'box-animation')
                })
            }, 100)

            // CHECK PUZZLE
            let nRchkers = document.querySelectorAll('.game-container > div.g > div.rNchker')
            let nRnumberArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 0]
            let nRnumberUserArray = []
            let numberRiddlesolved = false

            // Puzzle solve chk
            for (let i = 0; i < nRchkers.length; i++) {
                nRnumberUserArray.push(Number(nRchkers[i].textContent))
                if (nRnumberUserArray[i] === nRnumberArray[i] &&
                    nRnumberUserArray[i-1] === nRnumberArray[i-1] &&
                    nRnumberUserArray[i-2] === nRnumberArray[i-2] &&
                    nRnumberUserArray[i-3] === nRnumberArray[i-3] &&
                    nRnumberUserArray[i-4] === nRnumberArray[i-4] &&
                    nRnumberUserArray[i-5] === nRnumberArray[i-5]) {
                    numberRiddlesolved = true
                } else {
                    numberRiddlesolved = false
                }
            }

            // Puzzle loading - if boxClicked - Local Storage Mechanism
            boxClicked = true
            localStorage.setItem('boxClicked', boxClicked)
            localStorage.setItem('lastPlayedRiddle', nRnumberUserArray)

            // Game Finish Alert
            if (numberRiddlesolved) {
                boxClicked = false
                localStorage.setItem('boxClicked', boxClicked)
                clearInterval(timer)
                // Alert Settings
                alertContainerElement.classList.add('active')
                gameFinishMenuContainer.classList.add('active')
            }
        }
    })
})
// Playing Mechanism

// Arrow keys Playing Mechanism
window.addEventListener('keydown', (e) => {
    let nRemptyBoxNumber = nRemptyBox.classList[1].slice(2, 4) // Empty box
    let difference = nRemptyBoxNumber

    if (e.key === 'ArrowUp') {
        // Play move sound
        if (moveSound) {
            moveBoxSound.currentTime = 0
            moveBoxSound.play()
        }
        if (difference != 13 && difference != 14 && difference != 15 &&
            difference != 16 ) {
                let nRbox = nRboxes[+nRemptyBoxNumber + 3] 
                nRbox.classList.add('g-empty')
                nRemptyBox.classList.add('box-animation-t-move', 'box-animation')
                nRemptyBox.classList.remove('g-empty')
                nRemptyBox.innerHTML = nRbox.innerHTML
                nRbox.innerHTML = `<div style="display: none; opacity: 0; z-index: -99999;" class="rNchker">0</div>`
        }
    }
    if (e.key === 'ArrowLeft') {
        // Play move sound
        if (moveSound) {
            moveBoxSound.currentTime = 0
            moveBoxSound.play()
        }
        if (difference != 4 && difference != 8 && difference != 12 &&
            difference != 16) {
                let nRbox = nRboxes[nRemptyBoxNumber]
                nRbox.classList.add('g-empty')
                nRemptyBox.classList.add('box-animation-l-move', 'box-animation')
                nRemptyBox.classList.remove('g-empty')
                nRemptyBox.innerHTML = nRbox.innerHTML
                nRbox.innerHTML = `<div style="display: none; opacity: 0; z-index: -99999;" class="rNchker">0</div>`
        }
    }
    if (e.key === 'ArrowRight') {
        // Play move sound
        if (moveSound) {
            moveBoxSound.currentTime = 0
            moveBoxSound.play()
        }
        if (difference != 1 && difference != 5 && difference != 9 &&
            difference != 13) {
                let nRbox = nRboxes[+nRemptyBoxNumber - 2]
                nRbox.classList.add('g-empty')
                nRemptyBox.classList.add('box-animation-r-move', 'box-animation')
                nRemptyBox.classList.remove('g-empty')
                nRemptyBox.innerHTML = nRbox.innerHTML
                nRbox.innerHTML = `<div style="display: none; opacity: 0; z-index: -99999;" class="rNchker">0</div>`
        }
    }
    if (e.key === 'ArrowDown') {
        // Play move sound
        if (moveSound) {
            moveBoxSound.currentTime = 0
            moveBoxSound.play()
        }
        if (difference != 1 && difference != 2 && difference != 3 &&
            difference != 4 ) {
                let nRbox = nRboxes[+nRemptyBoxNumber - 5] 
                nRbox.classList.add('g-empty')
                nRemptyBox.classList.add('box-animation-b-move', 'box-animation')
                nRemptyBox.classList.remove('g-empty')
                nRemptyBox.innerHTML = nRbox.innerHTML
                nRbox.innerHTML = `<div style="display: none; opacity: 0; z-index: -99999;" class="rNchker">0</div>`
        }
    }
    // Remove animation class from nRemptyBox
    setTimeout(() => {
        nRboxes.forEach(nRbox => {
            nRbox.classList.remove('box-animation-t-move', 'box-animation-l-move', 'box-animation-r-move', 'box-animation-b-move', 'box-animation')
        })
    }, 100)

    // RE-SET DOM Elements Value & Property
    nRboxes = document.querySelectorAll('.game-container > div.g')
    nRnumberBoxes = document.querySelectorAll('.game-container > div.g > div.rNumber')
    nRemptyBox = document.querySelector('.g-empty')

    // CHECK PUZZLE
    let nRchkers = document.querySelectorAll('.game-container > div.g > div.rNchker')
    let nRnumberArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 0]
    let nRnumberUserArray = []
    let numberRiddlesolved = false

    // Puzzle solve chk
    for (let i = 0; i < nRchkers.length; i++) {
                    nRnumberUserArray.push(Number(nRchkers[i].textContent))
                    if (nRnumberUserArray[i] === nRnumberArray[i] &&
                        nRnumberUserArray[i-1] === nRnumberArray[i-1] &&
                        nRnumberUserArray[i-2] === nRnumberArray[i-2] &&
                        nRnumberUserArray[i-3] === nRnumberArray[i-3] &&
                        nRnumberUserArray[i-4] === nRnumberArray[i-4] &&
                        nRnumberUserArray[i-5] === nRnumberArray[i-5]) {
                        numberRiddlesolved = true
                    } else {
                        numberRiddlesolved = false
                    }
    }

    if (e.key === 'ArrowUp' || e.key === 'ArrowLeft' || e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        // Puzzle loading - if boxClicked - Local Storage Mechanism
        boxClicked = true
        localStorage.setItem('boxClicked', boxClicked)
        localStorage.setItem('lastPlayedRiddle', nRnumberUserArray)
        // Game Finish Alert
        if (numberRiddlesolved) {
            // Timer settings
            boxClicked = false
            localStorage.setItem('boxClicked', boxClicked)
            clearInterval(timer)
            // Alert Settings
            alertContainerElement.classList.add('active')
            gameFinishMenuContainer.classList.add('active')
        }
    }
})
// Arrow keys Playing Mechanism

// Sound Control Mechanism
soundControlButton.addEventListener('click', () => {
    if (moveSound) {
        moveSound = false
        if (localStorage.getItem('sound') === 'on') {
            localStorage.setItem('sound', 'off')
        } else {
            localStorage.setItem('sound', 'on')
        }
    } else {
        moveSound = true
        if (localStorage.getItem('sound') === 'off') {
            localStorage.setItem('sound', 'on')
        } else {
            localStorage.setItem('sound', 'off')
        }
    }
    soundControlButton.classList.toggle('off')
})
// Sound Control Mechanism

// Restart game dis-organize puzzle Mechanism
restartButton.addEventListener('click', () => {
    // Timer settings
    s = 0
    m = 0
    sec = sec = `0${s}`
    min = min = `0${m}`
    localStorage.setItem('lastPlayedTimerMin', '00')
    localStorage.setItem('lastPlayedTimerSec', '00')
    timerElement.innerHTML = `${min}:${sec}`
    finishTimerElement.innerHTML = `${min}:${sec}`
    // Timer settings

    // Puzzle loading - if boxClicked - Local Storage Mechanism
    // Making things right for Restarting the game
    boxClicked = false
    localStorage.setItem('boxClicked', boxClicked)
    localStorage.setItem('lastPlayedRiddle', '')

    // boxes setting
    for (let i = 0; i < nRnumberBoxes.length; i++) {
        nRnumberBoxes[i].classList = ''
        nRnumberBoxes[i].setAttribute('class', `rNumber rNchker`)
    }
    // Empty Box setting 16 nBox
    if (nRemptyBoxMain.innerHTML !== `<div style="display: none; opacity: 0; z-index: -99999;" class="rNchker">0</div>`) {
        nRemptyBox.classList.remove('g-empty')
        nRemptyBoxMain.classList.add('g-empty')
        nRemptyBox.innerHTML = `<div class="rNumber rNumber${nRemptyBoxMain.textContent} rNchker rNchker${nRemptyBoxMain.textContent}" id="rNumber${nRemptyBoxMain.textContent}">${nRemptyBoxMain.textContent}</div>`
        nRemptyBoxMain.innerHTML = `<div style="display: none; opacity: 0; z-index: -99999;" class="rNchker">0</div>`
        // RE-SET DOM Elements Value & Property
        nRboxes = document.querySelectorAll('.game-container > div.g')
        nRnumberBoxes = document.querySelectorAll('.game-container > div.g > div.rNumber')
        nRemptyBox = document.querySelector('.g-empty')
    }
    nRgenarated = []
    nRgenarator(nR.length)
    // boxes setting
})
// Restart game dis-organize puzzle Mechanism

// Finish > Restart Mechanism
finishRestartButton.addEventListener('click', () => {
    // Alert Container Settings
    alertContainerElement.classList.remove('active')
    gameFinishMenuContainer.classList.remove('active')
    // Timer settings
    s = 0
    m = 0
    sec = sec = `0${s}`
    min = min = `0${m}`
    localStorage.setItem('lastPlayedTimerMin', '00')
    localStorage.setItem('lastPlayedTimerSec', '00')
    timerElement.innerHTML = `${min}:${sec}`
    finishTimerElement.innerHTML = `${min}:${sec}`
    timer = setInterval(timerMechanism, 1000)
    // Timer settings

    // Puzzle loading - if boxClicked - Local Storage Mechanism
    // Making things right for Restarting the game
    boxClicked = false
    localStorage.setItem('boxClicked', boxClicked)
    localStorage.setItem('lastPlayedRiddle', '')

    // boxes setting
    for (let i = 0; i < nRnumberBoxes.length; i++) {
        nRnumberBoxes[i].classList = ''
        nRnumberBoxes[i].setAttribute('class', `rNumber rNchker`)
    }
    // Empty Box setting 16 nBox
    if (nRemptyBoxMain.innerHTML !== `<div style="display: none; opacity: 0; z-index: -99999;" class="rNchker">0</div>`) {
        nRemptyBox.classList.remove('g-empty')
        nRemptyBoxMain.classList.add('g-empty')
        nRemptyBox.innerHTML = `<div class="rNumber rNumber${nRemptyBoxMain.textContent} rNchker rNchker${nRemptyBoxMain.textContent}" id="rNumber${nRemptyBoxMain.textContent}">${nRemptyBoxMain.textContent}</div>`
        nRemptyBoxMain.innerHTML = `<div style="display: none; opacity: 0; z-index: -99999;" class="rNchker">0</div>`
        // RE-SET DOM Elements Value & Property
        nRboxes = document.querySelectorAll('.game-container > div.g')
        nRnumberBoxes = document.querySelectorAll('.game-container > div.g > div.rNumber')
        nRemptyBox = document.querySelector('.g-empty')
    }
    nRgenarated = []
    nRgenarator(nR.length)
})
// Finish > Restart Mechanism

/* 
    1) atob - decode string
    2) btoa - encode string
*/