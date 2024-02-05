const INTERVAL_IMG = 5000;
const GAP_FRAMES = 10;

const listImg = document.querySelectorAll('.slider__img');
listImg[0].style.display = 'block';

listImg.forEach(() => {
    const rowLine = document.getElementById('row-line');
    rowLine.insertAdjacentHTML('beforeend', getTimeLine());
});

function getTimeLine() {
    return `
        <div class="slider__line">
            <div class="slider__line__fill"></div>
        </div>
    `;
}

const sliderLines = document.querySelectorAll('.slider__line__fill');

let activeImg = 0;


const runSlider = () => {
    const offset = GAP_FRAMES * 100 / INTERVAL_IMG;

    let time = 0;
    sliderLines[activeImg].style.width = '0%';

    return setInterval(() => {
        const activeLine = sliderLines[activeImg];
        const beforeWidth = Number(activeLine.style.width.slice(0, -1));

        activeLine.style.width = `${beforeWidth + offset}%`;

        if(time >= INTERVAL_IMG) nextImg();
        time += GAP_FRAMES;

    }, GAP_FRAMES);
}


let slider;
let countLoad = 0;

listImg.forEach(img => {
    img.addEventListener('load', () => {
        countLoad++;
        console.log(`${countLoad}/${listImg.length} photo upload`);

        if(countLoad === listImg.length) {
            slider = runSlider();
            console.log('run slider');
        }
    });
});

setTimeout(() => {
    if(countLoad !== listImg.length) {
        slider = runSlider();
        console.log('run slider');
    }
}, 5000);



function backImg() {
    sliderLines[activeImg].style.width = '0%';
    listImg[activeImg].style.display = 'none';

    activeImg = (listImg.length + activeImg - 1) % listImg.length;

    if(activeImg === sliderLines.length - 1) {
        for(let i = 0; i < sliderLines.length - 1; i++) {
            sliderLines[i].style.width = '100%';
        }
    }

    sliderLines[activeImg].style.width = '0%';
    listImg[activeImg].style.display = 'block';

    clearInterval(slider);
    slider = runSlider();
}

function nextImg() {
    sliderLines[activeImg].style.width = '100%';
    listImg[activeImg].style.display = 'none';

    activeImg = (listImg.length + activeImg + 1) % listImg.length;

    if(activeImg === 0) {
        for(let i = 1; i < sliderLines.length; i++) {
            sliderLines[i].style.width = '0%';
        }
    }

    sliderLines[activeImg].style.width = '0%';
    listImg[activeImg].style.display = 'block';

    clearInterval(slider);
    slider = runSlider();
}


document.getElementById('slider-btn-back').onclick = backImg;
document.getElementById('slider-btn-next').onclick = nextImg;