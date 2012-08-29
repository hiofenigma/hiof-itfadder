Ext.define('ITFadder.view.Schedule', {
    extend: 'Ext.Panel',
    xtype: 'schedulecard',
	
    config: {
        iconCls: 'organize',
        title: 'Program',
        items: [
		{
			xtype: 'titlebar',
			docked: 'top',
			title: '<p>Fadderukene 2012</p>',
		},
		{
			xtype: 'panel',
			html: [
				'<p>Tabell her</p>'
			].join("")
		}
        ]
    }
});