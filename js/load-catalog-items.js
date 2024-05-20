function loadItems(CategoryId, count) {
  $.getJSON('../json/' + CategoryId + '.json', function (data) {
      let out = '';
      let counter = 0;
      for (let key in data){
        out+='<div class="catalog-item">';

        out+='<div class="catalog-item-title">';
        out+='<img onclick="openmodal.call(this);" key="' + key + '" src="'+data[key]['images'][0]+'">';
        out+='<h3>'+data[key]['brand']+' '+data[key]['model']+'</h3>';
        out+='</div>';

        out+='<div class="catalog-item-specs">';

        out+='<div class="catalog-item-specs-row">';
        out+='<span>'+'Год выпуска:'+'</span>';
        out+='<span>'+data[key]['year']+'</span>';
        out+='</div>';
        if (CategoryId != 3){
          out+='<div class="catalog-item-specs-row">';
          out+='<span>'+'Колесная формула:'+'</span>';
          out+='<span>'+data[key]['wheels']+'</span>';
          out+='</div>';
        }
        out+='<div class="catalog-item-specs-row">';
        out+='<span>'+'КПП:'+'</span>';
        out+='<span>'+data[key]['kpp']+'</span>';
        out+='</div>';
        out+='<div class="catalog-item-specs-row">';
        out+='<span>'+'Мощность:'+'</span>';
        out+='<span>'+data[key]['power']+ ' л.с.' +'</span>';
        out+='</div>';

        out+='</div>';

        out+='<div class="catalog-item-price">';
        out+='<span>'+'Цена:'+'</span>';
        out+='<span>'+'по запросу'+'</span>';
        out+='</div>';
        out+='<div class="catalog-item-buttons">';
        out+='<button onclick="openmodal.call(this);" key="' + key + '" class="catalog-item-more-btn">'+'Подробнее'+'</button>';
        if(page == 'index'){
          out+='<a href="#contacts-anchor" class="catalog-item-feedback-btn">'+'Оставить заявку'+'</a>';
        }
        else{
          out+='<a onclick="modalCrmOpen();" class="catalog-item-feedback-btn">'+'Оставить заявку'+'</a>';
        }
        out+='</div>';
        out+='</div>';
        if (count == counter + 1){
          break;
        }
        else{
          counter++;
        }
    }
  $('#catalog-items').html(out);
  })
}  