//Standard initialization function
function whenDocumentLoaded(action) {
	if (document.readyState === "loading") {
		document.addEventListener("DOMContentLoaded", action);
	} else {
		// `DOMContentLoaded` already fired
		action();
	}
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
//let flag_number = 217; /* Modif Vincent*/
let flag_number = 216; /* Ajout Vincent */

//Flag loading function /* Modif Vincent */
//const flag_loader = function(path) {
//	d3.csv(path).then(function(data) {
//		//Assigning the loaded data to the local database
//		flags=data;
//		//Filling the first flags
//		assign_flags();
//	});
//};

flag_design = ['Afghanistan', 'Albania', 'Algeria', 'American Samoa', 'Andorra',
       'Angola', 'Anguilla', 'Antigua and Barbuda', 'Argentina',
       'Armenia', 'Aruba', 'Australia', 'Austria', 'Azerbaijan',
       'Bahamas', 'Bahrain', 'Bangladesh', 'Barbados', 'Belarus',
       'Belgium', 'Belize', 'Benin', 'Bermuda', 'Bhutan', 'Bolivia',
       'Bosnia and Herzegovina', 'Botswana', 'Brazil',
       'British Virgin Islands', 'Brunei', 'Bulgaria', 'Burkina Faso',
       'Burundi', 'Cambodia', 'Cameroon', 'Canada', 'Cape Verde',
       'Cayman Islands', 'Central African Republic', 'Chad', 'Chile',
       'China', 'Colombia', 'Comoros', 'Cook Islands', 'Costa Rica',
       'Croatia', 'Cuba', 'Curaçao', 'Cyprus', 'Czech Republic',
       'Czechoslovakia', 'Democratic Republic of Congo', 'Denmark',
       'Djibouti', 'Dominica', 'Dominican Republic', 'Ecuador', 'Egypt',
       'El Salvador', 'England', 'Equatorial Guinea', 'Eritrea',
       'Estonia', 'Eswatini', 'Ethiopia', 'Faroe Islands', 'Fiji',
       'Finland', 'France', 'Gabon', 'Gambia', 'Georgia',
       'German Democratic Republic', 'Germany', 'Ghana', 'Gibraltar',
       'Greece', 'Grenada', 'Guam', 'Guatemala', 'Guinea',
       'Guinea-Bissau', 'Guyana', 'Haiti', 'Honduras', 'Hong Kong',
       'Hungary', 'Iceland', 'India', 'Indonesia', 'Iran', 'Iraq',
       'Ireland', 'Israel', 'Italy', 'Ivory Coast', 'Jamaica', 'Japan',
       'Jordan', 'Kazakhstan', 'Kenya', 'Kosovo', 'Kuwait', 'Kyrgyzstan',
       'Laos', 'Latvia', 'Lebanon', 'Lesotho', 'Liberia', 'Libya',
       'Liechtenstein', 'Lithuania', 'Luxembourg', 'Macau', 'Madagascar',
       'Malawi', 'Malaysia', 'Maldives', 'Mali', 'Malta', 'Mauritania',
       'Mauritius', 'Mexico', 'Moldova', 'Mongolia', 'Montenegro',
       'Montserrat', 'Morocco', 'Mozambique', 'Myanmar', 'Namibia',
       'Nepal', 'Netherlands', 'New Caledonia', 'New Zealand',
       'Nicaragua', 'Niger', 'Nigeria', 'North Korea', 'North Macedonia',
       'Northern Ireland', 'Norway', 'Oman', 'Pakistan', 'Palestine',
       'Panama', 'Papua New Guinea', 'Paraguay', 'Peru', 'Philippines',
       'Poland', 'Portugal', 'Puerto Rico', 'Qatar', 'Republic of China',
       'Republic of Congo', 'Romania', 'Russia', 'Rwanda', 'Saarland',
       'Saint Kitts and Nevis', 'Saint Lucia',
       'Saint Vincent and the Grenadines', 'Samoa', 'San Marino',
       'Saudi Arabia', 'Scotland', 'Senegal', 'Serbia', 'Seychelles',
       'Sierra Leone', 'Singapore', 'Slovakia', 'Slovenia',
       'Solomon Islands', 'Somalia', 'South Africa', 'South Korea',
       'South Sudan', 'Spain', 'Sri Lanka', 'Sudan', 'Suriname', 'Sweden',
       'Switzerland', 'Syria', 'São Tomé and Príncipe', 'Tahiti',
       'Tajikistan', 'Tanzania', 'Thailand', 'Timor-Leste', 'Togo',
       'Tonga', 'Trinidad and Tobago', 'Tunisia', 'Turkey',
       'Turkmenistan', 'Turks and Caicos Islands', 'U.S. Virgin Islands',
       'Uganda', 'Ukraine', 'United Arab Emirates', 'United States',
       'Uruguay', 'Uzbekistan', 'Vanuatu', 'Venezuela', 'Vietnam',
       'Wales', 'Yemen', 'Yemen DPR', 'Yugoslavia', 'Zambia', 'Zimbabwe']

flag_array = ['https://upload.wikimedia.org/wikipedia/commons/9/9a/Flag_of_Afghanistan.svg',
       'https://upload.wikimedia.org/wikipedia/commons/3/36/Flag_of_Albania.svg',
       'https://upload.wikimedia.org/wikipedia/commons/7/77/Flag_of_Algeria.svg',
       'https://upload.wikimedia.org/wikipedia/commons/8/87/Flag_of_American_Samoa.svg',
       'https://upload.wikimedia.org/wikipedia/commons/1/19/Flag_of_Andorra.svg',
       'https://upload.wikimedia.org/wikipedia/commons/9/9d/Flag_of_Angola.svg',
       'https://upload.wikimedia.org/wikipedia/commons/b/b4/Flag_of_Anguilla.svg',
       'https://upload.wikimedia.org/wikipedia/commons/8/89/Flag_of_Antigua_and_Barbuda.svg',
       'https://upload.wikimedia.org/wikipedia/commons/1/1a/Flag_of_Argentina.svg',
       'https://upload.wikimedia.org/wikipedia/commons/2/2f/Flag_of_Armenia.svg',
       'https://upload.wikimedia.org/wikipedia/commons/f/f6/Flag_of_Aruba.svg',
       'https://upload.wikimedia.org/wikipedia/commons/8/88/Flag_of_Australia_%28converted%29.svg',
       'https://upload.wikimedia.org/wikipedia/commons/4/41/Flag_of_Austria.svg',
       'https://upload.wikimedia.org/wikipedia/commons/d/dd/Flag_of_Azerbaijan.svg',
       'https://upload.wikimedia.org/wikipedia/commons/9/93/Flag_of_the_Bahamas.svg',
       'https://upload.wikimedia.org/wikipedia/commons/2/2c/Flag_of_Bahrain.svg',
       'https://upload.wikimedia.org/wikipedia/commons/f/f9/Flag_of_Bangladesh.svg',
       'https://upload.wikimedia.org/wikipedia/commons/e/ef/Flag_of_Barbados.svg',
       'https://upload.wikimedia.org/wikipedia/commons/8/85/Flag_of_Belarus.svg',
       'https://upload.wikimedia.org/wikipedia/commons/9/92/Flag_of_Belgium_%28civil%29.svg',
       'https://upload.wikimedia.org/wikipedia/commons/e/e7/Flag_of_Belize.svg',
       'https://upload.wikimedia.org/wikipedia/commons/0/0a/Flag_of_Benin.svg',
       'https://upload.wikimedia.org/wikipedia/commons/b/bf/Flag_of_Bermuda.svg',
       'https://upload.wikimedia.org/wikipedia/commons/9/91/Flag_of_Bhutan.svg',
       'https://upload.wikimedia.org/wikipedia/commons/4/48/Flag_of_Bolivia.svg',
       'https://upload.wikimedia.org/wikipedia/commons/b/bf/Flag_of_Bosnia_and_Herzegovina.svg',
       'https://upload.wikimedia.org/wikipedia/commons/f/fa/Flag_of_Botswana.svg',
       'https://upload.wikimedia.org/wikipedia/en/0/05/Flag_of_Brazil.svg',
       'https://upload.wikimedia.org/wikipedia/commons/4/42/Flag_of_the_British_Virgin_Islands.svg',
       'https://upload.wikimedia.org/wikipedia/commons/9/9c/Flag_of_Brunei.svg',
       'https://upload.wikimedia.org/wikipedia/commons/9/9a/Flag_of_Bulgaria.svg',
       'https://upload.wikimedia.org/wikipedia/commons/3/31/Flag_of_Burkina_Faso.svg',
       'https://upload.wikimedia.org/wikipedia/commons/5/50/Flag_of_Burundi.svg',
       'https://upload.wikimedia.org/wikipedia/commons/8/83/Flag_of_Cambodia.svg',
       'https://upload.wikimedia.org/wikipedia/commons/4/4f/Flag_of_Cameroon.svg',
       'https://upload.wikimedia.org/wikipedia/en/c/cf/Flag_of_Canada.svg',
       'https://upload.wikimedia.org/wikipedia/commons/3/38/Flag_of_Cape_Verde.svg',
       'https://upload.wikimedia.org/wikipedia/commons/0/0f/Flag_of_the_Cayman_Islands.svg',
       'https://upload.wikimedia.org/wikipedia/commons/6/6f/Flag_of_the_Central_African_Republic.svg',
       'https://upload.wikimedia.org/wikipedia/commons/4/4b/Flag_of_Chad.svg',
       'https://upload.wikimedia.org/wikipedia/commons/7/78/Flag_of_Chile.svg',
       'https://upload.wikimedia.org/wikipedia/commons/f/fa/Flag_of_the_People%27s_Republic_of_China.svg',
       'https://upload.wikimedia.org/wikipedia/commons/2/21/Flag_of_Colombia.svg',
       'https://upload.wikimedia.org/wikipedia/commons/9/94/Flag_of_the_Comoros.svg',
       'https://upload.wikimedia.org/wikipedia/commons/3/35/Flag_of_the_Cook_Islands.svg',
       'https://upload.wikimedia.org/wikipedia/commons/f/f2/Flag_of_Costa_Rica.svg',
       'https://upload.wikimedia.org/wikipedia/commons/1/1b/Flag_of_Croatia.svg',
       'https://upload.wikimedia.org/wikipedia/commons/b/bd/Flag_of_Cuba.svg',
       'https://upload.wikimedia.org/wikipedia/commons/b/b1/Flag_of_Cura%C3%A7ao.svg',
       'https://upload.wikimedia.org/wikipedia/commons/d/d4/Flag_of_Cyprus.svg',
       'https://upload.wikimedia.org/wikipedia/commons/c/cb/Flag_of_the_Czech_Republic.svg',
       'https://upload.wikimedia.org/wikipedia/commons/9/94/Greater_coat_of_arms_of_Czechoslovakia_%281918-1938_and_1945-1961%29.svg',
       'https://upload.wikimedia.org/wikipedia/commons/6/6f/Flag_of_the_Democratic_Republic_of_the_Congo.svg',
       'https://upload.wikimedia.org/wikipedia/commons/9/9c/Flag_of_Denmark.svg',
       'https://upload.wikimedia.org/wikipedia/commons/3/34/Flag_of_Djibouti.svg',
       'https://upload.wikimedia.org/wikipedia/commons/c/c4/Flag_of_Dominica.svg',
       'https://upload.wikimedia.org/wikipedia/commons/9/9f/Flag_of_the_Dominican_Republic.svg',
       'https://upload.wikimedia.org/wikipedia/commons/e/e8/Flag_of_Ecuador.svg',
       'https://upload.wikimedia.org/wikipedia/commons/f/fe/Flag_of_Egypt.svg',
       'https://upload.wikimedia.org/wikipedia/commons/3/34/Flag_of_El_Salvador.svg',
       'https://upload.wikimedia.org/wikipedia/en/b/be/Flag_of_England.svg',
       'https://upload.wikimedia.org/wikipedia/commons/3/31/Flag_of_Equatorial_Guinea.svg',
       'https://upload.wikimedia.org/wikipedia/commons/2/29/Flag_of_Eritrea.svg',
       'https://upload.wikimedia.org/wikipedia/commons/8/8f/Flag_of_Estonia.svg',
       'https://upload.wikimedia.org/wikipedia/commons/f/fb/Flag_of_Eswatini.svg',
       'https://upload.wikimedia.org/wikipedia/commons/7/71/Flag_of_Ethiopia.svg',
       'https://upload.wikimedia.org/wikipedia/commons/3/3c/Flag_of_the_Faroe_Islands.svg',
       'https://upload.wikimedia.org/wikipedia/commons/b/ba/Flag_of_Fiji.svg',
       'https://upload.wikimedia.org/wikipedia/commons/b/bc/Flag_of_Finland.svg',
       'https://upload.wikimedia.org/wikipedia/en/c/c3/Flag_of_France.svg',
       'https://upload.wikimedia.org/wikipedia/commons/0/04/Flag_of_Gabon.svg',
       'https://upload.wikimedia.org/wikipedia/commons/7/77/Flag_of_The_Gambia.svg',
       'https://upload.wikimedia.org/wikipedia/commons/0/0f/Flag_of_Georgia.svg',
       'https://upload.wikimedia.org/wikipedia/commons/9/97/Flag_of_the_German_Democratic_Republic.svg',
       'https://upload.wikimedia.org/wikipedia/en/b/ba/Flag_of_Germany.svg',
       'https://upload.wikimedia.org/wikipedia/commons/1/19/Flag_of_Ghana.svg',
       'https://upload.wikimedia.org/wikipedia/commons/0/02/Flag_of_Gibraltar.svg',
       'https://upload.wikimedia.org/wikipedia/commons/5/5c/Flag_of_Greece.svg',
       'https://upload.wikimedia.org/wikipedia/commons/b/bc/Flag_of_Grenada.svg',
       'https://upload.wikimedia.org/wikipedia/commons/0/07/Flag_of_Guam.svg',
       'https://upload.wikimedia.org/wikipedia/commons/e/ec/Flag_of_Guatemala.svg',
       'https://upload.wikimedia.org/wikipedia/commons/e/ed/Flag_of_Guinea.svg',
       'https://upload.wikimedia.org/wikipedia/commons/0/01/Flag_of_Guinea-Bissau.svg',
       'https://upload.wikimedia.org/wikipedia/commons/9/99/Flag_of_Guyana.svg',
       'https://upload.wikimedia.org/wikipedia/commons/5/56/Flag_of_Haiti.svg',
       'https://upload.wikimedia.org/wikipedia/commons/8/82/Flag_of_Honduras.svg',
       'https://upload.wikimedia.org/wikipedia/commons/5/5b/Flag_of_Hong_Kong.svg',
       'https://upload.wikimedia.org/wikipedia/commons/c/c1/Flag_of_Hungary.svg',
       'https://upload.wikimedia.org/wikipedia/commons/c/ce/Flag_of_Iceland.svg',
       'https://upload.wikimedia.org/wikipedia/en/4/41/Flag_of_India.svg',
       'https://upload.wikimedia.org/wikipedia/commons/9/9f/Flag_of_Indonesia.svg',
       'https://upload.wikimedia.org/wikipedia/commons/c/ca/Flag_of_Iran.svg',
       'https://upload.wikimedia.org/wikipedia/commons/f/f6/Flag_of_Iraq.svg',
       'https://upload.wikimedia.org/wikipedia/commons/4/45/Flag_of_Ireland.svg',
       'https://upload.wikimedia.org/wikipedia/commons/d/d4/Flag_of_Israel.svg',
       'https://upload.wikimedia.org/wikipedia/en/0/03/Flag_of_Italy.svg',
       'https://upload.wikimedia.org/wikipedia/commons/f/fe/Flag_of_C%C3%B4te_d%27Ivoire.svg',
       'https://upload.wikimedia.org/wikipedia/commons/0/0a/Flag_of_Jamaica.svg',
       'https://upload.wikimedia.org/wikipedia/en/9/9e/Flag_of_Japan.svg',
       'https://upload.wikimedia.org/wikipedia/commons/c/c0/Flag_of_Jordan.svg',
       'https://upload.wikimedia.org/wikipedia/commons/d/d3/Flag_of_Kazakhstan.svg',
       'https://upload.wikimedia.org/wikipedia/commons/4/49/Flag_of_Kenya.svg',
       'https://upload.wikimedia.org/wikipedia/commons/1/1f/Flag_of_Kosovo.svg',
       'https://upload.wikimedia.org/wikipedia/commons/a/aa/Flag_of_Kuwait.svg',
       'https://upload.wikimedia.org/wikipedia/commons/c/c7/Flag_of_Kyrgyzstan.svg',
       'https://upload.wikimedia.org/wikipedia/commons/5/56/Flag_of_Laos.svg',
       'https://upload.wikimedia.org/wikipedia/commons/8/84/Flag_of_Latvia.svg',
       'https://upload.wikimedia.org/wikipedia/commons/5/59/Flag_of_Lebanon.svg',
       'https://upload.wikimedia.org/wikipedia/commons/4/4a/Flag_of_Lesotho.svg',
       'https://upload.wikimedia.org/wikipedia/commons/b/b8/Flag_of_Liberia.svg',
       'https://upload.wikimedia.org/wikipedia/commons/0/05/Flag_of_Libya.svg',
       'https://upload.wikimedia.org/wikipedia/commons/4/47/Flag_of_Liechtenstein.svg',
       'https://upload.wikimedia.org/wikipedia/commons/1/11/Flag_of_Lithuania.svg',
       'https://upload.wikimedia.org/wikipedia/commons/d/da/Flag_of_Luxembourg.svg',
       'https://upload.wikimedia.org/wikipedia/commons/6/63/Flag_of_Macau.svg',
       'https://upload.wikimedia.org/wikipedia/commons/b/bc/Flag_of_Madagascar.svg',
       'https://upload.wikimedia.org/wikipedia/commons/d/d1/Flag_of_Malawi.svg',
       'https://upload.wikimedia.org/wikipedia/commons/6/66/Flag_of_Malaysia.svg',
       'https://upload.wikimedia.org/wikipedia/commons/0/0f/Flag_of_Maldives.svg',
       'https://upload.wikimedia.org/wikipedia/commons/9/92/Flag_of_Mali.svg',
       'https://upload.wikimedia.org/wikipedia/commons/7/73/Flag_of_Malta.svg',
       'https://upload.wikimedia.org/wikipedia/commons/4/43/Flag_of_Mauritania.svg',
       'https://upload.wikimedia.org/wikipedia/commons/7/77/Flag_of_Mauritius.svg',
       'https://upload.wikimedia.org/wikipedia/commons/f/fc/Flag_of_Mexico.svg',
       'https://upload.wikimedia.org/wikipedia/commons/2/27/Flag_of_Moldova.svg',
       'https://upload.wikimedia.org/wikipedia/commons/4/4c/Flag_of_Mongolia.svg',
       'https://upload.wikimedia.org/wikipedia/commons/6/64/Flag_of_Montenegro.svg',
       'https://upload.wikimedia.org/wikipedia/commons/d/d0/Flag_of_Montserrat.svg',
       'https://upload.wikimedia.org/wikipedia/commons/2/2c/Flag_of_Morocco.svg',
       'https://upload.wikimedia.org/wikipedia/commons/d/d0/Flag_of_Mozambique.svg',
       'https://upload.wikimedia.org/wikipedia/commons/8/8c/Flag_of_Myanmar.svg',
       'https://upload.wikimedia.org/wikipedia/commons/0/00/Flag_of_Namibia.svg',
       'https://upload.wikimedia.org/wikipedia/commons/9/9b/Flag_of_Nepal.svg',
       'https://upload.wikimedia.org/wikipedia/commons/2/20/Flag_of_the_Netherlands.svg',
       'https://upload.wikimedia.org/wikipedia/commons/6/66/Flag_of_FLNKS.svg',
       'https://upload.wikimedia.org/wikipedia/commons/3/3e/Flag_of_New_Zealand.svg',
       'https://upload.wikimedia.org/wikipedia/commons/1/19/Flag_of_Nicaragua.svg',
       'https://upload.wikimedia.org/wikipedia/commons/f/f4/Flag_of_Niger.svg',
       'https://upload.wikimedia.org/wikipedia/commons/7/79/Flag_of_Nigeria.svg',
       'https://upload.wikimedia.org/wikipedia/commons/5/51/Flag_of_North_Korea.svg',
       'https://upload.wikimedia.org/wikipedia/commons/7/79/Flag_of_North_Macedonia.svg',
       'https://upload.wikimedia.org/wikipedia/commons/d/d0/Ulster_Banner.svg',
       'https://upload.wikimedia.org/wikipedia/commons/d/d9/Flag_of_Norway.svg',
       'https://upload.wikimedia.org/wikipedia/commons/d/dd/Flag_of_Oman.svg',
       'https://upload.wikimedia.org/wikipedia/commons/3/32/Flag_of_Pakistan.svg',
       'https://upload.wikimedia.org/wikipedia/commons/0/00/Flag_of_Palestine.svg',
       'https://upload.wikimedia.org/wikipedia/commons/a/ab/Flag_of_Panama.svg',
       'https://upload.wikimedia.org/wikipedia/commons/e/e3/Flag_of_Papua_New_Guinea.svg',
       'https://upload.wikimedia.org/wikipedia/commons/2/27/Flag_of_Paraguay.svg',
       'https://upload.wikimedia.org/wikipedia/commons/c/cf/Flag_of_Peru.svg',
       'https://upload.wikimedia.org/wikipedia/commons/9/99/Flag_of_the_Philippines.svg',
       'https://upload.wikimedia.org/wikipedia/en/1/12/Flag_of_Poland.svg',
       'https://upload.wikimedia.org/wikipedia/commons/5/5c/Flag_of_Portugal.svg',
       'https://upload.wikimedia.org/wikipedia/commons/2/28/Flag_of_Puerto_Rico.svg',
       'https://upload.wikimedia.org/wikipedia/commons/6/65/Flag_of_Qatar.svg',
       'https://upload.wikimedia.org/wikipedia/commons/7/72/Flag_of_the_Republic_of_China.svg',
       'https://upload.wikimedia.org/wikipedia/commons/9/92/Flag_of_the_Republic_of_the_Congo.svg',
       'https://upload.wikimedia.org/wikipedia/commons/7/73/Flag_of_Romania.svg',
       'https://upload.wikimedia.org/wikipedia/en/f/f3/Flag_of_Russia.svg',
       'https://upload.wikimedia.org/wikipedia/commons/1/17/Flag_of_Rwanda.svg',
       'https://upload.wikimedia.org/wikipedia/commons/f/f7/Flag_of_Saarland.svg',
       'https://upload.wikimedia.org/wikipedia/commons/f/fe/Flag_of_Saint_Kitts_and_Nevis.svg',
       'https://upload.wikimedia.org/wikipedia/commons/9/9f/Flag_of_Saint_Lucia.svg',
       'https://upload.wikimedia.org/wikipedia/commons/6/6d/Flag_of_Saint_Vincent_and_the_Grenadines.svg',
       'https://upload.wikimedia.org/wikipedia/commons/3/31/Flag_of_Samoa.svg',
       'https://upload.wikimedia.org/wikipedia/commons/b/b1/Flag_of_San_Marino.svg',
       'https://upload.wikimedia.org/wikipedia/commons/0/0d/Flag_of_Saudi_Arabia.svg',
       'https://upload.wikimedia.org/wikipedia/commons/1/10/Flag_of_Scotland.svg',
       'https://upload.wikimedia.org/wikipedia/commons/f/fd/Flag_of_Senegal.svg',
       'https://upload.wikimedia.org/wikipedia/commons/f/ff/Flag_of_Serbia.svg',
       'https://upload.wikimedia.org/wikipedia/commons/f/fc/Flag_of_Seychelles.svg',
       'https://upload.wikimedia.org/wikipedia/commons/1/17/Flag_of_Sierra_Leone.svg',
       'https://upload.wikimedia.org/wikipedia/commons/4/48/Flag_of_Singapore.svg',
       'https://upload.wikimedia.org/wikipedia/commons/e/e6/Flag_of_Slovakia.svg',
       'https://upload.wikimedia.org/wikipedia/commons/f/f0/Flag_of_Slovenia.svg',
       'https://upload.wikimedia.org/wikipedia/commons/7/74/Flag_of_the_Solomon_Islands.svg',
       'https://upload.wikimedia.org/wikipedia/commons/a/a0/Flag_of_Somalia.svg',
       'https://upload.wikimedia.org/wikipedia/commons/a/af/Flag_of_South_Africa.svg',
       'https://upload.wikimedia.org/wikipedia/commons/0/09/Flag_of_South_Korea.svg',
       'https://upload.wikimedia.org/wikipedia/commons/7/7a/Flag_of_South_Sudan.svg',
       'https://upload.wikimedia.org/wikipedia/en/9/9a/Flag_of_Spain.svg',
       'https://upload.wikimedia.org/wikipedia/commons/1/11/Flag_of_Sri_Lanka.svg',
       'https://upload.wikimedia.org/wikipedia/commons/0/01/Flag_of_Sudan.svg',
       'https://upload.wikimedia.org/wikipedia/commons/6/60/Flag_of_Suriname.svg',
       'https://upload.wikimedia.org/wikipedia/en/4/4c/Flag_of_Sweden.svg',
       'https://upload.wikimedia.org/wikipedia/commons/0/08/Flag_of_Switzerland_%28Pantone%29.svg',
       'https://upload.wikimedia.org/wikipedia/commons/5/53/Flag_of_Syria.svg',
       'https://upload.wikimedia.org/wikipedia/commons/4/4f/Flag_of_Sao_Tome_and_Principe.svg',
       'https://upload.wikimedia.org/wikipedia/commons/d/db/Flag_of_French_Polynesia.svg',
       'https://upload.wikimedia.org/wikipedia/commons/d/d0/Flag_of_Tajikistan.svg',
       'https://upload.wikimedia.org/wikipedia/commons/3/38/Flag_of_Tanzania.svg',
       'https://upload.wikimedia.org/wikipedia/commons/a/a9/Flag_of_Thailand.svg',
       'https://upload.wikimedia.org/wikipedia/commons/2/26/Flag_of_East_Timor.svg',
       'https://upload.wikimedia.org/wikipedia/commons/6/68/Flag_of_Togo.svg',
       'https://upload.wikimedia.org/wikipedia/commons/9/9a/Flag_of_Tonga.svg',
       'https://upload.wikimedia.org/wikipedia/commons/6/64/Flag_of_Trinidad_and_Tobago.svg',
       'https://upload.wikimedia.org/wikipedia/commons/c/ce/Flag_of_Tunisia.svg',
       'https://upload.wikimedia.org/wikipedia/commons/b/b4/Flag_of_Turkey.svg',
       'https://upload.wikimedia.org/wikipedia/commons/1/1b/Flag_of_Turkmenistan.svg',
       'https://upload.wikimedia.org/wikipedia/commons/a/a0/Flag_of_the_Turks_and_Caicos_Islands.svg',
       'https://upload.wikimedia.org/wikipedia/commons/f/f8/Flag_of_the_United_States_Virgin_Islands.svg',
       'https://upload.wikimedia.org/wikipedia/commons/4/4e/Flag_of_Uganda.svg',
       'https://upload.wikimedia.org/wikipedia/commons/4/49/Flag_of_Ukraine.svg',
       'https://upload.wikimedia.org/wikipedia/commons/c/cb/Flag_of_the_United_Arab_Emirates.svg',
       'https://upload.wikimedia.org/wikipedia/en/a/a4/Flag_of_the_United_States.svg',
       'https://upload.wikimedia.org/wikipedia/commons/f/fe/Flag_of_Uruguay.svg',
       'https://upload.wikimedia.org/wikipedia/commons/8/84/Flag_of_Uzbekistan.svg',
       'https://upload.wikimedia.org/wikipedia/commons/b/bc/Flag_of_Vanuatu.svg',
       'https://upload.wikimedia.org/wikipedia/commons/0/06/Flag_of_Venezuela.svg',
       'https://upload.wikimedia.org/wikipedia/commons/2/21/Flag_of_Vietnam.svg',
       'https://upload.wikimedia.org/wikipedia/commons/a/a9/Flag_of_Wales_%281959%E2%80%93present%29.svg',
       'https://upload.wikimedia.org/wikipedia/commons/8/89/Flag_of_Yemen.svg',
       'https://upload.wikimedia.org/wikipedia/commons/d/db/Flag_of_South_Yemen.svg',
       'https://upload.wikimedia.org/wikipedia/commons/6/61/Flag_of_Yugoslavia_%281946-1992%29.svg',
       'https://upload.wikimedia.org/wikipedia/commons/0/06/Flag_of_Zambia.svg',
       'https://upload.wikimedia.org/wikipedia/commons/6/6a/Flag_of_Zimbabwe.svg']

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
        //square.innerHTML = "<img src=\""+flags[cnt]['ImageURL']+"\">"; /*Modif Vincent*/
				if(cnt<flag_number) square.innerHTML = "<img src=\""+flag_array[cnt]+"\">"; /*Ajout Vincent*/
        const button_style = document.createElement("div");
        button_style.classList.add('button-style');
        //button_style.innerHTML = flags[cnt]['Country'].substring(0, 3).toUpperCase(); /*Modif Vincent*/
				if(cnt<flag_number) button_style.innerHTML = flag_design[cnt].substring(0, 3).toUpperCase(); /*Ajout Vincent*/
        cnt++;
        // bottom flag
        const square2 = document.createElement("div");
        square2.classList.add('square');
        //if(cnt<flag_number) square2.innerHTML = "<img src=\""+flags[cnt]['ImageURL']+"\">"; /*Modif Vincent*/
				if(cnt<flag_number) square2.innerHTML = "<img src=\""+flag_array[cnt]+"\">"; /*Ajout Vincent*/
        const button_style2 = document.createElement("div");
        button_style2.classList.add('button-style');
        //if(cnt<flag_number) button_style2.innerHTML = flags[cnt]['Country'].substring(0, 3).toUpperCase(); /*Modif Vincent*/
				if(cnt<flag_number) button_style2.innerHTML = flag_design[cnt].substring(0, 3).toUpperCase(); /*Ajout Vincent*/
        cnt++;

        square.appendChild(button_style);
        //if(cnt<flag_number) square2.appendChild(button_style2); /* Modif Vincent */
				square2.appendChild(button_style2); /* Ajout Vincent */
        wrapper.appendChild(square);
        wrapper.appendChild(square2);
        scrollmenu.appendChild(wrapper);
    }
};

