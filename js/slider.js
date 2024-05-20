const images = document.querySelectorAll('.slider-item');
const controls = document.querySelectorAll('.slider-item-controls');
const slider = document.querySelector('.slider');
let imgindex = 0;
let timer;

function show(index){
    images[imgindex].classList.remove('active');
    images[index].classList.add('active');
    imgindex = index;
}
function showprev(){
    let index = imgindex - 1;
    if (index < 0){
        index = images.length - 1;
    }
    show(index);
}
function shownext(){
    let index = imgindex + 1;
    if (index >= images.length){
        index = 0;
    }
    show(index)
}
function startSlider(){
    timer = setInterval(shownext, 6000);
}
function stopSlider() {
    clearInterval(timer);
}
controls.forEach((e) => {
    e.addEventListener('click', (event) => {
        stopSlider();
        if (event.target.classList.contains('slider-item-controls-prev')){
            showprev();
        } else if (event.target.classList.contains('slider-item-controls-next')) {
            shownext();
        }
        startSlider();
    })
})
startSlider();
//touch//
let touchstartX = 0;
let touchendX = 0;

slider.addEventListener('touchstart', function(event) {
    touchstartX = event.changedTouches[0].screenX;
    stopSlider();
}, false);

slider.addEventListener('touchend', function(event) {
    touchendX = event.changedTouches[0].screenX;
    handleGesture();
    startSlider();
}, false);

function handleGesture() {
    //next
    if (touchendX + 50 < touchstartX) {
        shownext();
    }
    //prev
    if (touchendX > touchstartX + 50) {
        showprev();
    }
}
/////////

show(imgindex)