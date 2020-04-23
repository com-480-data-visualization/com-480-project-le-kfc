
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

	//Making the map and title visible or not depending on the tab
	if(name=='MAP'){
	 document.getElementById("background").style.backgroundImage = "url('map.png')";
	 document.getElementById("title").innerHTML='';
 } else {
	  document.getElementById("background").style.backgroundImage = 'none';
		document.getElementById("title").innerHTML=name;
 }

	//Making the sliders and criterions visible or not depending on the tab
	if(name=='HISTORY'){
		document.getElementById("flag_slider").style.visibility = "hidden";
		document.getElementById("slider_container").style.visibility = "hidden";
		document.getElementById("criterion_container").style.visibility = "hidden";
	} else if (name=='GLOBAL INFORMATION') {
		document.getElementById("flag_slider").style.visibility = "hidden";
		document.getElementById("slider_container").style.visibility = "visible";
		document.getElementById("criterion_container").style.visibility = "visible";
	}	else {
		document.getElementById("flag_slider").style.visibility = "visible";
		document.getElementById("slider_container").style.visibility = "visible";
		document.getElementById("criterion_container").style.visibility = "visible";
	}
}
//Flag database
let flags;

//Flag slider index
let flag_index=0;

//Number of visible flags in the slider
const flag_display_count=30;

//Flag image assignment myFunction
const assign_flags= function(){
	//Reference to the flag container
	flags_ref=document.getElementById("flags");
	flags_ref.innerHTML = '';
	for (var i = flag_index; i < flag_display_count+flag_index; i++) {
		const flag = document.createElement("button");
		flag.style.background= "white";
		flag.style.backgroundImage = "url("+flags[i]['ImageURL']+")";
		flag.style.backgroundSize = "100% 100%";
		flag.style.backgroundPosition="center";
		flag.id= "data[i]['Country']";
		flag.style.width=(100/flag_display_count)+"%";
		flag.style.height="100%";
		flag.style.borderRadius="50%";
		flags_ref.appendChild(flag);
	}
}

//Flag loading function
const flag_loader= function(path){
	d3.csv(path).then(function(data) {
		//Assigning the loaded data to the local database
		flags=data;
		//Filling the first flags
		assign_flags();
	});
}

//Flag sliding function
const flag_slide= function(amount){
	if((amount+flag_index)>=0 & (amount+flag_index)<flags.length){
		flag_index=flag_index+amount;
		assign_flags();
	}
}

//Launch-time runner
whenDocumentLoaded(() => {
	flag_loader("../data/final_flags.csv")
});
