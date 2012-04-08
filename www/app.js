//There is a known issue of this app not running on Android 3.x and up
//This is an issue with Sencha Touch 2, and a fix is underway in 2.x
//A potential fix was to disable certain Ajax features, but this broke 
//the app horribly.

//In other words: This app only supports Android 2.x at the time being. 
//Other platforms should not be affected.
Ext.application({
    name: 'ITFadder',
	controllers: ['Buddies'],
	views: ['Main'],
	launch: function() {
		Ext.Viewport.add({
			xclass: 'ITFadder.view.Main'
		});
	}
});

