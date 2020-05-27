//Standard initialization function
function whenDocumentLoaded(action) {
	if (document.readyState === "loading") {
		document.addEventListener("DOMContentLoaded", action);
	} else {
		// `DOMContentLoaded` already fired
		action();
	}
}

const change_tab= function(name) {
	if (name === "HISTORY") {
		window.open("../index.html", '_self');
	} else if (name === "MAP") {
		window.open("../visualizations/index_visu.html", '_self');
	}
}

//Events launched after page as finished loading
window.addEventListener('load', function() {
	setTimeout(function(){flag_loader("../../data/final_flags.csv")}, 1000);
	setTimeout(function(){document.getElementById("slider_container").style.opacity = "1"}, 3700);
	setTimeout(function(){document.getElementById("search_bar").style.opacity = "1"}, 3700);
	setTimeout(function(){document.getElementById("buttonData").style.opacity = "1"}, 3700);
	setTimeout(function(){document.getElementById("buttonWorldMode").style.opacity = "1"}, 3700);
	setTimeout(function(){document.getElementById("js_flag_scroll").style.opacity = "1"}, 3700);
});

// variable for competition checkboxes and flag buttons management
let disabled_checkboxes = new Set();
let currBtnTeamId = null;

// variables for games data loading and D3.js svg bar plots and their title
let games;
let data = null;
let graph_name;

// variables used for the two teams comparison case
let currBtnTeamId2 = null;
let temp;

// function triggered when modifying the first team in the two teams comparison section
function changeVS1() {
	let i;
// Resetting radio buttons and checkboxes
	disabled_checkboxes.clear();
	for(i = 0; i < measures.length; i++) {
		currBtnId = measures[i] + " button";
		currBtn = document.getElementById(currBtnId);
		currBtn.checked = false;
		currBtn.disabled = false;
	}
	for(i = 0; i < competitions.length; i++) {
		currBtnId = competitions[i] + " button";
		currBtn = document.getElementById(currBtnId);
		currBtn.checked = false;
		currBtn.disabled = false;
	}
	document.getElementById("shadowFocus").style.display = "block";
	currBtnTeamId = null;
	document.getElementById("buttonWorldMode").disabled = true;
	document.getElementById("buttonCancelVS").disabled = true;
	document.getElementById("flagVS1").style.pointerEvents = "none";
	document.getElementById("flagVS2").style.pointerEvents = "none";
}

// function triggered when modifying the second team in the two teams comparison section
function changeVS2() {
	let i;
	disabled_checkboxes.clear();
	for(i = 0; i < measures.length; i++) {
		currBtnId = measures[i] + " button";
		currBtn = document.getElementById(currBtnId);
		currBtn.checked = false;
		currBtn.disabled = false;
	}
	for(i = 0; i < competitions.length; i++) {
		currBtnId = competitions[i] + " button";
		currBtn = document.getElementById(currBtnId);
		currBtn.checked = false;
		currBtn.disabled = false;
	}
	document.getElementById("shadowFocus").style.display = "block";
	currBtnTeamId2 = null;
	document.getElementById("buttonWorldMode").disabled = true;
	document.getElementById("buttonCancelVS").disabled = true;
	document.getElementById("flagVS1").style.pointerEvents = "none";
	document.getElementById("flagVS2").style.pointerEvents = "none";
}

// function triggered when changing the team selection in the two teams comparison section
function changeVS(newFlag) {
	if (currBtnTeamId == null) {
		if (newFlag === currBtnTeamId2) {
			alert("Please choose a team different than the other one");
			changeVS1();
		} else {
			currBtnTeamId = newFlag;
			document.getElementById("nameCountry1").innerHTML = currBtnTeamId;
			for (i=0; i<flag_number; i++) {
				if (flags[i]['Country'] === currBtnTeamId) {
					document.getElementById("flagVS1").innerHTML = "<img src=\""+flags[i]['ImageURL']+"\">";
					break;
				}
			}
		}
	} else if (currBtnTeamId2 == null) {
		if (newFlag === currBtnTeamId) {
			alert("Please choose a team different than the other one");
			changeVS2()
		} else {
			currBtnTeamId2 = newFlag;
			document.getElementById("nameCountry2").innerHTML = currBtnTeamId2;
			for (i=0; i<flag_number; i++) {
				if (flags[i]['Country'] === currBtnTeamId2) {
					document.getElementById("flagVS2").innerHTML = "<img src=\""+flags[i]['ImageURL']+"\">";
					break;
				}
			}
		}
	}
}

