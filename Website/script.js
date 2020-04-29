
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
const change_tab= function(name){

	//Changing the backgrounds and titles depending on the tab
	if(name==='MAP'){
		document.getElementById("background").style.backgroundImage = "url('map.jpg')";
		document.getElementById("title").innerHTML='';
		document.getElementById("background").style.height="";
		document.getElementById("btns").style.top= "5%";

 	} else if (name==="HISTORY") {
		document.getElementById("background").style.backgroundImage = "url('history.jpg')";
		document.getElementById("title").innerHTML=name;
		document.getElementById("background").style.height="1540%";
		document.getElementById("btns").style.top= "35%";
 } else {
	  document.getElementById("background").style.backgroundImage = "url('details.png')";
		document.getElementById("title").innerHTML=name;
		document.getElementById("background").style.height="100%";
		document.getElementById("btns").style.top= "35%";
 }

	//Making elements visible or not depending on the tab
	if(name==='HISTORY'){

		$("#js_flag_scroll").children().hide();
		document.getElementById("js_flag_scroll").style.visibility = "hidden";
		document.getElementById("search_bar").style.visibility = "hidden";
		//document.getElementById("flag_slider").style.visibility = "hidden";

		document.getElementById("slider_container").style.visibility = "hidden";
		document.getElementById("competition_container").style.visibility = "hidden";
		document.getElementById("measure_container").style.visibility = "hidden";
	}	else {

		$("#js_flag_scroll").children().show();
		document.getElementById("js_flag_scroll").style.visibility = "visible";
		document.getElementById("search_bar").style.visibility = "visible";
		//document.getElementById("flag_slider").style.visibility = "visible";

		document.getElementById("slider_container").style.visibility = "visible";
		document.getElementById("competition_container").style.visibility = "visible";
		document.getElementById("measure_container").style.visibility = "visible";
	}

	//Switching the measure criterion between one choice to multiple choice depending on the tab
	if(name==="MAP"){
		Array.from(document.getElementById("measure_container").getElementsByTagName('div')).forEach((item, i) => {
			item.getElementsByTagName('input')[0].type="radio";
		});
	} else {
		Array.from(document.getElementById("measure_container").getElementsByTagName('div')).forEach((item, i) => {
			item.getElementsByTagName('input')[0].type="checkbox";
		});
	}
};











//Flag database
let flags;

//todo: modify it in function of the matched number of country in the Search bar
let flag_number = 217;

//Flag loading function
const flag_loader= function(path){
	d3.csv(path).then(function(data) {
		//Assigning the loaded data to the local database
		flags=data;
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


//List of criterions
measures=["Matches Hosted","Goals","Victories","Tournaments Won"];
competitions=["Euro","Friendly","World Cups","African Cup Of Nations"];

//Criterion loading myFunction
const criterion_loader= function(){

	//Reference to the criterion containers
	const measure_ref=document.getElementById("measure_container");
	const competition_ref=document.getElementById("competition_container");

	//Loading all measure criterions
	measures.forEach((item, i) => {

		//Instanciating the radio button + text container
		const container=document.createElement("div");
		container.style.width="20vw";
		container.style.height="3vh";

		//Instanciating the radio button
		const button=document.createElement("input");
		button.id= measures[i]+" button";
		button.type="radio";
		button.name="radio";
		button.style.width="1.5vw";
		button.style.height="1.5vh";

		//Instanciating the label
		const text=document.createElement("label");
		text.style.fontSize="1.5vh";
		text.for=measures[i]+" button";
		text.innerHTML=measures[i];

		//Linking all components together
		container.appendChild(button);
		container.appendChild(text);
		measure_ref.appendChild(container);
	});

	//Loading all competition criterions
	competitions.forEach((item, i) => {
		//Instanciating the checkbox+text container
		const container=document.createElement("div");
		container.style.width="20vw";
		container.style.height="3vh";

		//Instanciating the checkbox
		const button=document.createElement("input");
		button.id= competitions[i]+"button";
		button.type="checkbox";
		button.style.width="1.5vw";
		button.style.height="1.5vh";

		//Instanciating the label
		const text=document.createElement("label");
		text.style.fontSize="1.5vh";
		text.for=competitions[i]+" button";
		text.innerHTML=competitions[i];

		//Linking all components together
		container.appendChild(button);
		container.appendChild(text);
		competition_ref.appendChild(container);
	});
};

//Launch-time runner
whenDocumentLoaded(() => {
	flag_loader("../data/final_flags.csv");
	criterion_loader();
	document.getElementById("background").style.height="1540%";
});
