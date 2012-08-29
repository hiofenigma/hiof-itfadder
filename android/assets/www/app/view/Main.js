Ext.define('ITFadder.view.Main', {
    extend: 'Ext.TabPanel',
    requires: [
		'ITFadder.view.Home',
		'ITFadder.view.Schedule',
		'ITFadder.view.Buddies',
		'ITFadder.view.Studentmap',
		'Ext.TitleBar',
		'Ext.MessageBox'
    ],

    config: {
        tabBar: {
            docked: 'bottom',
            layout: {
                pack: 'center'
            }
        },
        items: [
            { xtype: 'homecard' },
			{ xtype: 'schedulecard'},
			{ xtype: 'buddiescard'},
			{ xtype: 'studentmapcard'}
			
        ]
    }
});

