//Standard initialization function
function whenDocumentLoaded(action) {
	if (document.readyState === "loading") {
		document.addEventListener("DOMContentLoaded", action);
	} else {
		// `DOMContentLoaded` already fired
		action();
	}
}

window.addEventListener('load', function() {
	setTimeout(function(){document.getElementById("buttonHistory").style.opacity = "1"}, 600);
	setTimeout(function(){document.getElementById("buttonMap").style.opacity = "1"}, 600);
	setTimeout(function(){flag_loader("../../data/final_flags.csv")}, 1000);
	setTimeout(function(){document.getElementById("slider_container").style.opacity = "1"}, 3700);
	setTimeout(function(){document.getElementById("search_bar").style.opacity = "1"}, 3700);
	setTimeout(function(){document.getElementById("buttonData").style.opacity = "1"}, 3700);
	setTimeout(function(){document.getElementById("js_flag_scroll").style.opacity = "1"}, 3700);
});



// variable for competition checkboxes management
let disabled_checkboxes = new Set();

// variables for games data loading and D3.js svg bar plots
let games;
let data = null;
let graph_name;



// data loader for games stats
const data_loader = function(path) {
	d3.csv(path).then(function(dataset) {
		//Assigning the loaded data to the local database
		games = dataset;
	});
};

