
//Standard initialization function
function whenDocumentLoaded(action) {
    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", action);
    } else {
        // `DOMContentLoaded` already fired
        action();
    }
}

//Flag database
let flags;

const flag_number = 217;

//Flag loading function
const flag_loader= function(path){
    d3.csv(path).then(function(data) {
        //Assigning the loaded data to the local database
        flags=data;
        console.log(flags);
        //Filling the first flags
        assign_flags();
    });
};

const assign_flags= function(){
    //Reference to the flag container
    let scrollmenu = document.getElementById("js_flag_scroll");
    scrollmenu.classList.add("flag-slider");
    let cnt = 0;
    while(cnt<flag_number){
        const wrapper = document.createElement("div");
        wrapper.classList.add('wrapper');

        // top flag
        const square = document.createElement("div");
        square.classList.add('square');
        square.innerHTML = "<img src=\""+flags[cnt]['ImageURL']+"\">";
        const button_style = document.createElement("div");
        button_style.classList.add('button-style');
        button_style.innerHTML = flags[cnt]['Country'].substring(0, 3).toUpperCase();
        cnt++;
        // bottom flag
        const square2 = document.createElement("div");
        square2.classList.add('square');
        if(cnt<flag_number) square2.innerHTML = "<img src=\""+flags[cnt]['ImageURL']+"\">";
        const button_style2 = document.createElement("div");
        button_style2.classList.add('button-style');
        if(cnt<flag_number) button_style2.innerHTML = flags[cnt]['Country'].substring(0, 3).toUpperCase();
        cnt++;

        square.appendChild(button_style);
        if(cnt<flag_number) square2.appendChild(button_style2);
        wrapper.appendChild(square);
        wrapper.appendChild(square2);
        scrollmenu.appendChild(wrapper);
    }
};

//Launch-time runner
whenDocumentLoaded(() => {
    flag_loader("../../data/final_flags.csv");
});