/////////////////////////////////////////////////////////////////////////
//INITIALIZATION FUNCTION
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

/////////////////////////////////////////////////////////////////////////
//VARIABLES AND CONSTANTS
/////////////////////////////////////////////////////////////////////////

//List of criterions
measures=["Matches Played", "Wins", "Draws", "Losses", "Goals Scored", "Goals Conceded",
	"Friendly Home Matches Played", "Friendly Away Matches Played", "Friendly Neutral Matches Played",
	"Tournament Matches Played", "Major Tournaments Played", "World Cup Tournaments Won"];
competitions=['All', 'Friendly',
	'FIFA World Cup', 'UEFA Euro', 'Copa América', 'African Cup of Nations', 'Gold Cup', 'AFC Asian Cup', 'Oceania Nations Cup',
	'FIFA World Cup qualification', 'UEFA Euro qualification', 'Copa América qualification', 'African Cup of Nations qualification',
	'Gold Cup qualification', 'AFC Asian Cup qualification',	'Oceania Nations Cup qualification',
	'ABCS Tournament', 'AFC Challenge Cup', 'AFC Challenge Cup qualification',
	'AFF Championship', 'AFF Championship qualification',
	'African Nations Championship', 'African Nations Championship qualification',
	'Amílcar Cabral Cup',	'Atlantic Cup', 'Balkan Cup', 'Baltic Cup',
	'Brazil Independence Cup', 'British Championship',
	'CCCF Championship', 'CECAFA Cup', 'CFU Caribbean Cup',
	'CFU Caribbean Cup qualification', 'CONCACAF Championship',
	'CONCACAF Championship qualification', 'CONCACAF Nations League',
	'CONCACAF Nations League qualification', 'COSAFA Cup',
	'Confederations Cup', 'Copa Artigas', "Copa Bernardo O'Higgins",
	'Copa Carlos Dittborn', 'Copa Chevallier Boutell', 'Copa Félix Bogado',
	'Copa Juan Pinto Durán', 'Copa Lipton', 'Copa Newton',
	'Copa Oswaldo Cruz', 'Copa Paz del Chaco',
	'Copa Premio Honor Argentino', 'Copa Premio Honor Uruguayo',
	'Copa Ramón Castilla', 'Copa Rio Branco', 'Copa Roca',
	'Copa del Pacífico', 'Cyprus International Tournament',
	'Dragon Cup', 'Dunhill Cup', 'Dynasty Cup', 'EAFF Championship',
	'GaNEFo', 'Gulf Cup', 'Indonesia Tournament', 'Intercontinental Cup',
	'International Cup', 'Island Games',
	'Jordan International Tournament', 'King Hassan II Tournament',
	"King's Cup", 'Kirin Cup', 'Korea Cup', 'Lunar New Year Cup',
	'Malta International Tournament', 'Merdeka Tournament',
	'Merlion Cup', 'Millennium Cup', 'Mundialito', 'NAFU Championship',
	'Nations Cup', 'Nehru Cup', 'Nile Basin Tournament',
	'Nordic Championship', 'OSN Cup', 'Pacific Games',
	'Pan American Championship', "Prime Minister's Cup", 'Rous Cup',
	'SAFF Cup', 'SKN Football Festival', 'Simba Tournament',
	'South Pacific Games', 'Tournoi de France', 'UAFA Cup',
	'UAFA Cup qualification', 'UDEAC Cup', 'UEFA Nations League',
	'UNCAF Cup', 'UNIFFAC Cup', 'USA Cup',
	'United Arab Emirates Friendship Tournament', 'VFF Cup',
	'Vietnam Independence Cup', 'WAFF Championship',
	'West African Cup', 'Windward Islands Tournament'];

let flags;
let flags_input = [];
let flag_number;
let target_countries = new Set();
let start_time = 1872;
let end_time = 2020;
let selected_measure=measures[0];
let selected_competitions = new Set();
let db;
let map;
let max=0;
let stat_box= new Map();
/////////////////////////////////////////////////////////////////////////
//HELPER FUNCTIONS
/////////////////////////////////////////////////////////////////////////

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
};

