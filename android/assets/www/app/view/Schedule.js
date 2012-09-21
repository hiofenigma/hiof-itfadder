Ext.define('ITFadder.view.Schedule', {
    extend: 'Ext.Panel',
    xtype: 'schedulecard',
	
    config: {
        iconCls: 'organize',
        title: 'Fadderukene',
        items: [
		{
			xtype: 'titlebar',
			docked: 'top',
			title: '<p>Fadderukene</p>',
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