document.addEventListener("DOMContentLoaded", function() {
    Promise.all([
        fetch()
    ]).then(x => {
        console.log(x);
    })
});