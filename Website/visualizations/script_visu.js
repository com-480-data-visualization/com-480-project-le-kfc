/////////////////////////////////////////////////////////////////////////
//CONSTANTS
/////////////////////////////////////////////////////////////////////////

let flags;
let flags_input = [];
let flag_number;

//List of criterions
measures=["Matches Hosted","Goals","Victories","Tournaments Won", "TESSSSSSSSTTTTTTTTTTTTTTTTTTTTTTTTTTT", "TEST", "TEST", "TEST", "TEST", "TEST", "TEST", "TEST"];
competitions=["Euro","Friendly","World Cups","African Cup Of Nations"];

/////////////////////////////////////////////////////////////////////////
//HELPER FUNCTIONS
/////////////////////////////////////////////////////////////////////////

//Standard initialization function
function whenDocumentLoaded(action) {
	if (document.readyState === "loading") {
		document.addEventListener("DOMContentLoaded", action);
	} else {
		// `DOMContentLoaded` already fired
		action();
	}
}

//Load the flags with input filter
function input_listener() {
	let input =  document.getElementById("search_bar").value.toLowerCase();

	flags_input = [];
	flags.forEach(row => {
		if(row.Country.substring(0, input.length).toLowerCase()===input) {
			flags_input.push(row);
		}
	});
	flag_number = flags_input.length;


	//Loading the flags
	assign_flags(flags_input, flag_number)
}


//Tab change function
const change_tab= function(name){
	if (name==="HISTORY") {
		window.open("../index.html",'_self');
	}
	else if(name==="DETAILS") {
		window.open("../details/index_details.html",'_self');
	}
	/*else {
		if(name==='MAP'){
			document.getElementById("title").innerHTML='';
			document.getElementById("map").style.visibility= "visible";
			document.getElementById("map_hover").style.visibility= "visible";
			document.getElementById("map_select").style.visibility= "visible";
			Array.from(document.getElementById("measure_container").getElementsByTagName('div')).forEach((item, i) => {
				item.getElementsByTagName('input')[0].type="radio";
			});
		}
		else if(name==='DETAILS'){
			document.getElementById("title").innerHTML=name;
			document.getElementById("map").style.visibility= "hidden";
			document.getElementById("map_hover").style.visibility= "hidden";
			document.getElementById("map_select").style.visibility= "hidden";
			Array.from(document.getElementById("measure_container").getElementsByTagName('div')).forEach((item, i) => {
				item.getElementsByTagName('input')[0].type="checkbox";
			});
		}
	}*/
};

//Assigns a color to the inputed value
function getColor(d) {
		return d > 100000000 ? '#800026' :
					 d > 50000000  ? '#BD0026' :
					 d > 20000000  ? '#E31A1C' :
					 d > 10000000  ? '#FC4E2A' :
					 d > 5000000   ? '#FD8D3C' :
					 d > 1000000   ? '#FEB24C' :
					 d > 500000   ? '#FED976' :
											'#FFEDA0';
}

/////////////////////////////////////////////////////////////////////////
//SETUP FUNCTIONS
/////////////////////////////////////////////////////////////////////////

const assign_flags= function(flags, flag_number){
	//Reference to the flag container
	let scrollmenu = document.getElementById("js_flag_scroll");
	scrollmenu.classList.add("flag-slider");
	//Delete all childs
	scrollmenu.innerHTML = '';

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
		button_style.id=flags[cnt]['Country'];
		cnt++;

		// bottom flag
		const square2 = document.createElement("div");
		square2.classList.add('square');
		if(cnt<flag_number) square2.innerHTML = "<img src=\""+flags[cnt]['ImageURL']+"\">";
		const button_style2 = document.createElement("div");
		button_style2.classList.add('button-style');
		if(cnt<flag_number) {
			button_style2.innerHTML = flags[cnt]['Country'].substring(0, 3).toUpperCase();
			button_style2.id=flags[cnt]['Country'];
		}

		cnt++;

		square.appendChild(button_style);
		if(cnt<=flag_number) square2.appendChild(button_style2);
		wrapper.appendChild(square);
		wrapper.appendChild(square2);
		scrollmenu.appendChild(wrapper);
	}
};

//Flag loading function
const flag_loader= function(path){
	d3.csv(path).then(function(data) {
		//Assigning the loaded data to the local database
		flags=data;
		//Filling the flags without filtration
		flag_number = flags.length;
		assign_flags(flags, flag_number);
	});

};

//Criterion loading myFunction
const criterion_loader= function(){

	//Reference to the criterion containers
	const measure_ref=document.getElementById("measure_container");
	const competition_ref=document.getElementById("competition_container");

	const content_meas = document.createElement("div");
	content_meas.classList.add("content");
	//Loading all measure criterions
	measures.forEach((item, i) => {

		const label = document.createElement("label");
		const input = document.createElement('input');
		input.type = "radio"; //checkbox or radio
		input.classList.add("option-input");
		input.classList.add("radio"); //checkbox or radio
		input.name = "example" //only for radios
		label.appendChild(input);
		const small = document.createElement("small");
		small.innerHTML = item;
		label.appendChild(small);
		content_meas.appendChild(label);
	});
	measure_ref.appendChild(content_meas);

	const content_comp = document.createElement("div");
	content_comp.classList.add("content");
	//Loading all competition criterions
	competitions.forEach((item, i) => {
		const label = document.createElement("label");
		const input = document.createElement('input');
		input.type = "checkbox"; //checkbox or radio
		input.classList.add("option-input");
		input.classList.add("checkbox"); //checkbox or radio
		label.appendChild(input);
		const small = document.createElement("small");
		small.innerHTML = item;
		label.appendChild(small);
		content_comp.appendChild(label);
	});
	competition_ref.appendChild(content_comp);

};

/////////////////////////////////////////////////////////////////////////
//RUN TIME FUNCTION
/////////////////////////////////////////////////////////////////////////
//Launch-time runner
whenDocumentLoaded(() => {

	//Loading the flags
	flag_loader("../../data/final_flags.csv");

	//Setting-up the criterion selectors
	criterion_loader();
});