const stats = function(){

	//Filtering the database to include only relavant information
	if(selected_competitions.size==0){
		db_filtered=[];
	} else if (selected_competitions.has("All")){
		db_filtered=db;
	} else {
		db_filtered=db.filter(entry => selected_competitions.has(entry.tournament));
	}
	db_filtered=db_filtered.filter(function(entry){
		year=parseInt(entry.date.substring(0,4),10);
		return (year >= start_time) && (year<= end_time);
	});

	max=0;
	Object.keys(stat_box).forEach((item,i) => {
		db_filtered_country=db_filtered.filter(entry => (entry.home_team==item) || (entry.away_team==item));
		switch (selected_measure) {
			case "Matches Played":
				max=Math.max(max,db_filtered_country.length);
				stat_box[item]=db_filtered_country.length;
				break;
			default:
				stat_box[item]=0;
		}
	});

}
/////////////////////////////////////////////////////////////////////////
//SETUP FUNCTIONS
/////////////////////////////////////////////////////////////////////////
const load_map = function(){
	//Assigns a color to the inputed value
	function getColor(val) {
		const colorScale = d3.scaleLinear().domain([0, max]).range(['rgb(245, 254, 169)', 'rgb(147, 21, 40)']);
		return colorScale(val);
	}

	//Runs when hovering over a country
	function onHover(layer) {

		//Putting the tile in evidence
		layer.setStyle({
			weight: 2,
			fillOpacity: 0.9,
			dashArray: ''
		});

		if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
			layer.bringToFront();
		}

		//Putting the corresponding flag in evidence
		flag=	document.getElementById(layer.feature.properties.name);

		if (flag!=null) {
			flag.style.opacity=0;
			flag.style.background="none";
			flag.style.border="none";

		}

		//Printing the name and value of the country from the hover display box
		let p1 = document.createElement("p");
		let p2 = document.createElement("small");
		p1.appendChild(document.createTextNode(layer.feature.properties.name));
		p2.appendChild(document.createTextNode(layer.feature.properties.val));
		document.getElementById("map_hover").appendChild(p1);
		document.getElementById("map_hover").appendChild(p2);
	}

	//Runs when a country stops being hovered over
	function onHoverEnd(layer) {

		//Deactivates the hovered country's targetting
		if (!layer.feature.properties.clicked){
			layer.setStyle({
					weight: 1,
					fillOpacity: 0.7,
					dashArray: '3'
			});
			geojson.bringToBack(layer);

		}

		//Removes the data of the hovered country from the hover display box
		document.getElementById("map_hover").innerHTML=""

		//Putting the corresponding flag in evidence
		flag=	document.getElementById(layer.feature.properties.name);

		if (flag!=null && !layer.feature.properties.clicked) {
				flag.style="resetStyle";


		}

	}

	//Runs when clicking on a country
	function select(layer) {
		//Activating or deactivating the clicked state
		layer.feature.properties.clicked=!layer.feature.properties.clicked;

		if (layer.feature.properties.clicked) {

			//Adding the name and value of the country from the select box
			let p = document.createElement("small");
			p.style.display="block";
			p.style.textAlign = "left";
			p.id=layer.feature.properties.name+"_display";
			p.appendChild(document.createTextNode(layer.feature.properties.name+" → "+layer.feature.properties.val));
			document.getElementById("map_select_id").appendChild(p);

			//Adding country to targetted countries
			target_countries.add(layer.feature.properties.name);

		} else {

			//Removing the name and value of the country from the select box
			let p=document.getElementById(layer.feature.properties.name+"_display");
			p.parentNode.removeChild(p);

			//Removing country from targetted countries
			target_countries.delete(layer.feature.properties.name);
		}
	}

	//Assigning onHover, onHoverEnd and select to the tiles
	function onEachFeature(feature, layer) {
			layer.feature.properties.clicked = false;
			feature.properties.val=0;
			layer.setStyle(style(feature));
			stat_box[feature.properties.name]=0;

			//Making the countries reactive to actions of the flags
			const flag=document.getElementById(feature.properties.name);
			if(flag!=null){
				flag.addEventListener("click", function(e){select(layer)});
				flag.addEventListener("mouseover", function(e){onHover(layer)});
				flag.addEventListener("mouseout", function(e){onHoverEnd(layer)});
			}

			const update_button=document.getElementById("generate_container");
			update_button.addEventListener("click", function(e){
				feature.properties.val=stat_box[feature.properties.name];
				layer.setStyle(style(feature));
				const max_display=document.getElementById("max_display");
				const min_display=document.getElementById("min_display");
				max_display.innerHTML= max==0 ? "" : max;
				if(max<10000000) {
					min_display.style.fontSize = "8px";
					max_display.style.fontSize = "8px";
				}
				if(max<1000000) {
					min_display.style.fontSize = "9px";
					max_display.style.fontSize = "9px";
				}
				if(max<100000) {
					min_display.style.fontSize = "11px";
					max_display.style.fontSize = "11px";
				}
				if(max<10000) {
					min_display.style.fontSize = "14px";
					max_display.style.fontSize = "14px";
				}
			});

			layer.on({
					mouseover: function(e){onHover(e.target)},
					mouseout:  function(e){onHoverEnd(e.target)},
					click:  function(e){select(e.target)}
			});
	}

	//Assigns visual characteristics to the input tile (ex: color)
	function style(feature) {
		if(feature.properties.clicked){
			return {
				fillColor: getColor(feature.properties.val),
				weight: 2,
				opacity: 1,
				color: 'black',
				dashArray: '',
				fillOpacity: 0.9
			}
		} else {
			return {
					fillColor: getColor(feature.properties.val),
					weight: 1,
					opacity: 1,
					color: 'black',
					dashArray: '3',
					fillOpacity: 0.7
			};
		}
	}

	//Loads the tiles and sets-up the map
	$.ajaxSetup({beforeSend: function(xhr){
			if (xhr.overrideMimeType)
			{
				xhr.overrideMimeType("application/json");
			}
		}
	});

	$.getJSON("map_processed.json",function(data){

		map = L.map('map',{minZoom:1}).setView([50, 0], 3);
		geojson=L.geoJson(data, {
			onEachFeature: onEachFeature,
			style: style
		}).addTo(map);

	})
}

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
		button_style.clicked=target_countries.has(flags[cnt]['Country']);
		if(button_style.clicked){
			button_style.style.opacity=0;
			button_style.style.background="none";
			button_style.style.border="none";
		}
		button_style.addEventListener('click',function(e){
			flag=e.target;
			flag.clicked=!flag.clicked;
			if (flag.clicked){
				//Adding country to targetted countries
				target_countries.add(flag.id);
				flag.style.opacity=0;
				flag.style.background="none";
				flag.style.border="none";
			} else {
				//Removing country from targetted countries
				target_countries.delete(flag.id);
				flag.style="resetStyle";
			}
		})
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
			button_style2.clicked=target_countries.has(flags[cnt]['Country']);
			if(button_style2.clicked){
				button_style2.style.opacity=0;
				button_style2.style.background="none";
				button_style2.style.border="none";
			}
			button_style2.addEventListener('click',function(e){
				flag=e.target;
				flag.clicked=!flag.clicked;
				if (flag.clicked){
					//Adding country to targetted countries
					target_countries.add(flag.id);
					flag.style.opacity=0;
					flag.style.background="none";
					flag.style.border="none";
				} else {
					//Removing country from targetted countries
					target_countries.delete(flag.id);
					flag.style="resetStyle";
				}
			})
		}

		cnt++;

		square.appendChild(button_style);
		if(cnt<=flag_number) square2.appendChild(button_style2);
		wrapper.appendChild(square);
		wrapper.appendChild(square2);
		scrollmenu.appendChild(wrapper);
	}
	load_map();
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
		input.id= measures[i]+" button";
		input.addEventListener("click", function(e){
			measure=e.target;
			selected_measure=measure.parentNode.childNodes[1].innerHTML;
			stats();
		})

		if (i==0){
			input.checked=true;
		}
		label.appendChild(input);
		const small = document.createElement("small");
		small.innerHTML = item;
		label.appendChild(small);
		content_meas.appendChild(label);
		measure_ref.appendChild(content_meas);

	});
	measure_ref.appendChild(content_meas);

	const content_comp = document.createElement("div");
	content_comp.classList.add("content");
	//Loading all competition criterions
	competitions.forEach((item, i) => {

		if(i===16){
			const small = document.createElement("small");
			small.innerHTML = '<hr>';
			content_comp.appendChild(small);
		}
		const label = document.createElement("label");
		const input = document.createElement('input');
		input.type = "checkbox"; //checkbox or radio
		input.classList.add("option-input");
		input.classList.add("checkbox"); //checkbox or radio
		input.id= competitions[i]+" button";
		input.addEventListener("click", function(e){
			competition=e.target;

			if(competition.parentNode.childNodes[1].firstChild.data=="All"){

					const buttons = document.getElementById("competition_container").elements;

					if(!selected_competitions.has("All")){
						for (let i = 0, len = buttons.length; i < len; i++ ) {
							buttons[i].disabled=true;
							buttons[i].checked=false;
						}
						competition.checked=true;
						competition.disabled=false;
						selected_competitions= new Set();
						selected_competitions.add(competition.parentNode.childNodes[1].firstChild.data);
					} else {
						for (let i = 0, len = buttons.length; i < len; i++ ) {
							buttons[i].disabled=false;
						}
						selected_competitions= new Set();
					}

			}else if(competition.checked && !selected_competitions.has("All")){
				selected_competitions.add(competition.parentNode.childNodes[1].firstChild.data);
			} else {
				selected_competitions.delete(competition.parentNode.childNodes[1].firstChild.data);
			}
			stats();
		});
		label.appendChild(input);
		const small = document.createElement("small");
		small.innerHTML = item;
		label.appendChild(small);
		content_comp.appendChild(label);

	});
	competition_ref.appendChild(content_comp);

};


