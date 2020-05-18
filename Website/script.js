//Standard initialization function
function whenDocumentLoaded(action) {
    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", action);
    } else {
        // `DOMContentLoaded` already fired
        action();
    }
}


//Tab change function
const change_tab= function(name) {
    //Changing the backgrounds and titles depending on the tab
    if (name === 'VISUALIZATION') {
        window.open("visualizations/index_visu.html",'_self');
    }
}