
const clock = document.querySelector('.circle h1');
const btn = document.querySelector('.circle span');

const btn_1 = document.querySelector('.mode .pomo');
const btn_2 = document.querySelector('.mode .short');
const btn_3 = document.querySelector('.mode .long');
const allBtn = document.querySelectorAll(".mode button");
const gear = document.querySelector('.opt');
let pomoInterval;

let pomoTime = '25:00';
let shortTime = '05:00';
let longTime = '10:00';

// Inital clock value
clock.innerText = '25:00';

btn.addEventListener("click", function(ev) {
    ev.target.innerText = ev.target.innerText == 'START' ? "PAUSE" : 'START';
    if ( ev.target.innerText == 'PAUSE' ) {
        timeing(true);
    } else {
        clearInterval(pomoInterval);
    }
})

btn_1.onclick = function() {
    clearInterval(pomoInterval);
    btn.innerText = 'START';
    allBtn.forEach(e => e.classList.remove('active'));
    clock.innerText = pomoTime;
    btn_1.classList.add("active");
}
btn_2.onclick = function() {
    clearInterval(pomoInterval);
    btn.innerText = 'START';
    allBtn.forEach(e => e.classList.remove('active'));
    clock.innerText = shortTime;
    btn_2.classList.add("active");
}
btn_3.onclick = function() {
    clearInterval(pomoInterval);
    btn.innerText = 'START';
    allBtn.forEach(e => e.classList.remove('active'));
    clock.innerText = longTime;
    btn_3.classList.add("active");
}

function timeing() {
    let min = +(clock.innerText[0]+clock.innerText[1]);
    let ss = +(clock.innerText[3]+clock.innerText[4]);
    let time = min;
    let seconds = time*60 + ss-1;
    pomoInterval = setInterval(function() {
        if ( seconds !== -1 ) {
            let minutes = Math.floor(seconds/60);
            let sec = Math.floor(seconds%60);
            clock.innerText = `${minutes >= 10 ? minutes : '0' + minutes}:${sec >= 10 ? sec : '0' + sec}`;
            seconds--;
            if ( seconds === 0 ) {
                alert('The Time is Fineshed!!');
            }
        } else clearInterval(pomoInterval);
    }, 1000);
}

let isOpened = false;
gear.addEventListener('click', () => {
    if ( !isOpened ) {
        isOpened = true;
        const popup = document.createElement('div');
        const close = document.createElement('span');

        // Add HTML to popup
        popup.innerHTML = `
        <div class='popup-content'>
            <div class='pomo'>
                <h4>Pomodoro Time</h4>
                <h5 contenteditable="true">${pomoTime}</h5>
            </div>
            <div class='short'>
                <h4>Short Break</h4>
                <h5 contenteditable="true">${shortTime}</h5>
            </div>
            <div class='long'>
                <h4>Long Break</h4>
                <h5 contenteditable="true">${longTime}</h5>
            </div>
            </div>
            <button class='update'>Update</button>
        `;
        
        // Add Classes
        popup.classList.add('popup');
        close.classList.add('close');

        // Add Text
        close.innerText = 'x';

        // Append Child
        popup.appendChild(close);
        document.body.appendChild(popup);

        close.addEventListener('click', () => {
            isOpened = false;
            popup.remove();
        })

        // Update btn
        const update = popup.querySelector('.update');
        const newPopoTime =  popup.querySelector('.pomo h5');
        const newShortTime =  popup.querySelector('.short h5');
        const newLongTime =  popup.querySelector('.long h5');
        update.addEventListener('click', () => {
            pomoTime = newPopoTime.innerText;
            shortTime = newShortTime.innerText;
            longTime = newLongTime.innerText;
            // Update Text
            allBtn.forEach((e, i) => {
                if ( e.classList.contains('active') ) {
                    switch (i) {
                        case 0:
                            clock.innerText = pomoTime;
                        break;
                        case 1:
                            clock.innerText = shortTime;
                        break;
                        case 2:
                            clock.innerText = longTime;
                        break;
                    }
                }
            })
            popup.remove();
            isOpened = false;
        })
    }
});