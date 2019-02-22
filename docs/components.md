# TriMet QuickStop Components

## Component Tree

App
- Container [Main application state]
  - NavBar
    - Button
      - MenuIcon
    - Button (AM)
    - Button (PM)
  - StopPane
    - Stop
      - Button (Change) 
      - Button (Quickstop or Close)
      - Message (Stop)
    - Graph
      - ArrivalIcon (xN)
    - ArrivalList
      - Arrival (xN)
        - ArrivalIcon
  - MapPane
    - Button (Close)
    - Map
      - ArrivalIcon
  - SearchPane [Search results state]
    - Button (Close)
    - SearchBar [Form input state]
    - Button (Near)
    - ResultList
      - Result (xN)
    - RecentList
      - Recent (xN)
    - SetStop
      - Button (Set)
  - MenuPane
    - Button (Close)
    - User
      - Login
        - Button (Register)
        - LoginForm [Form input state]
        - Button (Login)
      - Logout
        - Button (Logout)
      - Register
        - RegisterForm [Form input state]
        - Button (Register)
    - Message (User status)
    - Button (Quickstop)


## Application Sketches

I created these sketches of the various dynamic states of the app in order to sort out the component hierarchy

#### Normal Mode (morning/evening stop set)

<img src="normal.png" width="475px"/>

#### Setup Mode (morning/evening stop not set)

<img src="setup.png" width="375px"/>

#### QuickStop Mode (quick stop set)

<img src="quick.png" width="450px"/>

#### Map Overlay (map showing vehicle/stop location)

<img src="map.png" width="425px"/>

#### Set Stop Overlay (stop selection by location/address/line)

<img src="stop.png" width="450px"/>

#### Login Overlay (menu when logged out)

<img src="login.png" width="450px"/>

#### Logout Overlay (menu when logged in)

<img src="logout.png" width="500px"/>

#### Register Overlay (menu when registering)

<img src="register.png" width="450px"/>