// function triggered when entering in two teams comparison section
function triggerVS() {
	let i;
	disabled_checkboxes.clear();
	for(i = 0; i < measures.length; i++) {
		currBtnId = measures[i] + " button";
		currBtn = document.getElementById(currBtnId);
		currBtn.checked = false;
		currBtn.disabled = false;
	}
	for(i = 0; i < competitions.length; i++) {
		currBtnId = competitions[i] + " button";
		currBtn = document.getElementById(currBtnId);
		currBtn.checked = false;
		currBtn.disabled = false;
	}

	document.getElementById("dataBoard").style.display = "none";
	document.getElementById("dataTeam").style.display = "none";
	document.getElementById("dataVS").style.display = "block";

	for (i=0; i<flag_number; i++) {
		if (flags[i]['Country'] === currBtnTeamId) {
			document.getElementById("flagVS1").innerHTML = "<img src=\""+flags[i]['ImageURL']+"\">";
			break;
		}
	}
	document.getElementById("nameCountry1").innerHTML = currBtnTeamId;

	document.getElementById("shadowFocus").style.display = "block";
	document.getElementById("buttonWorldMode").disabled = true;
	document.getElementById("buttonCancelVS").disabled = true;
	document.getElementById("flagVS1").style.pointerEvents = "none";
	document.getElementById("flagVS2").style.pointerEvents = "none";
	currBtnTeamId2 = null;
}

// function triggered when exiting the two teams comparison section
function cancelVS() {
	temp = currBtnTeamId;
	currBtnTeamId = null;
	currBtnTeamId2 = null;
	document.getElementById("flagVS1").innerHTML = "";
	document.getElementById("flagVS2").innerHTML = "";
	document.getElementById("nameCountry1").innerHTML = "";
	document.getElementById("nameCountry2").innerHTML = "";
	set_team(temp);
}

// function triggered when a country is selected
function set_team(newCountry) {
	let i;
	if (document.getElementById("shadowFocus").style.display === "block") {

		document.getElementById("shadowFocus").style.display = "none";
		document.getElementById("buttonWorldMode").disabled = false;
		document.getElementById("buttonCancelVS").disabled = false;
		document.getElementById("flagVS1").style.pointerEvents = "auto";
		document.getElementById("flagVS2").style.pointerEvents = "auto";
		changeVS(newCountry);

	} else { // We are entering in one team bar plot section

		// Removing existing bar plots
		if (document.getElementById("bar_plot_graphic_team") != null) {
			d3.select("#bar_plot_graphic_team").remove();
		}

		// Resetting radio buttons and checkboxes, and transforming radio button into checkboxes for the single team bar plot section
		Array.from(document.getElementById("measure_container").getElementsByTagName('div')).forEach((item, i) => {
			item.getElementsByTagName('input')[0].type="checkbox";
		});
		if (currBtnTeamId == null) {
			disabled_checkboxes.clear();
			for(i = 0; i < measures.length; i++) {
				currBtnId = measures[i] + " button";
				currBtn = document.getElementById(currBtnId);
				currBtn.checked = false;
				currBtn.disabled = false;
			}
			for(i = 0; i < competitions.length; i++) {
				currBtnId = competitions[i] + " button";
				currBtn = document.getElementById(currBtnId);
				currBtn.checked = false;
				currBtn.disabled = false;
			}
		}

		if (currBtnTeamId !== newCountry) {
			let prev = currBtnTeamId;
			currBtnTeamId = newCountry;

			document.getElementById("dataBoard").style.display = "none";
			document.getElementById("dataTeam").style.display = "block";
			document.getElementById("dataVS").style.display = "none";

			document.getElementById("buttonData").style.visibility = "hidden";
			document.getElementById("buttonWorldMode").style.visibility = "visible";

			document.getElementById("graphTitleOneTeam").innerHTML = currBtnTeamId;

			for (i=0; i<flag_number; i++) {
				if (flags[i]['Country'] === currBtnTeamId) {
					document.getElementById("flagTeam").innerHTML = "<img src=\""+flags[i]['ImageURL']+"\">";
					break;
				}
			}

			// we don't load immediately a bar plot when entering in the section since no criterion nor competition is selected
			if (prev == null) {
				data = null;
			} else {
				// we now load the data immediately at the moment a parameter is modified
				load_data();
			}
		}
	}
}

// function triggered when entering world mode which is the section with bar plots of every team and focused on exclusively one criterion at a time
const world_mode = function() {
	let i;
	document.getElementById("flagVS1").innerHTML = "";
	document.getElementById("flagVS2").innerHTML = "";
	document.getElementById("nameCountry1").innerHTML = "";
	document.getElementById("nameCountry2").innerHTML = "";

	// Removing existing bar plot
	if (document.getElementById("bar_plot_graphic") != null) {
		d3.select("#bar_plot_graphic").remove();
	}

	// Resetting radio buttons and checkboxes, and transforming checkboxes button into radios for the world bar plot section
	Array.from(document.getElementById("measure_container").getElementsByTagName('div')).forEach((item, i) => { /*Modif Vincent*/
		item.getElementsByTagName('input')[0].type="radio";
	});
	disabled_checkboxes.clear();
	let currBtnId;
	let currBtn;
	for (i = 0; i < measures.length; i++) {
		currBtnId = measures[i] + " button";
		currBtn = document.getElementById(currBtnId);
		currBtn.checked = false;
		currBtn.disabled = false;
	}
	for(i = 0; i < competitions.length; i++) {
		currBtnId = competitions[i] + " button";
		currBtn = document.getElementById(currBtnId);
		currBtn.checked = false;
		currBtn.disabled = false;
	}

	currBtnTeamId = null;
	currBtnTeamId2 = null;
	data = null;
	document.getElementById("dataTeam").style.display = "none";
	document.getElementById("dataBoard").style.display = "block";
	document.getElementById("dataVS").style.display = "none";

	document.getElementById("buttonData").style.visibility = "visible";
	document.getElementById("buttonWorldMode").style.visibility = "hidden";
}

