
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

	//Making the backgrounds and titles visible or not depending on the tab
	if(name==='MAP'){
		document.getElementById("background").style.backgroundImage = "url('map.jpg')";
		document.getElementById("title").innerHTML='';
		document.getElementById("background").style.height="";
		document.getElementById("btns").style.top= "5%";

 	} else if (name==="HISTORY") {
		document.getElementById("background").style.backgroundImage = "url('history.jpg')";
		document.getElementById("title").innerHTML=name;
		document.getElementById("background").style.height="1200%";
		document.getElementById("btns").style.top= "30%";
 } else {
	  document.getElementById("background").style.backgroundImage = 'none';
		document.getElementById("title").innerHTML=name;
		document.getElementById("background").style.height="";
		document.getElementById("btns").style.top= "5%";
 }

	//Making the sliders and criterions visible or not depending on the tab
	if(name==='HISTORY'){
		document.getElementById("flag_slider").style.visibility = "hidden";
		document.getElementById("slider_container").style.visibility = "hidden";
		document.getElementById("competition_container").style.visibility = "hidden";
		document.getElementById("measure_container").style.visibility = "hidden";
	}	else {
		document.getElementById("flag_slider").style.visibility = "visible";
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

//Flag slider index
let flag_index=0;

//Number of visible flags in the slider
const flag_display_count=40;

//Flag image assignment myFunction
const assign_flags= function(){
	//Applying to each row of flags
	let flags_refs=Array.from(document.getElementById("flags").getElementsByTagName("div")).forEach((item, i) => {
		//Removing the current buttons
		item.innerHTML = '';
		//Generating the buttons corresponding to the new index
		for (let j = flag_index+i*Math.ceil(flags.length/3); j < Math.min(flag_display_count+flag_index+i*Math.ceil(flags.length/3),flags.length); j++) {
			const flag = document.createElement("button");
			item.appendChild(flag);
			flag.style.background= "white";
			flag.style.backgroundImage = "url("+flags[j]['ImageURL']+")";
			flag.style.backgroundSize = "100% 100%";
			flag.style.backgroundPosition="center";
			flag.id= "data[i]['Country']";
			flag.style.width=(100/flag_display_count)+"%";
			flag.style.height="100%";
			flag.style.borderRadius="50%";
		}
	});
};

//Flag loading function
const flag_loader= function(path){
	d3.csv(path).then(function(data) {
		//Assigning the loaded data to the local database
		flags=data;
		//Filling the first flags
		assign_flags();
	});
};

//Flag sliding function
const flag_slide= function(amount){
	if((amount+flag_index)>=0 && (amount+flag_index)<flags.length/3+1-flag_display_count){
		flag_index=flag_index+amount;
		assign_flags();
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
		const container=document.createElement("div");
		const button=document.createElement("input");
		const text=document.createElement("label");
		button.id= measures[i]+" button";
		button.type="radio";
		button.name="radio";
		text.style.fontSize="1vw";
		text.for=measures[i]+" button";
		text.innerHTML=measures[i];
		container.appendChild(button);
		container.appendChild(text);
		measure_ref.appendChild(container);
	});

	//Loading all competition criterions
	competitions.forEach((item, i) => {
		const container=document.createElement("div");
		const button=document.createElement("input");
		const text=document.createElement("label");
		container.appendChild(button);
		container.appendChild(text);
		button.id= competitions[i]+" button";
		button.type="checkbox";
		text.style.fontSize="1vw";
		text.for=competitions[i]+" button";
		text.innerHTML=competitions[i];
		competition_ref.appendChild(container);
	});
};

//Launch-time runner
whenDocumentLoaded(() => {
	flag_loader("../data/final_flags.csv");
	criterion_loader();
	document.getElementById("background").style.height="1200%";
});
