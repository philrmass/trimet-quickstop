# TriMet QuickStop Tasks
### To Do
* Fix search overlay position and size
* Filter out arrivals far in the future with no eta
* Sort arrivals by time (bus/streetcar)
* Add stop selection from route/direction/stop lists
* Move sw.js and manifest into src, remove dev errors
* Add labels time labels to graph
* Add background arrows to graph
* Restore quickstop button

### Completed
* Create menu icon in CSS
* Create a general button with children name, callback, and isActive
* Combine am/pm into buttons
* Set button class styling in parent, transparent hover color
* Convert container to a component, log lifecycle methods
* connect am/pm buttons to container functions
* Switch am/pm by click
* Add is pm to state, set by time of day in component did mount
* Update component diagram
* change am/pm color using global style
* Convert change button to button
* Convert quick button to button
* Convert set button to button
* Show search pane on change button click, slide animation from top
* Add input for setting am/pm stop numbers
* Add am/pm stop to state
* Read am/pm/last updated from local storage in component did mount
* Save am/pm/last updated to local storage when set
* Test active detection using animation frame callback
* Add a server file for api/cache
* Add api call when active
* Add trimet api arrivals call
* Add css variables for all colors
* Query cache before api call, test api calls once per minute
* Add routes class and file
* Clean up routes file and remove random
* Add list of all stop ids
* Get stop name, direction
* Format arrivals data
* Add graph component timeline 
* Place icons in correct location by time
* Look up and store stop name and direction from static data, add to state
* Clear arrivals on am/pm switching
* Use ComponentWillUpdate to check for stop changes and request network data
* Clear arrivals on stop id change
* Clear arrivals on inactive
* Reset is pm when inactive for some period (1 hr)
* Add screenshot to readme
* Cycle through random stops for testing, store valid stop numbers in stops.json with lat,long