// data loader for games stats
const data_loader = function(path) {
	d3.csv(path).then(function(dataset) {
		//Assigning the loaded data to the local database
		games = dataset;
	});
};

// launch the corresponding data parsing function according to the section we are
const load_data = function() {
	if (currBtnTeamId == null) {
		load_data_world();
	} else if (currBtnTeamId2 == null) {
		load_data_one_country()
	} else {
		load_data_two_countries()
	}
}

// data parsing for two teams comparison section
const load_data_two_countries = function() {

	// Removing existing bar plots
	if (document.getElementById("bar_plot_graphic_team") != null) {
		d3.select("#bar_plot_graphic_team").remove();
	}
	if (document.getElementById("bar_plot_graphic") != null) {
		d3.select("#bar_plot_graphic").remove();
	}

	let data1 = get_one_country_data(games, currBtnTeamId);
	let data2 = get_one_country_data(games, currBtnTeamId2);

	if (data1.length === 0 || data2.length === 0) {
		data1 = null;
		data2 = null;
	}

	//TODO : Create div and elements to display the statistics retrieved from the two data variables
}

// data parsing for one team comparison section
const get_one_country_data = function(data_i, chosen_team) {
	let retrieved_data = [];
	let measure_set = new Set();
	let competition_set = new Set();

	// getting measure parameters
	measures.forEach((item, i) => {
		if (document.getElementById(measures[i] + " button").checked) {
			measure_set.add(measures[i]);
		}
	});

	// getting competition parameters
	competitions.forEach((item, i) => {
		if (document.getElementById(competitions[i] + " button").checked) {
			competition_set.add(competitions[i]);
		}
	});

	// Do nothing if the user didn't select any criterion no competition
	if (measure_set.size === 0 || competition_set.size === 0) {
		return retrieved_data;
	}

	// handle a small issue with the speciall competition checkbox "All" which checks and uncheck automatically every other competition checkboxes
	if (competition_set.has("All")) {
		competitions.forEach((item, i) => {
			if (i !== 0) {
				competition_set.add(competitions[i]);
			}
		});
	}

	let team = chosen_team;

	let year;
	let start_year = document.getElementById("slider_text").textContent.substring(0, 4);
	let end_year = document.getElementById("slider_text").textContent.substring(7, 11);

	document.getElementById("graphTitleOneTeam").innerHTML = currBtnTeamId +
		" team statistics between " +
		start_year +
		" and " +
		end_year;

	let wc_winners = [{"country": "Brazil", "wins": [1958, 1962, 1970, 1994, 2002]},
		{"country": "Germany", "wins": [1954, 1974, 1990, 2014]},
		{"country": "Italy", "wins": [1934, 1938, 1982, 2006]},
		{"country": "France", "wins": [1998, 2018]},
		{"country": "Argentina", "wins": [1978, 1986]},
		{"country": "Uruguay", "wins": [1930, 1950]},
		{"country": "Spain", "wins": [2010]},
		{"country": "England", "wins": [1966]}];

	let counter;
	let valid_years;
	let found;

	measure_set.forEach(measure => {
		counter = 0;
		valid_years = new Set();
		found = 0;

		games.forEach(row => {
			if (row.away_team === team || row.home_team === team) {
				year = row.date.substring(0, 4);
				if ((year >= start_year) && (year <= end_year)) {
					if (competition_set.has(row.tournament)) {

						if (measure === "Matches Played") {
							counter++;
						} else if (measure === "Wins") {
							if ((row.away_team === team && parseInt(row.away_score) > parseInt(row.home_score)) || (row.home_team === team && parseInt(row.away_score) < parseInt(row.home_score))) {
								counter++;
							}
						} else if (measure === "Draws") {
							if (parseInt(row.away_score) === parseInt(row.home_score)) {
								counter++;
							}
						} else if (measure === "Losses") {
							if ((row.away_team === team && parseInt(row.away_score) < parseInt(row.home_score)) || (row.home_team === team && parseInt(row.away_score) > parseInt(row.home_score))) {
								counter++;
							}
						} else if (measure === "Goals Scored") {
							if (row.away_team === team) {
								counter += parseInt(row.away_score);
							} else {
								counter += parseInt(row.home_score);
							}
						} else if (measure === "Goals Conceded") {
							if (row.home_team === team) {
								counter += parseInt(row.away_score);
							} else {
								counter += parseInt(row.home_score);
							}
						} else if (measure === "Friendly Home Matches Played") {
							if (row.tournament === "Friendly" && row.home_team === team) {
								counter++;
							}
						} else if (measure === "Friendly Away Matches Played") {
							if (row.tournament === "Friendly" && row.away_team === team) {
								counter++;
							}
						} else if (measure === "Friendly Neutral Matches Played") {
							if (row.tournament === "Friendly" && row.neutral === "True") {
								counter++;
							}
						} else if (measure === "Tournament Matches Played") {
							if (row.tournament !== "Friendly") {
								counter++;
							}
						} else if (measure === "Major Tournaments Played") {
							if (row.tournament === "FIFA World Cup" || row.tournament === "UEFA Euro" ||
								row.tournament === "Copa América" || row.tournament === "African Cup of Nations" ||
								row.tournament === "Gold Cup" || row.tournament === "AFC Asian Cup" || row.tournament === "Oceania Nations Cup") {

								valid_years.add(year);
							}
						} else if (measure === "World Cup Tournaments Won") {
							if (found === 0) {
								for (let i=0; i < wc_winners.length; i++) {
									if (team === wc_winners[i]["country"]) {
										found = 1;
										for (let j=0; j < wc_winners[i]["wins"].length; j++) {
											if (wc_winners[i]["wins"][j] >= start_year && wc_winners[i]["wins"][j] <= end_year) {
												counter++;
											}
										}
										break;
									}
								}
							}
						}

					}
				}
			}

		});

		if (measure === "Major Tournaments Played") {
			counter = valid_years.size
		}

		retrieved_data.push({"name": measure, "value": counter});
	});

	return retrieved_data;
}