const slider_setup= function(){
	$( function() {
		$( "#slider-range" ).slider({
			range: true,
			min: 1872,
			max: 2020,
			values: [ 1872, 2020 ],
			slide: function( event, ui ) {
				$( "#amount" ).val( "$" + ui.values[ 0 ] + " - $" + ui.values[ 1 ] );
				$( "#slider_text" ).html(ui.values[ 0 ]+" - "+ui.values[ 1 ]);

				//Updating the time pointers
				start_time=ui.values[ 0 ];
				end_time=ui.values[ 1 ];
			}
		});
		$( "#amount" ).val( "$" + $( "#slider-range" ).slider( "values", 0 ) +
			" - $" + $( "#slider-range" ).slider( "values", 1 ) );

		time_slider_comp=document.getElementById("slider-range").childNodes;
		time_slider_comp.forEach((item, i) => {
			item.addEventListener("click", event => stats());
		});

	});
}

const data_loader = function(path){

	d3.csv(path).then(function(data) {
		//Assigning the loaded data to the local database
		db=data;
	});
}
/////////////////////////////////////////////////////////////////////////
//RUN TIME FUNCTION
/////////////////////////////////////////////////////////////////////////
//Launch-time runner
whenDocumentLoaded(() => {

	//Loading the flags
	flag_loader("../../data/final_flags.csv");

	//Loading the dataset
	data_loader("../../data/final_results.csv");

	//Setting-up the criterion selectors
	criterion_loader();

	//Seting-up the time slider
	slider_setup();


});
