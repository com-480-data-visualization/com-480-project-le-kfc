
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
	if(name=='MAP'){
	 document.getElementById("background").style.backgroundImage = "url('map.png')";
	 document.getElementById("title").innerHTML='';
 } else {
	  document.getElementById("background").style.backgroundImage = 'none';
		document.getElementById("title").innerHTML=name;
 }
}

//Flag loading function
const flag_loader= function(path){
	d3.csv(path).then(function(data) {
		flag_container=document.getElementById("flags");

	  data.forEach((item, i) => {
			const flag = document.createElement("button");
			flag.style.background= "rgba(0,0,0,0)";
			flag.style.backgroundImage = "url("+item['ImageURL']+")";
			flag.style.backgroundSize = "50px 50px";
			flag.id= item['Country'];
			flag.style.width="50px";
			flag.style.height="50px";
			flag_container.appendChild(flag);
	  });

});

}

//Launch-time runner
whenDocumentLoaded(() => {
	flag_loader("../data/final_flags.csv")
});