// parsing games stats information
const get_world_data = function(data_i) {
	let retrieved_data = new Array();
	let competition_set = new Set();
	competitions.forEach((item, i) => {
		if (document.getElementById(competitions[i] + " button").checked) {
			competition_set.add(competitions[i]);
		}
	});
	if (competition_set.size == 0) {
		return retrieved_data;
	}

	let teams = new Set();
	data_i.forEach(row => {
			teams.add(row.away_team);
			teams.add(row.home_team);
	});

	let start_year = document.getElementById("slider_text").textContent.substring(0, 4);
	let end_year = document.getElementById("slider_text").textContent.substring(7, 11);

	if (document.getElementById("Matches Played button").checked) {
		graph_name = "Matches Played between " + start_year + " and " + end_year;
		let counter;

		teams.forEach(team => {
				counter = 0;

				games.forEach(row => {
					year = row.date.substring(0, 4);

					if (competition_set.has("All")) {
						if ((row.away_team == team || row.home_team == team) && (year >= start_year) && (year <= end_year)) {
							counter++;
						}
					} else {
						if ((row.away_team == team || row.home_team == team) && (competition_set.has(row.tournament)) && (year >= start_year) && (year <= end_year)) {
							counter++;
						}
					}

				})
				retrieved_data.push({"name": team, "value": counter});
		});

	} else if (document.getElementById("Wins button").checked) {
		graph_name = "Matches won between " + start_year + " and " + end_year;
		let counter;

		teams.forEach(team => {
				counter = 0;

				games.forEach(row => {
					year = row.date.substring(0, 4);

					if (competition_set.has("All")) {
						if ((row.away_team == team || row.home_team == team) && (year >= start_year) && (year <= end_year)) {
							if ((row.away_team == team && parseInt(row.away_score) > parseInt(row.home_score)) || (row.home_team == team && parseInt(row.home_score) > parseInt(row.away_score))) {
								counter++;
							}
						}
					} else {
						if ((row.away_team == team || row.home_team == team) && (competition_set.has(row.tournament)) && (year >= start_year) && (year <= end_year)) {
							if ((row.away_team == team && parseInt(row.away_score) > parseInt(row.home_score)) || (row.home_team == team && parseInt(row.home_score) > parseInt(row.away_score))) {
								counter++;
							}
						}
					}

				})
				retrieved_data.push({"name": team, "value": counter});
		});

	} else if (document.getElementById("Draws button").checked) {
		graph_name = "Draw matches between " + start_year + " and " + end_year;
		let counter;

		teams.forEach(team => {
				counter = 0;

				games.forEach(row => {
					year = row.date.substring(0, 4);

					if (competition_set.has("All")) {
						if ((row.away_team == team || row.home_team == team) && (year >= start_year) && (year <= end_year)) {
							if (parseInt(row.home_score) == parseInt(row.away_score)) {
								counter++;
							}
						}
					} else {
						if ((row.away_team == team || row.home_team == team) && (competition_set.has(row.tournament)) && (year >= start_year) && (year <= end_year)) {
							if (parseInt(row.home_score) == parseInt(row.away_score)) {
								counter++;
							}
						}
					}

				})
				retrieved_data.push({"name": team, "value": counter});
		});

	} else if (document.getElementById("Losses button").checked) {
		graph_name = "Matches Lost between " + start_year + " and " + end_year;
		let counter;

		teams.forEach(team => {
				counter = 0;

				games.forEach(row => {
					year = row.date.substring(0, 4);

					if (competition_set.has("All")) {
						if ((row.away_team == team || row.home_team == team) && (year >= start_year) && (year <= end_year)) {
							if ((row.away_team == team && parseInt(row.away_score) < parseInt(row.home_score)) || (row.home_team == team && parseInt(row.home_score) < parseInt(row.away_score))) {
								counter++;
							}
						}
					} else {
						if ((row.away_team == team || row.home_team == team) && (competition_set.has(row.tournament)) && (year >= start_year) && (year <= end_year)) {
							if ((row.away_team == team && parseInt(row.away_score) < parseInt(row.home_score)) || (row.home_team == team && parseInt(row.home_score) < parseInt(row.away_score))) {
								counter++;
							}
						}
					}

				})
				retrieved_data.push({"name": team, "value": counter});
		});

	} else if (document.getElementById("Goals Scored button").checked) {
		graph_name = "Goals scored between " + start_year + " and " + end_year;
		let counter;

		teams.forEach(team => {
				counter = 0;

				games.forEach(row => {
					year = row.date.substring(0, 4);

					if (competition_set.has("All")) {
						if ((row.away_team == team || row.home_team == team) && (year >= start_year) && (year <= end_year)) {
							if (row.away_team == team) {
								counter += parseInt(row.away_score);
							} else {
								counter += parseInt(row.home_score);
							}
						}
					} else {
						if ((row.away_team == team || row.home_team == team) && (competition_set.has(row.tournament)) && (year >= start_year) && (year <= end_year)) {
							if (row.away_team == team) {
								counter += parseInt(row.away_score);
							} else {
								counter += parseInt(row.home_score);
							}
						}
					}

				})
				retrieved_data.push({"name": team, "value": counter});
		});

	} else if (document.getElementById("Goals Conceded button").checked) {
		graph_name = "Goals conceded between " + start_year + " and " + end_year;
		let counter;

		teams.forEach(team => {
				counter = 0;

				games.forEach(row => {
					year = row.date.substring(0, 4);

					if (competition_set.has("All")) {
						if ((row.away_team == team || row.home_team == team) && (year >= start_year) && (year <= end_year)) {
							if (row.away_team == team) {
								counter += parseInt(row.home_score);
							} else {
								counter += parseInt(row.away_score);
							}
						}
					} else {
						if ((row.away_team == team || row.home_team == team) && (competition_set.has(row.tournament)) && (year >= start_year) && (year <= end_year)) {
							if (row.away_team == team) {
								counter += parseInt(row.home_score);
							} else {
								counter += parseInt(row.away_score);
							}
						}
					}

				})
				retrieved_data.push({"name": team, "value": counter});
		});

	} else if (document.getElementById("Friendly Home Matches Played button").checked) {
		graph_name = "Friendly home matches played between " + start_year + " and " + end_year;
		let counter;

		teams.forEach(team => {
				counter = 0;

				games.forEach(row => {
					year = row.date.substring(0, 4);

					if ((row.home_team == team) && (row.tournament == "Friendly") && (row.neutral == "False") && (year >= start_year) && (year <= end_year)) {
							counter++;
					}

				})
				retrieved_data.push({"name": team, "value": counter});
		});

	} else if (document.getElementById("Friendly Away Matches Played button").checked) {
		graph_name = "Friendly away matches played between " + start_year + " and " + end_year;
		let counter;

		teams.forEach(team => {
				counter = 0;

				games.forEach(row => {
					year = row.date.substring(0, 4);

					if ((row.away_team == team) && (row.tournament == "Friendly") && (row.neutral == "False") && (year >= start_year) && (year <= end_year)) {
							counter++;
					}

				})
				retrieved_data.push({"name": team, "value": counter});
		});

	} else if (document.getElementById("Friendly Neutral Matches Played button").checked) {
		graph_name = "Friendly neutral matches played between " + start_year + " and " + end_year;
		let counter;

		teams.forEach(team => {
				counter = 0;

				games.forEach(row => {
					year = row.date.substring(0, 4);

					if ((row.away_team == team || row.home_team == team) && (row.tournament == "Friendly") && (row.neutral == "True") && (year >= start_year) && (year <= end_year)) {
							counter++;
					}

				})
				retrieved_data.push({"name": team, "value": counter});
		});

	} else if (document.getElementById("Tournament Matches Played button").checked) {
		graph_name = "Tournament matches played between " + start_year + " and " + end_year;
		let counter;

		teams.forEach(team => {
				counter = 0;

				games.forEach(row => {
					year = row.date.substring(0, 4);

					if (competition_set.has("All")) {
						if ((row.away_team == team || row.home_team == team) && (row.tournament != "Friendly") && (year >= start_year) && (year <= end_year)) {
								counter++;
						}
					} else {
						if ((row.away_team == team || row.home_team == team) && (row.tournament != "Friendly") && (competition_set.has(row.tournament)) && (year >= start_year) && (year <= end_year)) {
								counter++;
						}
					}

				})
				retrieved_data.push({"name": team, "value": counter});
		});

	}

	return retrieved_data;
}

