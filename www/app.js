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
        'Ext.plugin.google.Tracker',
		'Ext.data.Store',
        'Ext.List',
        'Ext.plugin.PullRefresh'
    ],

    launch: function() {
		//Serves as an interface against buddies.json
		//All buddies must be stored in buddies.json with a first name, 
		//last name, email, phone number and picture file name (captain_placeholder.jpg).
		//A file with that same name must exist in poth img/buddies_82 and img/buddies_320 
		//with the resolution 82x82 pixels and 320x320 pixels respectively.
		var store = Ext.create('Ext.data.Store', {
            //give the store some fields
            fields: ['firstName', 'lastName', 'phone', 'email', 'imageName'],

            //filter the data using the firstName field
            sorters: 'firstName',

            //autoload the data from the server
            autoLoad: true,

            //setup the grouping functionality to group by the first letter of the firstName field
            grouper: {
                groupFn: function(record) {
                    return record.get('firstName')[0];
                }
            },

            //setup the proxy for the store to use an ajax proxy and give it a url to load
            //the local contacts.json file
            proxy: {
                type: 'ajax',
                url: 'buddies.json'
            }
        });
	
	
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
		
		// For statiske skjermer uten noen funksjon kan iframe og en vanlig HTML-side brukes 
		// (forenkler, og gjør app.js mer oversiktlig). 
		var homeScreen = {
                    title: 'Hjem',
                    iconCls: 'home',
                    cls: 'home',
                    scrollable: true,
                    html: [
                        '<iframe style="position:absolute;left: 0px;width: 100%;top: 0px;height: 100%;" src="./hjem.html" />'
                    ].join("")
                };
				
		// For statiske skjermer uten noen funksjon kan iframe og en vanlig HTML-side brukes 
		// (forenkler, og gjør app.js mer oversiktlig). 
		var eventScreen = {
				title: 'Program',
                    iconCls: 'home',
                    cls: 'home',
                    scrollable: true,
                    html: [
                        '<iframe style="position:absolute;left: 0px;width: 100%;top: 0px;height: 100%;" src="./program.html" />'
                    ].join("")
				};
				
		var buddyScreen = Ext.create('Ext.List', {
				title: 'Faddere',
                iconCls: 'home',
				store: store,
				grouped: true,
				itemTpl: 
				[ 
					'<div class="contact2">',
					'<table><tr><td ROWSPAN=2>',
						'<img style="margin-right: 8px;" src="img/buddy_82/{imageName}" />',
						'</td><td></td>',
					'<tr><td></td><td>',
						'{firstName} {lastName}',
					'</tr></table></div>'
				],
				disclosure: true,
				onItemDisclosure: function(record, item, index, e) {
					//show a messagebox alert which shows the persons firstName
					e.stopEvent();
					Ext.Msg.alert(record.get('firstName') + ' ' + record.get('lastName'), record.get('firstName') + ' kan nås på telefon ' + record.get('phone') + ' eller epost' + record.get('email'));
				}
			   });
				
		var mapScreen = Ext.create('Ext.Map', {
            title: 'Kart',
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
