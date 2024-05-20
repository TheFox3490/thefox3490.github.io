var CategoryButtons = document.querySelectorAll('.catalog-controls-btn');
var CategoryId = 0;

CategoryButtons.forEach((e) => {
    e.addEventListener('click', (event) => {
        CategoryId = event.target.getAttribute('CategoryId');
        loadItems(CategoryId, ItemsCount);
        CategoryButtons.forEach((e) => {
            e.classList.remove('active');
        })
        event.target.classList.add('active');
        if (page == 'index'){
            document.querySelector('.catalog-more-btn').setAttribute('href', 'catalog.html?category=' + CategoryId);
        }
    })
})