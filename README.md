# Project of Data Visualization (COM-480)

| Student's name | SCIPER |
| -------------- | ------ |
| Reynaud Alexandre | 258402 |
| Bouraux Léopold | 257368 |
| Rinaldi Vincent | 239759 |

[Milestone 1](#milestone-1-friday-3rd-april-5pm) • [Milestone 2](#milestone-2-friday-1st-may-5pm) • [Milestone 3](#milestone-3-thursday-28th-may-5pm)

## Milestone 1 (Friday 3rd April, 5pm)

**10% of the final grade**

### Dataset

The dataset we use has been taken from Kaggle and is the following :
- [International football results from 1872 to 2020](https://www.kaggle.com/martj42/international-football-results-from-1872-to-2017)

The dataset is a list of 41,586 international football matches results (ranged from World Cup to friendly matches) ordered in chronological order,
starting from the very first official international football match between England and Scotland on November 30, 1872 and ending on February 1, 2020 with
the friendly match between USA and Costa Rica. The data has been gathered from several sources like Wikipedia, fifa.com, rsssf.com and individual football
associations' websites. The dataset only consists of men's football matches between nations. It does not include women's international football matches,
Olympic Games, matches involving a nation's B-team, U-23 or a football club from a national league. For each sample, we have the date of the match,
the name of the home team and away teams (the current name of the teams has been used through all the years even if it had a different name before, in order
to make easier the tracking of the statistics of a team), the full-time score for both home and away teams (if an overtime period, extra time and penalty-shootout,
occurred during the match because of a draw after the regulation game time, the full-time score includes the extra time period, but doesn't include the penalty-shootout),
the name of the concerned tournament, the city and country where the match took place (the name of the country at the time of the match is used, and can be different
from the name actually used today), and a boolean value if the match was played in a neutral stadium (```True```) or if the home team was playing in its own country (```False```).

The dataset at hand is pretty straight-forward, and it seems to have no missing data nor corrupted information. That being said, some irrelevant information can be
observed, like teams representing cities or regions, that are not affiliated with FIFA, and does not participate in major tournaments like the official World Cup or
Continental Cups. Concerning preprocessing, since we want to only consider teams that are eligible for the World Cup to have accurate statistics on teams and perform
efficient comparisons between them, we simply need to get rid of any team that is not affiliated with FIFA.

### Problematic

Our visualization is aiming to present an historical view of every football matches between nations at the professional level since the
beginning of football history. We want the user to be able to select a particular period between two given years in the interval 1872-2020, in order to display the
statistics from every football match that we can retrieve from the dataset during the selected period. This can include the number of goal scored by a team, the different
championships won, the number of official competitions a country hosted and many more. This can give the user, given a specific period, the statistical distribution
of the total goals scored or a comparison of each team's strength and performance. This visualization could also let us make assumptions on the pet peeve of each team, how much the fact of playing at home or hosting a tournament affects a country performances.

We thought that the visualization could consist mainly of a world map with a slider placed along a side of the screen. The map would itself be a first layer of visualization, displaying high-level comparative information between the national teams. Clicking on a country on the interactive map would
display some statistics of the nation's team between two specific years that are chosen by the user with the help of the slider. It would be also possible to compare two
or more teams' statistics with a specific option that would be available at use after selecting the first team. We can also provide other views than a map to select a nation,
like a grid, or a search bar. The user will also be able to select specifically the comparison criteria in order to filter the desired statistics.

Our motivation comes from the fact that it is difficult to find such up-to-date and complete historical data at a single place on the web related to football, which is
however the most popular sport in the world. If a user, for example, wants to know which country had the most successful team
during a given period, our project will provide the answer. Many users like football fans and journalists, that are looking for information
concerning football international teams since their creation, would be thrilled to access a single interactive database containing what they need to complete successfully their research,
instead of looking through tens of websites since the information is scattered a lot.

### Exploratory Data Analysis

You can find basic statistics and insight we provided on the dataset in the notebook *Exploratory Data Analysis.ipynb* that comes up with our submission in the repository.
Please, follow this link to visualize our notebook for the exploratory data analysis :
- [Exploratory Data Analysis Jupyter Notebook](https://nbviewer.jupyter.org/github/com-480-data-visualization/com-480-project-le-kfc/blob/master/Exploratory%20Data%20Analysis.ipynb)

### Related Work

Concerning the use that has already be done by others with the data, we found a few studies that performed exploratory data analysis, like us, on this same dataset,
but without getting too much in-depth :
- [Simple Football Data-set Exploration with Pandas](https://towardsdatascience.com/simple-football-data-set-exploration-with-pandas-60a2bc56bd5a)
- [Exploration on World Football Data](https://www.kaggle.com/microtang/exploration-on-world-football-data)

Concerning visualization work, the following provides an historical overview of the results of any football nation with the help of an interactive map :
- [All International Football Results](https://public.tableau.com/profile/kakuna#!/vizhome/AllFootballResults/Overview)

This last study is much closer to what we are striving for. This project makes possible to visualize the number of games won, drawn or lost by a given team against all other
opponents between 1872 and 2017. The only possible variable, in addition to the choice of the team to be visualized, is the choice of the competition on which we want to
display the statistics. However, these are the only criteria that this site provides. There is no option to directly compare two countries, to get statistics on the number
of matches a city/country hosted or statistics on team playing at home or away. This visualization can then be greatly extended and updated with more recent results, since
the dataset has been kept up to date.

The originality of our approach comes from the fact that the visualization will allow the user to move through the whole football historical period, thanks to a slider, discovering many useful and interesting historical statistics that can rarely be found in one place.
In addition, using a map will make our visualization much more interactive and user-friendly than other sources.

In terms of source of inspiration, the following visualizations played a major role in taking our final decision :
- [Histography - Matan Stauber](https://histography.io/)
- [Animation Of Surface Winds - earth.nullschool.net](https://earth.nullschool.net/)
- [100 Years Of Rock - ConcertHotels.com](https://www.concerthotels.com/100-years-of-rock/)

The three listed visualizations combine **user interaction**, **world map information** and **temporal evolution**, which composed the basis of our project motivations.


## Milestone 2 (Friday 1st May, 5pm)

**10% of the final grade**




## Milestone 3 (Thursday 28th May, 5pm)

**80% of the final grade**
