var ItemsCount;
function getItemsCount(){
    if (window.innerWidth > 992){
        ItemsCount = 3
        return ItemsCount;
    }
    else if (window.innerWidth <= 992 && window.innerWidth > 664){
        ItemsCount = 2
        return ItemsCount;
    }
    else{
        ItemsCount = 1
        return ItemsCount;
    }
}
getItemsCount();
var page = 'index';
$('document').ready(function(){
    document.getElementById('catalog-controls-btn-default-active').classList.add('active');
    loadItems(0, ItemsCount);
    history.pushState('', document.title, window.location.pathname);
});

window.addEventListener('resize', (e) => {
    if (ItemsCount != getItemsCount()){
        loadItems(0, ItemsCount);
    }
})