// bar plot creation for world section in details tab
const load_data = function() {
	if (document.getElementById("bar_plot_graphic") != null) {
		d3.select("#bar_plot_graphic").remove();
	}

	graph_name = "";

	data = get_world_data(games);

	if (data.length == 0) {
		alert("Please select a criterion and a competition");
		return;
	}

	//sort bars based on value
	data = data.sort(function (a, b) {
	  return d3.ascending(a.value, b.value);
	})

	//set up svg using margin conventions - we'll need plenty of room on the left for labels
	var margin = {
	  top: 26,
	  right: 35,
	  bottom: 0,
	  left: 214
	};

	var width = 1045 - margin.left - margin.right,
	  height = 5000 - margin.top - margin.bottom;

	var svg = d3.select("#graphic").append("svg")
		.attr("id", "bar_plot_graphic")
	  .attr("width", width + margin.left + margin.right)
	  .attr("height", height + margin.top + margin.bottom)
	  .append("g")
	  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

	svg.append("text")
        .attr("x", (width / 2))
        .attr("y", 0 - (margin.top - 40 / 2))
        .attr("text-anchor", "middle")
        .style("font-size", "28px")
				.style("font-weight", "bold")
				.style("fill", "white")
        .text(graph_name);

	var x = d3.scaleLinear()
	  .range([0, width])
	  .domain([0, d3.max(data, function (d) {
	      return d.value;
	  })]);

	var y = d3.scaleBand()
	  .rangeRound([height, 0])
		.padding(0.2)
	  .domain(data.map(function (d) {
	      return d.name;
	  }));

	//make y axis to show bar names
	var yAxis = d3.axisLeft(y)
	  //no tick marks
	  .tickSize(0);

	var gy = svg.append("g")
	  .attr("class", "y axis")
	  .call(yAxis)

	var bars = svg.selectAll(".bar")
	  .data(data)
	  .enter()
	  .append("g")

	var gradient = svg
    .append("linearGradient")
    .attr("x1", 0)
    .attr("x2", 1850)
    .attr("y1", "0")
    .attr("y2", "0")
    .attr("id", "gradient")
    .attr("gradientUnits", "userSpaceOnUse")

	gradient
	    .append("stop")
	    .attr("offset", "0")
	    .attr("stop-color", "#ff0")

	gradient
	    .append("stop")
	    .attr("offset", "0.5")
	    .attr("stop-color", "#f00")

	//append rects
	bars.append("rect")
	  .attr("class", "bar")
	  .attr("y", function (d) {
	      return y(d.name);
	  })
	  .attr("height", y.bandwidth())
	  .attr("x", 0)
	  .attr("width", function (d) {
				return 0;
	  })
		.attr("fill", "url(#gradient)");

	//add a value label to the right of each bar
	bars.append("text")
	  .attr("class", "label")
		.attr("fill", "white")
		.attr("font-weight", "bold")
		.attr("opacity", "0")
	  //y position of the label is halfway down the bar
	  .attr("y", function (d) {
	      return y(d.name) + y.bandwidth() / 2 + 4;
	  })
	  //x position is 3 pixels to the right of the bar
	  .attr("x", function (d) {
	      return x(d.value) + 3;
	  })
	  .text(function (d) {
	      return d.value;
	  });

	// Animation
	svg.selectAll("rect")
	  .transition()
	  .duration(2500)
	  .attr("x", function(d) { return x(d.Value); })
	  .attr("width", function(d) { return x(d.value); })
	  .delay(function(d,i) {
			return(0);
		});

	svg.selectAll("text")
	  .transition()
	  .duration(1000)
	  .attr("opacity", function(d) { return 1; })
	  .delay(function(d,i) {
			return(0);
		});

	bars.selectAll("text")
	  .transition()
	  .duration(3500)
	  .attr("opacity", function(d) { return 1; })
	  .delay(function(d,i) {
			return(0);
		});
}