// bar plot creation for one country comparison section
const load_data_one_country = function() {

	// removing existing bar plots
	if (document.getElementById("bar_plot_graphic_team") != null) {
		d3.select("#bar_plot_graphic_team").remove();
	}
	if (document.getElementById("bar_plot_graphic") != null) {
		d3.select("#bar_plot_graphic").remove();
	}

	data = get_one_country_data(games, currBtnTeamId);

	// do nothing if there is no data corresponding to the selected filters
	if (data.length === 0) {
		document.getElementById("graphTitleOneTeam").innerHTML = currBtnTeamId;
		data = null;
		return;
	}

	// sort bars based on value
	data = data.sort(function (a, b) {
		return d3.ascending(a.value, b.value);
	})

	//set up svg with margins
	const margin = {
		top: 0,
		right: 35,
		bottom: 0,
		left: 214
	};

	const width = 1000 - margin.left - margin.right,
		height = 30 * data.length - margin.top - margin.bottom;

	const svg = d3.select("#graphicTeam").append("svg")
		.attr("id", "bar_plot_graphic_team")
		.attr("width", width + margin.left + margin.right)
		.attr("height", height + margin.top + margin.bottom)
		.append("g")
		.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

	const x = d3.scaleLinear()
		.range([0, width])
		.domain([0, d3.max(data, function (d) {
			return d.value;
		})]);

	const y = d3.scaleBand()
		.rangeRound([height, 0])
		.padding(0.2)
		.domain(data.map(function (d) {
			return d.name;
		}));

	// make y axis to show bar names
	const yAxis = d3.axisLeft(y)
		.tickSize(0);

	const gy = svg.append("g")
		.attr("class", "y axis")
		.call(yAxis);

	const bars = svg.selectAll(".bar")
		.data(data)
		.enter()
		.append("g");

	// apply gradient on bars
	const gradient = svg
		.append("linearGradient")
		.attr("x1", 0)
		.attr("x2", 1850)
		.attr("y1", "0")
		.attr("y2", "0")
		.attr("id", "gradient")
		.attr("gradientUnits", "userSpaceOnUse");

	gradient
		.append("stop")
		.attr("offset", "0")
		.attr("stop-color", "#ff0")

	gradient
		.append("stop")
		.attr("offset", "0.5")
		.attr("stop-color", "#f00")

	// append rects
	bars.append("rect")
		.attr("class", "bar")
		.attr("y", function (d) {
			return y(d.name);
		})
		.attr("height", 20)
		.attr("x", 0)
		.attr("width", function (d) {
			return 0;
		})
		.attr("fill", "url(#gradient)");

	// add a value label to the right of each bar
	bars.append("text")
		.attr("class", "label")
		.attr("fill", "white")
		.attr("font-weight", "bold")
		.attr("opacity", "0")
		.attr("y", function (d) {
			return y(d.name) + y.bandwidth() / 2 + 4;
		})
		.attr("x", function (d) {
			return x(d.value) + 3;
		})
		.text(function (d) {
			return d.value;
		});

	// add animations on plot
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

// parsing games stats information for world section
const get_world_data = function(data_i) {
	let retrieved_data = [];
	let competition_set = new Set();

	// getting competition parameters onlu since criterions are now radio button because we only manage one criterion at a time
	competitions.forEach((item, i) => {
		if (document.getElementById(competitions[i] + " button").checked) {
			competition_set.add(competitions[i]);
		}
	});

	// Do nothing if no competition is selected
	if (competition_set.size === 0) {
		return retrieved_data;
	}

	// add all the existing teams to a set
	let teams = new Set();
	data_i.forEach(row => {
		teams.add(row.away_team);
		teams.add(row.home_team);
	});

	let year;
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
					if ((row.away_team === team || row.home_team === team) && (year >= start_year) && (year <= end_year)) {
						counter++;
					}
				} else {
					if ((row.away_team === team || row.home_team === team) && (competition_set.has(row.tournament)) && (year >= start_year) && (year <= end_year)) {
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
					if ((row.away_team === team || row.home_team === team) && (year >= start_year) && (year <= end_year)) {
						if ((row.away_team === team && parseInt(row.away_score) > parseInt(row.home_score)) || (row.home_team === team && parseInt(row.home_score) > parseInt(row.away_score))) {
							counter++;
						}
					}
				} else {
					if ((row.away_team === team || row.home_team === team) && (competition_set.has(row.tournament)) && (year >= start_year) && (year <= end_year)) {
						if ((row.away_team === team && parseInt(row.away_score) > parseInt(row.home_score)) || (row.home_team === team && parseInt(row.home_score) > parseInt(row.away_score))) {
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
					if ((row.away_team === team || row.home_team === team) && (year >= start_year) && (year <= end_year)) {
						if (parseInt(row.home_score) === parseInt(row.away_score)) {
							counter++;
						}
					}
				} else {
					if ((row.away_team === team || row.home_team === team) && (competition_set.has(row.tournament)) && (year >= start_year) && (year <= end_year)) {
						if (parseInt(row.home_score) === parseInt(row.away_score)) {
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
					if ((row.away_team === team || row.home_team === team) && (year >= start_year) && (year <= end_year)) {
						if ((row.away_team === team && parseInt(row.away_score) < parseInt(row.home_score)) || (row.home_team === team && parseInt(row.home_score) < parseInt(row.away_score))) {
							counter++;
						}
					}
				} else {
					if ((row.away_team === team || row.home_team === team) && (competition_set.has(row.tournament)) && (year >= start_year) && (year <= end_year)) {
						if ((row.away_team === team && parseInt(row.away_score) < parseInt(row.home_score)) || (row.home_team === team && parseInt(row.home_score) < parseInt(row.away_score))) {
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
					if ((row.away_team === team || row.home_team === team) && (year >= start_year) && (year <= end_year)) {
						if (row.away_team === team) {
							counter += parseInt(row.away_score);
						} else {
							counter += parseInt(row.home_score);
						}
					}
				} else {
					if ((row.away_team === team || row.home_team === team) && (competition_set.has(row.tournament)) && (year >= start_year) && (year <= end_year)) {
						if (row.away_team === team) {
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
					if ((row.away_team === team || row.home_team === team) && (year >= start_year) && (year <= end_year)) {
						if (row.away_team === team) {
							counter += parseInt(row.home_score);
						} else {
							counter += parseInt(row.away_score);
						}
					}
				} else {
					if ((row.away_team === team || row.home_team === team) && (competition_set.has(row.tournament)) && (year >= start_year) && (year <= end_year)) {
						if (row.away_team === team) {
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
				if ((row.home_team === team) && (row.tournament === "Friendly") && (row.neutral === "False") && (year >= start_year) && (year <= end_year)) {
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
				if ((row.away_team === team) && (row.tournament === "Friendly") && (row.neutral === "False") && (year >= start_year) && (year <= end_year)) {
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
				if ((row.away_team === team || row.home_team === team) && (row.tournament === "Friendly") && (row.neutral === "True") && (year >= start_year) && (year <= end_year)) {
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
					if ((row.away_team === team || row.home_team === team) && (row.tournament !== "Friendly") && (year >= start_year) && (year <= end_year)) {
						counter++;
					}
				} else {
					if ((row.away_team === team || row.home_team === team) && (row.tournament !== "Friendly") && (competition_set.has(row.tournament)) && (year >= start_year) && (year <= end_year)) {
						counter++;
					}
				}
			})
			retrieved_data.push({"name": team, "value": counter});
		});

	} else if (document.getElementById("Major Tournaments Played button").checked) {
		graph_name = "Major tournaments played between " + start_year + " and " + end_year;
		let curr_year;
		let valid_years;
		teams.forEach(team => {
			valid_years = new Set();
			games.forEach(row => {
				year = row.date.substring(0, 4);
				curr_year = year;
				if (competition_set.has("All")) {
					if ((row.away_team === team || row.home_team === team) && (row.tournament === "FIFA World Cup" || row.tournament === "UEFA Euro" ||
						row.tournament === "Copa América" || row.tournament === "African Cup of Nations" ||
						row.tournament === "Gold Cup" || row.tournament === "AFC Asian Cup" ||
						row.tournament === "Oceania Nations Cup") && (year >= start_year) && (year <= end_year)) {
						valid_years.add(curr_year);
					}
				} else {
					if ((row.away_team === team || row.home_team === team) && (row.tournament === "FIFA World Cup" || row.tournament === "UEFA Euro" ||
						row.tournament === "Copa América" || row.tournament === "African Cup of Nations" ||
						row.tournament === "Gold Cup" || row.tournament === "AFC Asian Cup" ||
						row.tournament === "Oceania Nations Cup") && (competition_set.has(row.tournament)) && (year >= start_year) && (year <= end_year)) {
						valid_years.add(curr_year);
					}
				}
			})
			retrieved_data.push({"name": team, "value": valid_years.size});
		});

	} else if (document.getElementById("World Cup Tournaments Won button").checked) {
		graph_name = "World Cup tournaments won between " + start_year + " and " + end_year;
		let winners = [{"country": "Brazil", "wins": [1958, 1962, 1970, 1994, 2002]}, {"country": "Germany", "wins": [1954, 1974, 1990, 2014]},
			{"country": "Italy", "wins": [1934, 1938, 1982, 2006]},
			{"country": "France", "wins": [1998, 2018]},
			{"country": "Argentina", "wins": [1978, 1986]},
			{"country": "Uruguay", "wins": [1930, 1950]},
			{"country": "Spain", "wins": [2010]},
			{"country": "England", "wins": [1966]}];
		let found;
		let counter;
		teams.forEach(team => {
			found = 0;
			for (i=0; i < winners.length; i++) {
				if (team === winners[i]["country"]) {
					found = 1;
					counter = 0;
					for (j=0; j < winners[i]["wins"].length; j++) {
						if (winners[i]["wins"][j] >= start_year && winners[i]["wins"][j] <= end_year) {
							counter++;
						}
					}
					retrieved_data.push({"name": team, "value": counter});
					break;
				}
			}
			if (found === 0) {
				retrieved_data.push({"name": team, "value": 0});
			}
		});
	}

	return retrieved_data;
}

// bar plot creation for world section in details tab
const load_data_world = function() {
	// removing existing plots
	if (document.getElementById("bar_plot_graphic") != null) {
		d3.select("#bar_plot_graphic").remove();
	}
	if (document.getElementById("bar_plot_graphic_team") != null) {
		d3.select("#bar_plot_graphic_team").remove();
	}

	graph_name = "";

	data = get_world_data(games);

	// Do nothing is no games matches the request
	if (data.length === 0) {
		alert("Please select a criterion and a competition");
		data = null;
		return;
	}

	// sort bars based on value
	data = data.sort(function (a, b) {
		return d3.ascending(a.value, b.value);
	})

	// set up svg using margins
	var margin = {
		top: 26,
		right: 35,
		bottom: 0,
		left: 214
	};

	var width = 1000 - margin.left - margin.right,
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

	// make y axis to show bar names
	const yAxis = d3.axisLeft(y)
		.tickSize(0);

	const gy = svg.append("g")
		.attr("class", "y axis")
		.call(yAxis);

	const bars = svg.selectAll(".bar")
		.data(data)
		.enter()
		.append("g");

	// apply gradient on bars
	const gradient = svg
		.append("linearGradient")
		.attr("x1", 0)
		.attr("x2", 1850)
		.attr("y1", "0")
		.attr("y2", "0")
		.attr("id", "gradient")
		.attr("gradientUnits", "userSpaceOnUse");

	gradient
		.append("stop")
		.attr("offset", "0")
		.attr("stop-color", "#ff0")

	gradient
		.append("stop")
		.attr("offset", "0.5")
		.attr("stop-color", "#f00")

	// append rects
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

	// add a value label to the right of each bar
	bars.append("text")
		.attr("class", "label")
		.attr("fill", "white")
		.attr("font-weight", "bold")
		.attr("opacity", "0")
		.attr("y", function (d) {
			return y(d.name) + y.bandwidth() / 2 + 4;
		})
		.attr("x", function (d) {
			return x(d.value) + 3;
		})
		.text(function (d) {
			return d.value;
		});

	// add animations to the plot
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


//Flag database
let flags;
let flags_input = [];
let flag_number;

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

const assign_flags= function(flags, flag_number) {
	//Reference to the flag container
	let scrollmenu = document.getElementById("js_flag_scroll");
	scrollmenu.classList.add("flag-slider");
	//Delete all childs
	scrollmenu.innerHTML = '';
	let cnt = 0;
	while (cnt < flag_number) {
		const wrapper = document.createElement("div");
		wrapper.classList.add('wrapper');

		// top flag
		const square = document.createElement("div");
		square.classList.add('square');
		square.innerHTML = "<img src=\"" + flags[cnt]['ImageURL'] + "\">";
		const button_style = document.createElement("div");
		button_style.classList.add('button-style');
		button_style.innerHTML = flags[cnt]['Country'].substring(0, 3).toUpperCase();

		if (cnt < flag_number) button_style.id = flags[cnt]['Country'];
		if (cnt < flag_number) button_style.onclick = function () {
			set_team(this.id);
		};
		cnt++;
		// bottom flag
		const square2 = document.createElement("div");
		square2.classList.add('square');
		if (cnt < flag_number) square2.innerHTML = "<img src=\"" + flags[cnt]['ImageURL'] + "\">";
		const button_style2 = document.createElement("div");
		button_style2.classList.add('button-style');
		if (cnt < flag_number) {
			button_style2.innerHTML = flags[cnt]['Country'].substring(0, 3).toUpperCase();
			button_style2.id = flags[cnt]['Country'];
			button_style2.onclick = function () {
				set_team(this.id);
			};
		}
		cnt++;

		square.appendChild(button_style);
		if (cnt <= flag_number) square2.appendChild(button_style2);
		wrapper.appendChild(square);
		wrapper.appendChild(square2);
		scrollmenu.appendChild(wrapper);
	}
};

//List of criterions/measures
measures=["Matches Played", "Wins", "Draws", "Losses", "Goals Scored", "Goals Conceded",
	"Friendly Home Matches Played", "Friendly Away Matches Played", "Friendly Neutral Matches Played",
	"Tournament Matches Played", "Major Tournaments Played", "World Cup Tournaments Won"];

//List of competitions
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

//Criterion loader to create the side menus
const criterion_loader = function() {

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
		label.appendChild(input);
		const small = document.createElement("small");
		small.innerHTML = item;
		label.appendChild(small);
		content_comp.appendChild(label);
	});
	competition_ref.appendChild(content_comp);
};

// triggered when the document is ready
whenDocumentLoaded(() => {

	let i;
// load the flag database
	data_loader("../../data/final_results.csv"); /* Ajout Vincent */

	// create the criterions side menus
	criterion_loader();

	// hide the button taking us to te world bar plot section since that this section is the one we immediately go when opening manually the "Details" tab
	document.getElementById("buttonWorldMode").style.visibility = "hidden";

	// get all the checkboxes or radios on the page
	var checkboxes = document.querySelectorAll('input[type=checkbox]');
	var radios = document.querySelectorAll('input[type=radio]');

	// add a change event listener to all of them to record any change and immediately draw a plot in response to this change
	for(i = 0; i < checkboxes.length; i++) {
		checkboxes[i].addEventListener('change', function(){
			if (currBtnTeamId != null) {
				for (var i = 0; i < radios.length; i++) {
					if (radios[i].checked) {
						load_data();
						break;
					}
				}
			}
		});
	}

	for(i = 0; i < radios.length; i++) {
		radios[i].addEventListener('change', function(){
			if (currBtnTeamId != null) {
				for (var i = 0; i < checkboxes.length; i++) {
					if (checkboxes[i].checked) {
						load_data();
						break;
					}
				}
			}
		});
	}

	// onclick listeners for every measure criterion in order to disable some competitions that are irrelevant with the selected filter
	document.getElementById("Friendly Home Matches Played button").onclick = function() {
		if (currBtnTeamId == null) {
			let i;
			disabled_checkboxes.clear();
			for(i = 0; i < competitions.length; i++) {
				currBtnId = competitions[i] + " button";
				currBtn = document.getElementById(currBtnId);
				currBtn.checked = false;
				currBtn.disabled = false;
			}
			for(i = 0; i < competitions.length; i++) {
				currBtnId = competitions[i] + " button";
				currBtn = document.getElementById(currBtnId);
				currBtn.disabled = true;
				if (currBtnId !== "Friendly button" && currBtnId !== "All button") {
					disabled_checkboxes.add(currBtnId);
				} else {
					currBtn.checked = true;
				}
			}
		}
	};

	document.getElementById("Friendly Away Matches Played button").onclick = function() {
		if (currBtnTeamId == null) {
			let i;
			disabled_checkboxes.clear();
			for(i = 0; i < competitions.length; i++) {
				currBtnId = competitions[i] + " button";
				currBtn = document.getElementById(currBtnId);
				currBtn.checked = false;
				currBtn.disabled = false;
			}
			for(i = 0; i < competitions.length; i++) {
				currBtnId = competitions[i] + " button";
				currBtn = document.getElementById(currBtnId);
				currBtn.disabled = true;
				if (currBtnId !== "Friendly button" && currBtnId != "All button") {
					disabled_checkboxes.add(currBtnId);
				} else {
					currBtn.checked = true;
				}
			}
		}
	};
	document.getElementById("Friendly Neutral Matches Played button").onclick = function() {
		if (currBtnTeamId == null) {
			let i;
			disabled_checkboxes.clear();
			for(i = 0; i < competitions.length; i++) {
				currBtnId = competitions[i] + " button";
				currBtn = document.getElementById(currBtnId);
				currBtn.checked = false;
				currBtn.disabled = false;
			}
			for(i = 0; i < competitions.length; i++) {
				currBtnId = competitions[i] + " button";
				currBtn = document.getElementById(currBtnId);
				currBtn.disabled = true;
				if (currBtnId !== "Friendly button" && currBtnId !== "All button") {
					disabled_checkboxes.add(currBtnId);
				} else {
					currBtn.checked = true;
				}
			}
		}
	};

	document.getElementById("Tournament Matches Played button").onclick = function() {
		if (currBtnTeamId == null) {
			let i;
			disabled_checkboxes.clear();
			for(i = 0; i < competitions.length; i++) {
				currBtnId = competitions[i] + " button";
				currBtn = document.getElementById(currBtnId);
				currBtn.checked = false;
				currBtn.disabled = false;
			}
			for(i = 0; i < competitions.length; i++) {
				currBtnId = competitions[i] + " button";
				currBtn = document.getElementById(currBtnId);
				if (currBtnId === "Friendly button") {
					currBtn.disabled = true;
					disabled_checkboxes.add(currBtnId);
				}
			}
		}
	};

	document.getElementById("Matches Played button").onclick = function() {
		if (currBtnTeamId == null) {
			disabled_checkboxes.clear();
			for(var i=0; i < competitions.length; i++) {
				currBtnId = competitions[i] + " button";
				currBtn = document.getElementById(currBtnId);
				currBtn.checked = false;
				currBtn.disabled = false;
			}
		}
	};

	document.getElementById("Wins button").onclick = function() {
		if (currBtnTeamId == null) {
			disabled_checkboxes.clear();
			for(var i=0; i < competitions.length; i++) {
				currBtnId = competitions[i] + " button";
				currBtn = document.getElementById(currBtnId);
				currBtn.checked = false;
				currBtn.disabled = false;
			}
		}
	};

	document.getElementById("Draws button").onclick = function() {
		let currBtn;
		let currBtnId;
		if (currBtnTeamId == null) {
			disabled_checkboxes.clear();
			for (var i = 0; i < competitions.length; i++) {
				currBtnId = competitions[i] + " button";
				currBtn = document.getElementById(currBtnId);
				currBtn.checked = false;
				currBtn.disabled = false;
			}
		}
	};

	document.getElementById("Losses button").onclick = function() {
		let currBtnId;
		let currBtn;
		if (currBtnTeamId == null) {
			disabled_checkboxes.clear();
			for (let i = 0; i < competitions.length; i++) {
				currBtnId = competitions[i] + " button";
				currBtn = document.getElementById(currBtnId);
				currBtn.checked = false;
				currBtn.disabled = false;
			}
		}
	};

	document.getElementById("Goals Scored button").onclick = function() {
		let currBtn;
		let currBtnId;
		if (currBtnTeamId == null) {
			disabled_checkboxes.clear();
			for (let i = 0; i < competitions.length; i++) {
				currBtnId = competitions[i] + " button";
				currBtn = document.getElementById(currBtnId);
				currBtn.checked = false;
				currBtn.disabled = false;
			}
		}
	};

	document.getElementById("Goals Conceded button").onclick = function() {
		let currBtn;
		let currBtnId;
		if (currBtnTeamId == null) {
			disabled_checkboxes.clear();
			for (let i = 0; i < competitions.length; i++) {
				currBtnId = competitions[i] + " button";
				currBtn = document.getElementById(currBtnId);
				currBtn.checked = false;
				currBtn.disabled = false;
			}
		}
	};

	document.getElementById("Major Tournaments Played button").onclick = function() {
		let currBtnId;
		let currBtn;
		if (currBtnTeamId == null) {
			let i;
			disabled_checkboxes.clear();
			for (i = 0; i < competitions.length; i++) {
				currBtnId = competitions[i] + " button";
				currBtn = document.getElementById(currBtnId);
				currBtn.checked = false;
				currBtn.disabled = false;
			}
			for (i = 0; i < competitions.length; i++) {
				currBtnId = competitions[i] + " button";
				currBtn = document.getElementById(currBtnId);
				if (currBtnId !== "All button" && currBtnId !== "FIFA World Cup button" && currBtnId !== "UEFA Euro button" &&
					currBtnId !== "Copa América button" &&
					currBtnId !== "African Cup of Nations button" &&
					currBtnId !== "Gold Cup button" &&
					currBtnId !== "AFC Asian Cup button" &&
					currBtnId !== "Oceania Nations Cup button") {
					currBtn.disabled = true;
					disabled_checkboxes.add(currBtnId);
				}
			}
		}
	};

	document.getElementById("World Cup Tournaments Won button").onclick = function() {
		if (currBtnTeamId == null) {
			let i;
			disabled_checkboxes.clear();
			for(i = 0; i < competitions.length; i++) {
				currBtnId = competitions[i] + " button";
				currBtn = document.getElementById(currBtnId);
				currBtn.checked = false;
				currBtn.disabled = false;
			}
			for(i = 0; i < competitions.length; i++) {
				currBtnId = competitions[i] + " button";
				currBtn = document.getElementById(currBtnId);
				currBtn.disabled = true;
				if (currBtnId !== "FIFA World Cup button" && currBtnId !== "All button") {
					disabled_checkboxes.add(currBtnId);
				} else {
					currBtn.checked = true;
				}
			}
		}
	};

	// special checkbox having an impact on all the other ones by switching their value to "checked" or "unchecked"
	document.getElementById("All button").onclick = function() {
		let i;
		let currBtn;
		let currBtnId;
		if (this.checked) {
			for (i = 1; i < competitions.length; i++) {
				currBtnId = competitions[i] + " button";
				currBtn = document.getElementById(currBtnId);
				if (!disabled_checkboxes.has(currBtnId)) {
					currBtn.checked = currBtnTeamId == null;
					currBtn.disabled = true;
				}
			}
		} else {
			for (i = 1; i < competitions.length; i++) {
				currBtnId = competitions[i] + " button";
				currBtn = document.getElementById(currBtnId);
				if (!disabled_checkboxes.has(currBtnId)) {
					currBtn.checked = false;
					currBtn.disabled = false;
				}
			}
		}
	};

});
