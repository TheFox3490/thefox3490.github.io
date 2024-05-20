$('document').ready(function(){
    $('.header-burger, .header-call-btn').click(function(event) {
        $('.header-burger,.header-line-2-contacts').toggleClass('active');
        $('body').toggleClass('lock');
    });
});