/*
//Tab change function
const change_tab = function(name) {
	if (name==="HISTORY") {
		window.open("../index.html",'_self');
	}
	else {
		if(name==='MAP'){
			document.getElementById("background").style.backgroundImage = "url('map.jpg')";
			document.getElementById("title").innerHTML='';
			document.getElementById("background").style.height="80vh";
			document.getElementById("btns").style.top= "5vh";
			Array.from(document.getElementById("measure_container").getElementsByTagName('div')).forEach((item, i) => {
				item.getElementsByTagName('input')[0].type="radio";
			});
		}
		else if(name==='DETAILS'){
			document.getElementById("background").style.backgroundImage = "url('details.png')";
			document.getElementById("title").innerHTML=name;
			document.getElementById("background").style.height="100vh";
			document.getElementById("btns").style.top= "35vh";
			Array.from(document.getElementById("measure_container").getElementsByTagName('div')).forEach((item, i) => {
				item.getElementsByTagName('input')[0].type="checkbox";
			});
		}
		$("#js_flag_scroll").children().show();
		document.getElementById("js_flag_scroll").style.visibility = "visible";
		document.getElementById("search_bar").style.visibility = "visible";
		//document.getElementById("flag_slider").style.visibility = "visible";

		document.getElementById("slider_container").style.visibility = "visible";
		document.getElementById("competition_container").style.visibility = "visible";
		document.getElementById("measure_container").style.visibility = "visible";
	}
};
*/



//Flag database
let flags;

//todo: modify it in function of the matched number of country in the Search bar
let flag_number = 215;

//Flag loading function
const flag_loader = function(path) {
	d3.csv(path).then(function(data) {
		//Assigning the loaded data to the local database
		flags=data;
		//Filling the first flags
		assign_flags();
	});
};

const assign_flags = function() {
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

        square.appendChild(button_style);
        if(cnt<flag_number) square2.appendChild(button_style2);
				cnt++;

        wrapper.appendChild(square);
        wrapper.appendChild(square2);
        scrollmenu.appendChild(wrapper);
    }
};



//List of criterions
measures=["Matches Played", "Wins", "Draws", "Losses", "Goals Scored", "Goals Conceded",
					"Friendly Home Matches Played", "Friendly Away Matches Played", "Friendly Neutral Matches Played",
					"Tournament Matches Played", "Major Tournaments Played",
					"Major Tournaments Won", "World Cup Tournaments Played",
					"World Cup Tournaments Won", "UEFA Euro Tournaments Played",
					"UEFA Euro Tournaments Won", "Copa América Tournaments Played",
					"Copa América Tournaments Won", "African Cup of Nations Tournaments Played",
					"African Cup of Nations Tournaments Won", "Gold Cup Tournaments Played",
					"Gold Cup Tournaments Won", "AFC Asian Cup Tournaments Played",
					"AFC Asian Cup Tournaments Won", "Oceania Nations Cup Tournaments Played",
					"Oceania Nations Cup Tournaments Won"];

