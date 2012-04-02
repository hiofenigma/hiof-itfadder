Ext.application({
	glossOnIcon: false,
    name: 'IT-fadder',
	phoneStartupScreen: 'resources/loading/Homescreen.jpg',
    tabletStartupScreen: 'resources/loading/Homescreen~ipad.jpg',
   
    requires: [
        'Ext.Map',
        'Ext.Button',
        'Ext.SegmentedButton',
        'Ext.Panel',
        'Ext.Toolbar',
        'Ext.plugin.google.Traffic',
        'Ext.plugin.google.Tracker'
    ],

    launch: function() {
        // The following is accomplished with the Google Map API
        var position = new google.maps.LatLng(37.44885, -122.158592),  //Sencha HQ

            infowindow = new google.maps.InfoWindow({
                content: 'Sencha HQ'
            }),

            //Tracking Marker Image
            image = new google.maps.MarkerImage(
                'resources/images/point.png',
                new google.maps.Size(32, 31),
                new google.maps.Point(0, 0),
                new google.maps.Point(16, 31)
            ),

            shadow = new google.maps.MarkerImage(
                'resources/images/shadow.png',
                new google.maps.Size(64, 52),
                new google.maps.Point(0, 0),
                new google.maps.Point(-5, 42)
            ),

            trackingButton = Ext.create('Ext.Button', {
                iconMask: true,
                iconCls: 'locate'
            }),

            trafficButton = Ext.create('Ext.Button', {
                iconMask: true,
                pressed: true,
                iconCls: 'maps'
            }),

            toolbar = Ext.create('Ext.Toolbar', {
                docked: 'top',
                ui: 'light',
                defaults: {
                    iconMask: true
                },
                items: [
                    {
                        iconCls: 'home',
                        handler: function() {
                            //disable tracking
                            var segmented = Ext.getCmp('segmented'),
                                pressedButtons = segmented.getPressedButtons(),
                                trafficIndex = pressedButtons.indexOf(trafficButton),
                                newPressed = (trafficIndex != -1) ? [trafficButton] : [];
                            segmented.setPressedButtons(newPressed);
                            mapdemo.getMap().panTo(position);
                        }
                    },
                    {
                        id: 'segmented',
                        xtype: 'segmentedbutton',
                        allowMultiple: true,
                        listeners: {
                            toggle: function(buttons, button, active) {
                                if (button == trafficButton) {
                                    mapdemo.getPlugins()[1].setHidden(!active);
                                }
                                else if (button == trackingButton) {
                                    var tracker = mapdemo.getPlugins()[0],
                                        marker = tracker.getMarker();
                                    marker.setVisible(active);
                                    if (active) {
                                        tracker.setTrackSuspended(false);
                                        Ext.defer(function() {
                                            tracker.getHost().on('centerchange', function() {
                                                marker.setVisible(false);
                                                tracker.setTrackSuspended(true);
                                                var segmented = Ext.getCmp('segmented'),
                                                    pressedButtons = segmented.getPressedButtons(),
                                                    trafficIndex = pressedButtons.indexOf(trafficButton),
                                                    newPressed = (trafficIndex != -1) ? [trafficButton] : [];
                                                segmented.setPressedButtons(newPressed);
                                            }, this, {single: true});
                                        }, 50, this);
                                    }
                                }
                            }
                        },
                        items: [
                            trackingButton, trafficButton
                        ]
                    }
                ]
            });
		
		
		var homeScreen = {
                    title: 'Hjem',
                    iconCls: 'home',
                    cls: 'home',
                    scrollable: true,
                    html: [
                        '<img height=260 src="img/enigma_logo.jpg" />',
                        '<h1>Velkommen til IT-avdelingen ved Høgskolen i østfold!</h1>',
                        '<p>Trenger du å finne fram til et sted eller en fadder? Denne appen er laget nettop for deg!</p>',
						'<p>Finn fram til der det skjer med det innebyggede kartet, eller få kontakt med en fadder. Du finner også enkelt planene for fadderukene.</p>',
						'<p>Besøk oss gjerne på <a href="http://enigma.hiof.no">forumet</a>!'
                    ].join("")
                };
				
				
		var eventScreen = {
				title: 'Events',
                    iconCls: 'home',
                    cls: 'home',
                    scrollable: true,
                    html: [
                        '<p>Planene for fadderukene.</p>'
                    ].join("")
				};
				
		var buddyScreen = {
				title: 'Faddere',
                    iconCls: 'home',
                    cls: 'home',
                    scrollable: true,
                    html: [
                        '<p>Få kontakt med en fadder</p>'                        
                    ].join("")
				};
				
		var mapScreen = Ext.create('Ext.Map', {
            title: 'Faddere',
			iconCls: 'home',
			cls: 'home',
			scrollable: true,
			
			mapOptions : {
                center : new google.maps.LatLng(37.381592, -122.135672),  //nearby San Fran
                zoom : 12,
                mapTypeId : google.maps.MapTypeId.ROADMAP,
                navigationControl: true,
                navigationControlOptions: {
                    style: google.maps.NavigationControlStyle.DEFAULT
                }
            },

            plugins : [
                new Ext.plugin.google.Tracker({
                    trackSuspended: true,   //suspend tracking initially
                    allowHighAccuracy: false,
                    marker: new google.maps.Marker({
                        position: position,
                        title: 'My Current Location',
                        shadow: shadow,
                        icon: image
                    })
                }),
                new Ext.plugin.google.Traffic()
            ],

            listeners: {
                maprender: function(comp, map) {
                    var marker = new google.maps.Marker({
                        position: position,
                        title : 'Sencha HQ',
                        map: map
                    });

                    google.maps.event.addListener(marker, 'click', function() {
                        infowindow.open(map, marker);
                    });

                    setTimeout(function() {
                        map.panTo(position);
                    }, 1000);
                }

            }
        });
		
		//The whole app UI lives in this tab panel
        Ext.Viewport.add({
            xtype: 'tabpanel',
            fullscreen: true,
            tabBarPosition: 'bottom',

            items: [homeScreen, eventScreen, mapScreen, buddyScreen]
        });
    }
});