//List of criterions
measures=["Matches Played", "Friendly Home Matches Played", "Friendly Away Matches Played",
					"Tournament Matches Played", "Tournaments Played", "Tournaments Hosted",
					"Goals Scored", "Goals Conceded", "Wins", "Draws", "Losses",
					"Tournaments Won", "Tournaments Lost"];

competitions=['All', 'FIFA World Cup', 'FIFA World Cup qualification', 'Friendly',
							'ABCS Tournament', 'AFC Asian Cup', 'AFC Asian Cup qualification',
       				'AFC Challenge Cup', 'AFC Challenge Cup qualification',
       				'AFF Championship', 'AFF Championship qualification',
       				'African Cup of Nations', 'African Cup of Nations qualification',
       				'African Nations Championship',
       				'African Nations Championship qualification', 'Amílcar Cabral Cup',
       				'Atlantic Cup', 'Balkan Cup', 'Baltic Cup',
       				'Brazil Independence Cup', 'British Championship',
       				'CCCF Championship', 'CECAFA Cup', 'CFU Caribbean Cup',
       				'CFU Caribbean Cup qualification', 'CONCACAF Championship',
			        'CONCACAF Championship qualification', 'CONCACAF Nations League',
			        'CONCACAF Nations League qualification', 'COSAFA Cup',
			        'Confederations Cup', 'Copa América', 'Copa América qualification',
			        'Copa Artigas', "Copa Bernardo O'Higgins", 'Copa Carlos Dittborn',
			        'Copa Chevallier Boutell', 'Copa Félix Bogado',
			        'Copa Juan Pinto Durán', 'Copa Lipton', 'Copa Newton',
			        'Copa Oswaldo Cruz', 'Copa Paz del Chaco',
			        'Copa Premio Honor Argentino', 'Copa Premio Honor Uruguayo',
			        'Copa Ramón Castilla', 'Copa Rio Branco', 'Copa Roca',
			        'Copa del Pacífico', 'Cyprus International Tournament',
			        'Dragon Cup', 'Dunhill Cup', 'Dynasty Cup', 'EAFF Championship',
			        'GaNEFo', 'Gold Cup', 'Gold Cup qualification', 'Gulf Cup',
			        'Indonesia Tournament', 'Intercontinental Cup',
			        'International Cup', 'Island Games',
			        'Jordan International Tournament', 'King Hassan II Tournament',
			        "King's Cup", 'Kirin Cup', 'Korea Cup', 'Lunar New Year Cup',
			        'Malta International Tournament', 'Merdeka Tournament',
			        'Merlion Cup', 'Millennium Cup', 'Mundialito', 'NAFU Championship',
			        'Nations Cup', 'Nehru Cup', 'Nile Basin Tournament',
			        'Nordic Championship', 'OSN Cup', 'Oceania Nations Cup',
			        'Oceania Nations Cup qualification', 'Pacific Games',
			        'Pan American Championship', "Prime Minister's Cup", 'Rous Cup',
			        'SAFF Cup', 'SKN Football Festival', 'Simba Tournament',
			        'South Pacific Games', 'Tournoi de France', 'UAFA Cup',
			        'UAFA Cup qualification', 'UDEAC Cup', 'UEFA Euro',
			        'UEFA Euro qualification', 'UEFA Nations League', 'UNCAF Cup',
			        'UNIFFAC Cup', 'USA Cup',
			        'United Arab Emirates Friendship Tournament', 'VFF Cup',
			        'Vietnam Independence Cup', 'WAFF Championship',
			        'West African Cup', 'Windward Islands Tournament'];