//List of competitions
competitions=['All', 'Friendly',
							'FIFA World Cup', 'FIFA World Cup qualification',
							'UEFA Euro', 'UEFA Euro qualification',
							'Copa América', 'Copa América qualification',
							'African Cup of Nations', 'African Cup of Nations qualification',
							'Gold Cup', 'Gold Cup qualification',
							'AFC Asian Cup', 'AFC Asian Cup qualification',
							'Oceania Nations Cup', 'Oceania Nations Cup qualification',
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

//Criterion loading myFunction
const criterion_loader = function() {

	//Reference to the criterion containers
	const measure_ref=document.getElementById("measure_container");
	const competition_ref=document.getElementById("competition_container");

	//Loading all measure criterions
	measures.forEach((item, i) => {

		//Instanciating the radio button + text container
		const container=document.createElement("div");
		container.style.width="21vw";
		container.style.height="3vh";
		container.style.direction="ltr";
		container.style.marginRight="0.5vw"
		if (i == 10) {
			container.style.borderTop="0.2vh dashed black";
			container.style.height="3.2vh";
			container.style.width="21vw";
			container.style.marginRight="0.5vw";
		}

		//Instanciating the radio button
		const button=document.createElement("input");
		button.id= measures[i]+" button";
		button.type="radio";
		button.name="radio";
		button.style.width="1.5vw";
		button.style.height="1.5vh";
		button.style.verticalAlign="middle";
		button.style.marginBottom="0.4vh"

		//Instanciating the label
		const text=document.createElement("label");
		text.style.fontSize="1.5vh";
		text.for=measures[i]+" button";
		text.innerHTML=measures[i];
		text.style.color="white";
		text.style.fontWeight="bold";
		text.style.textShadow="0 0 2px black";
		text.style.verticalAlign="middle";

		//Linking all components together
		container.appendChild(button);
		container.appendChild(text);
		measure_ref.appendChild(container);
	});

	//Loading all competition criterions
	competitions.forEach((item, i) => {
		//Instanciating the checkbox+text container
		const container=document.createElement("div");
		container.style.width="21vw";
		container.style.height="3vh";
		container.style.direction="ltr";
		container.style.marginRight="0.5vw"
		if (i == 16) {
			container.style.borderTop="0.2vh dashed black";
			container.style.height="3.2vh";
			container.style.width="21vw";
			container.style.marginRight="0.5vw";
		}

		//Instanciating the checkbox
		const button=document.createElement("input");
		button.id= competitions[i]+" button";
		button.type="checkbox";
		button.style.width="1.5vw";
		button.style.height="1.5vh";
		button.style.verticalAlign="middle";
		button.style.marginBottom="0.4vh"

		//Instanciating the label
		const text=document.createElement("label");
		text.style.fontSize="1.5vh";
		text.for=competitions[i]+" button";
		text.innerHTML=competitions[i];
		text.style.color="white";
		text.style.fontWeight="bold";
		text.style.textShadow="0 0 2px black";
		text.style.verticalAlign="middle";

		//Linking all components together
		container.appendChild(button);
		container.appendChild(text);
		competition_ref.appendChild(container);
	});
};



whenDocumentLoaded(() => {
	data_loader("../../data/final_results.csv"); /* Ajout Vincent */

	criterion_loader();

	//Array.from(document.getElementById("measure_container").getElementsByTagName('div')).forEach((item, i) => { /*Modif Vincent*/
	//	item.getElementsByTagName('input')[0].type="checkbox";
	//});

	document.getElementById("Friendly Home Matches Played button").onclick = function() {
			disabled_checkboxes.clear();
			for(var i=0; i < competitions.length; i++) {
					currBtnId = competitions[i] + " button";
					currBtn = document.getElementById(currBtnId);
					currBtn.checked = false;
					currBtn.disabled = false;
			}
			for(var i=0; i < competitions.length; i++) {
				currBtnId = competitions[i] + " button";
				currBtn = document.getElementById(currBtnId);
				currBtn.disabled = true;
				if (currBtnId == "Friendly button" || currBtnId == "All") {
					currBtn.checked = true;
				}
			}
	};

	document.getElementById("Friendly Away Matches Played button").onclick = function() {
			disabled_checkboxes.clear();
			for(var i=0; i < competitions.length; i++) {
					currBtnId = competitions[i] + " button";
					currBtn = document.getElementById(currBtnId);
					currBtn.checked = false;
					currBtn.disabled = false;
			}
			for(var i=0; i < competitions.length; i++) {
				currBtnId = competitions[i] + " button";
				currBtn = document.getElementById(currBtnId);
				currBtn.disabled = true;
				if (currBtnId == "Friendly button" || currBtnId == "All") {
					currBtn.checked = true;
				}
			}
	};

	document.getElementById("Friendly Neutral Matches Played button").onclick = function() {
			disabled_checkboxes.clear();
			for(var i=0; i < competitions.length; i++) {
					currBtnId = competitions[i] + " button";
					currBtn = document.getElementById(currBtnId);
					currBtn.checked = false;
					currBtn.disabled = false;
			}
			for(var i=0; i < competitions.length; i++) {
				currBtnId = competitions[i] + " button";
				currBtn = document.getElementById(currBtnId);
				currBtn.disabled = true;
				if (currBtnId == "Friendly button" || currBtnId == "All") {
					currBtn.checked = true;
				}
			}
	};

	document.getElementById("Tournament Matches Played button").onclick = function() {
			disabled_checkboxes.clear();
			for(var i=0; i < competitions.length; i++) {
					currBtnId = competitions[i] + " button";
					currBtn = document.getElementById(currBtnId);
					currBtn.checked = false;
					currBtn.disabled = false;
			}
			for(var i=0; i < competitions.length; i++) {
				currBtnId = competitions[i] + " button";
				currBtn = document.getElementById(currBtnId);
				if (currBtnId == "Friendly button") {
					currBtn.disabled = true;
					disabled_checkboxes.add("Friendly button");
				}
			}
	};

	document.getElementById("Matches Played button").onclick = function() {
			disabled_checkboxes.clear();
			for(var i=0; i < competitions.length; i++) {
					currBtnId = competitions[i] + " button";
					currBtn = document.getElementById(currBtnId);
					currBtn.checked = false;
					currBtn.disabled = false;
			}
	};

	document.getElementById("Wins button").onclick = function() {
			disabled_checkboxes.clear();
			for(var i=0; i < competitions.length; i++) {
					currBtnId = competitions[i] + " button";
					currBtn = document.getElementById(currBtnId);
					currBtn.checked = false;
					currBtn.disabled = false;
			}
	};

	document.getElementById("Draws button").onclick = function() {
			disabled_checkboxes.clear();
			for(var i=0; i < competitions.length; i++) {
					currBtnId = competitions[i] + " button";
					currBtn = document.getElementById(currBtnId);
					currBtn.checked = false;
					currBtn.disabled = false;
			}
	};

	document.getElementById("Losses button").onclick = function() {
			disabled_checkboxes.clear();
			for(var i=0; i < competitions.length; i++) {
					currBtnId = competitions[i] + " button";
					currBtn = document.getElementById(currBtnId);
					currBtn.checked = false;
					currBtn.disabled = false;
			}
	};

	document.getElementById("Goals Scored button").onclick = function() {
			disabled_checkboxes.clear();
			for(var i=0; i < competitions.length; i++) {
					currBtnId = competitions[i] + " button";
					currBtn = document.getElementById(currBtnId);
					currBtn.checked = false;
					currBtn.disabled = false;
			}
	};

	document.getElementById("Goals Conceded button").onclick = function() {
			disabled_checkboxes.clear();
			for(var i=0; i < competitions.length; i++) {
					currBtnId = competitions[i] + " button";
					currBtn = document.getElementById(currBtnId);
					currBtn.checked = false;
					currBtn.disabled = false;
			}
	};

	document.getElementById("All button").onclick = function() {
		if (this.checked) {
			for(var i=1; i < competitions.length; i++) {
					currBtnId = competitions[i] + " button";
					currBtn = document.getElementById(currBtnId);
					if(!disabled_checkboxes.has(currBtnId)) {
						currBtn.checked = true;
						currBtn.disabled = true;
					}
			}
		} else {
			for(var i=1; i < competitions.length; i++) {
				currBtnId = competitions[i] + " button";
				currBtn = document.getElementById(currBtnId);
				if(!disabled_checkboxes.has(currBtnId)) {
					currBtn.checked = false;
					currBtn.disabled = false;
				}
			}
		}
	};

});
