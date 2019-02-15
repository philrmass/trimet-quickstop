# TriMet QuickStop Components

## Component Tree

App
- NavBar
  - MenuButton
  - AmButton
  - PmButton
- StopPane
  - Stop
    - CloseButton
    - ChangeButton
    - QuickstopButton
    - RecentList
      - Recent (xN)
  - Graph
    - GraphIcon (xN)
  - ArrivalList
    - Arrival (xN)
      - ArrivalIcon
- MapPane
  - CloseButton
  - Map
    - MapIcon
- SearchPane
  - CloseButton
  - SearchBar
  - NearButton
  - ResultList
    - Result (xN)
  - StopSet
    - SetButton
- MenuPane
  - CloseButton
  - User
    - Login
      - RegisterButton
      - LoginForm
      - LoginButton
    - Logout
      - LogoutButton
    - Register
      - RegisterForm
      - RegisterButton
  - Status
  - QuickstopButton


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
