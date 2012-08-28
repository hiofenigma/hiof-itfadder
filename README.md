IT-fadder
=========
**About**

IT-fadder is an app built for students at Østfold Community College by students of Enigma. Its purpose is to give students a simple library of the different buddies, or “faddere”, at the IT department. The app also contains a schedule for the different happenings during the “Fadderukene”, as well as a map highlighting student points-of-interest.

**Technology**

The app is built using Sencha Touch 2 and PhoneGap. This means that the app is built on HTML and JavaScript rather than native code. This opens up for simple cross-platform support. 

**App.js**
Defines the namespace ITFadder, the controllers and the main view, starting the application.

**View/Main.js**
Serves as a wrapper for the other views. Sets up the different views in a TabPanel for easy access to the app functionality. 

**View/Home.js**
Hjem (Home) is a simple HTML page.

**View/Schedule.js**
Proram (schedule) will contain an html representation of the “Fadderukene” schedule.

**View/Map.js**
Kart (map) bases itself on the controller built in to Sencha Touch. Using Google Maps the tab will provide a map over Halden allowing the user to see his own position, as well as points of interest added in the map. It also provides navigation.

**View/Buddies.js**
Faddere (buddies) uses the content in store/Buddies.js to display a list of buddies. Clicking a buddy will open a dialog displaying that buddy’s contact information and picture. The app will also let the user make a phone call, send an SMS or email that buddy.

**Store/Buddies.js**
Buddies.json stores all the info on the different buddies. The fields are all required, and are defined in model/Buddy.js:
firstName, lastName, phone, email, imageName. 
imageName is the file name of the image file for that buddy. An image with exactly that file name must be present in both img/buddy_82 and img/buddy_320 with resolutions of 82x82 pixels and 320x320 pixels respectively. The 82-pixel image is used in the list, and the 320-pixel image used in the Details message window.

**Known issues**
**Incompatibility with certain Android versions**
There is a known issue of this app not running on Android 3.x and up. This is an issue with Sencha Touch 2, and a fix is underway in 2.x. A potential fix was to disable certain Ajax features, but this broke the app horribly.
In other words: This app only supports Android 2.x at the time being. Other platforms should not be affected.

**Lack of pinch zoom in certain Android versions**
Pinch-zoom is not supported by PhoneGap on most Android phones. A side-effect of this is that visible zoom controls are required. No fix is in the works.