//Criterion loading myFunction
const criterion_loader= function() {

	//Reference to the criterion containers
	const measure_ref=document.getElementById("measure_container");
	const competition_ref=document.getElementById("competition_container");

	//Loading all measure criterions
	measures.forEach((item, i) => {

		//Instanciating the radio button + text container
		const container=document.createElement("div");
		container.style.width="21vw"; /*Modif Vincent*/
		container.style.height="3vh";
		container.style.direction="ltr";

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
		text.style.color="white";
		text.style.fontWeight="bold";
		text.style.textShadow="0 0 2px black";

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
		text.style.color="white";
		text.style.fontWeight="bold";
		text.style.textShadow="0 0 2px black";

		//Linking all components together
		container.appendChild(button);
		container.appendChild(text);
		competition_ref.appendChild(container);
	});
};

/*
//Launch-time runner
whenDocumentLoaded(() => {
	flag_loader("../../data/final_flags.csv");
	criterion_loader();
	document.getElementById("background").style.height="1540vh";
});
*/

var image = new Image();
image.onload = function () {
        $("svg").css("background-image", "url('" + image.src + "')");
}
image.src = "https://i.pinimg.com/originals/42/50/cf/4250cf3e0be36300f7f2db83c6827ca6.jpg"

whenDocumentLoaded(() => {
	//document.getElementById("slider_container").style.visibility = "visible"; /*Modif Vincent*/
	//document.getElementById("search_bar").style.visibility = "visible"; /*Modif Vincent*/

	//flag_loader("../../data/final_flags.csv"); /*Modif Vincent*/
	//assign_flags(); /*Temp Chrom Issue Vincent*/

	//$("#js_flag_scroll").children().show(); /*Modif Vincent*/
	//document.getElementById("js_flag_scroll").style.visibility = "visible"; /*Modif Vincent*/
	criterion_loader();
	Array.from(document.getElementById("measure_container").getElementsByTagName('div')).forEach((item, i) => {
		item.getElementsByTagName('input')[0].type="checkbox";
	});
	//document.getElementById("measure_container").style.visibility = "visible"; /*Modif Vincent*/
	//document.getElementById("competition_container").style.visibility = "visible"; /*Modif Vincent*/
});
