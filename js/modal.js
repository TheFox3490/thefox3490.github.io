let modal = document.querySelector('.modal');
function openmodal(catId, key){
    modal.classList.add('active');
    document.body.classList.add('modal-open');
    if (key == undefined){
        loadmodal(CategoryId, this.getAttribute('key'))
    }
    else{
        loadmodal(catId, key)
    }
}

function closemodal(){
    document.getElementById('modal').scrollTop = 0;
    modal.classList.remove('active');
    document.body.classList.remove('modal-open');
}

function modalCrmOpen(){
    document.querySelector('.modal-crm').classList.add('active');
    let oldCrm = document.querySelector('.modal-crm');
    let newCrm = oldCrm.cloneNode(true);
    oldCrm.parentNode.replaceChild(newCrm, oldCrm);
    document.querySelector('.overlay-crm').addEventListener('click', function(){
        modalCrmClose();
    })
}
function modalCrmClose(){
    document.querySelector('.modal-crm').classList.remove('active');
}

function loadmodal(CategoryId, key){
    $.getJSON('../json/' + CategoryId + '.json', function (data) {
        let out = '';
        out+='<div class="modal-window">';
        out+='<button onclick="closemodal();" class="modal-close"></button>';

        out+='<div class="modal-title">';
        out+='<h2 class="modal-title-name">'+data[key]['brand']+' '+data[key]['model']+'</h2>';
        out+='<h3 class="modal-title-price">'+parseFloat((data[key]['price'])).toLocaleString('ru')+' ₽'+'</h3>';
        out+='</div>';
        
        out+='<div class="modal-images-and-contact-wrapper">';
        out+='<div class="modal-images">';
        out+='<div class="modal-main-img">';
        out+='<img id="modal-image-current" class="modal-slider-current-pic" src="'+data[key]['images'][1]+'">';
        //slider next prev buttons
        out+='<div>';
        out+='<img id="modal-slider-prev" class="modal-slider-controls modal-slider-prev" src="../img/index/slider/control-left.png">';
        out+='</div>';
        out+='<div>';
        out+='<img id="modal-slider-next" class="modal-slider-controls modal-slider-next" src="../img/index/slider/control-right.png">';
        out+='</div>';
        //
        out+='</div>';
        out+='<div class="modal-images-preview">';
        
        for (let i = 1; i < data[key]['images'].length; i++){
            out+='<img id="modal-image-' + (i-1) + '" class="modal-slider-pic" src="'+data[key]['images'][i]+'">';
        }

        out+='</div>';
        out+='</div>';
        out+='<div class="modal-contacts">';
        out+='<a class="modal-contacts-phone" href="tel:+78452744445">';
        out+='<img src="img/modal/phone-icon.png">+7 (8452) 74-44-45';
        out+='</a>';
        if (page == 'index'){
            out+='<a onclick="closemodal();" href="#contacts-anchor" class="modal-contacts-call">'+'Заказать звонок'+'</a>';
        }
        else{
            out+='<a onclick="modalCrmOpen();" class="modal-contacts-call">'+'Заказать звонок'+'</a>';
        }
        out+='</div>';
        out+='</div>';

        out+='<div class="modal-specs">';
        out+='<h3 class="modal-title-price">'+'Характеристики'+'</h3>';
        
        out+='<ul>';
        out+='<li>'+'Марка: '+'<span>'+data[key]['brand']+'</span>'+'</li>';
        
        /* for (let i = 0; i < data[key]['specs'].length; i++){
            console.log(data[key]['specs'][i][0]);
            console.log(data[key]['specs'][i][1]);
        } */

        out+='<li>'+'Модель: '+'<span>'+data[key]['model']+'</span>'+'</li>';
        out+='<li>'+'Год выпуска: '+'<span>'+data[key]['year']+'</span>'+'</li>';
        out+='<li>'+'Мощность: '+'<span>'+data[key]['power']+' л.с.'+'</span>'+'</li>';
        out+='<li>'+'Коробка передач: '+'<span>'+data[key]['kpp']+'</span>'+'</li>';
        if (CategoryId == 3){
            for (let i = 0; i < data[key]['specs'].length; i++){
                out+='<li>'+data[key]['specs'][i][0]+': '+'<span>'+data[key]['specs'][i][1]+'</span>'+'</li>';
            }
        }
        else{
            out+='<li>'+'Тип кузова: '+'<span>'+data[key]['type']+'</span>'+'</li>';
            out+='<li>'+'Разрешённая максимальная масса: '+'<span>'+data[key]['maxweight']+' кг'+'</span>'+'</li>';
            out+='<li>'+'Колёсная формула: '+'<span>'+data[key]['wheels']+'</span>'+'</li>';
            out+='<li>'+'Экологический класс: '+'<span>'+data[key]['class']+'</span>'+'</li>';
            out+='<li>'+'Тип двигателя: '+'<span>'+data[key]['engtype']+'</span>'+'</li>';
            out+='<li>'+'Объём двигателя: '+'<span>'+data[key]['engcapacity']+' л.'+'</span>'+'</li>';

            if (CategoryId == 1){
                out+='<li>'+'Грузоподъёмность: '+'<span>'+data[key]['carrying']+' кг'+'</span>'+'</li>';
            }

            out+='<li>'+'Состояние: '+'<span>'+data[key]['condition']+'</span>'+'</li>';    
        }
        
        out+='</ul>';
        out+='</div>';

        out+='<div class="modal-description">';
        out+='<h3>'+'Описание'+'</h3>';
        out+='<p>'+decodeURIComponent(escape(atob(data[key]['description'])))+'</з>';
        out+='</div>';

        out+='</div>';
        out+='<div id="overlay" class="overlay">';
        out+='</div>';

        $('#modal').html(out);


        document.getElementById('overlay').addEventListener('click', () => {
            closemodal();
        });

        //slider
        let current = document.getElementById('modal-image-current');
        let currentIndex = 0;
        let modalImages = document.querySelectorAll('.modal-slider-pic');
        for (let i = 0; i < data[key]['images'].length - 1; i++){
            document.getElementById('modal-image-' + i).addEventListener('click', function(event) {
                showImage(i);
                currentIndex = i;
            });
        }
        function showImage(index) {
            //current.src = modalImages[index].src;
            current.style.opacity = 0;
            setTimeout(function() {
                current.src = modalImages[index].src;
                current.style.opacity = 1;
            }, 200);
        }
        document.getElementById('modal-slider-prev').addEventListener('click', function() {
            currentIndex = (currentIndex - 1 + modalImages.length) % modalImages.length;
            showImage(currentIndex);
        });
        document.getElementById('modal-slider-next').addEventListener('click', function() {
            currentIndex = (currentIndex + 1) % modalImages.length;
            showImage(currentIndex);
        });
        //touch//
        let touchstartX = 0;
        let touchendX = 0;

        current.addEventListener('touchstart', function(event) {
            touchstartX = event.changedTouches[0].screenX;
        }, false);

        current.addEventListener('touchend', function(event) {
            touchendX = event.changedTouches[0].screenX;
            handleGesture();
        }, false);

        function handleGesture() {
            //next
            if (touchendX + 40 < touchstartX) {
                currentIndex = (currentIndex + 1) % modalImages.length;
                showImage(currentIndex);
            }
            //prev
            if (touchendX > touchstartX + 40) {
                currentIndex = (currentIndex - 1 + modalImages.length) % modalImages.length;
                showImage(currentIndex);
            }
        }
        /////////
        function adjustOverlayHeight() {
            var modalWindow = document.querySelector('.modal-window');
            var overlay = document.querySelector('.overlay');
            overlay.style.height = 20 + modalWindow.clientHeight + 'px';
          }
          window.addEventListener('resize', adjustOverlayHeight);
          adjustOverlayHeight();
    })
}
//out+='<div class="new">';
//out+='</div>';