# TriMet QuickStop Tasks
### To Do
* Add api call when active
* Add trimet api arrivals call
* Cycle through random stops for testing, store valid stop numbers in stops.json with lat,long
* Reset is pm when inactive for some period (1 hr)

* Add graph component timeline 
* Place icons in correct location by time
* Add labels for timeline
* Add transparency arrows to timeline

* Add css variables for all colors
* Add version number to menu
* Move sw.js and manifest into src

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
