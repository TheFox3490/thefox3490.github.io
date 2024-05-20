window.addEventListener('hashchange', (e)=>{
    history.pushState('', document.title, window.location.pathname);
    })