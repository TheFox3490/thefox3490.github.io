var ItemsCount = 0; // all
var page = 'catalog';
$('document').ready(function(){
    let urlParams = new URLSearchParams(window.location.search);
    let urlCategory = urlParams.get('category');
    console.log(urlCategory);
    if (urlCategory == null){
        loadItems(0, ItemsCount);
        document.getElementById('catalog-controls-btn-default-active').classList.add('active');
    }
    else{
        CategoryId = urlCategory;
        loadItems(urlCategory, ItemsCount);
        document.querySelector('[CategoryId="' + urlCategory + '"]').classList.add('active');
    }
});