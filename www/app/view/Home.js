Ext.define('ITFadder.view.Home', {
    extend: 'Ext.Panel',
    xtype: 'homecard',
	
    config: {
        iconCls: 'home',
        title: 'Hjem',
        items: [
		{
			xtype: 'titlebar',
			docked: 'top',
			title: '<p>Enigmas IT-fadder</p>',
		},
		{
			xtype: 'panel',
			styleHtmlContent: true,
			html: [
				'<center>',
				'<img height=260 src="img/enigmalogo.png" />',
				'<h2>Velkommen til IT-avdelingen ved Høgskolen i Østfold!</h2><p>Trenger du å finne fram til et sted eller en fadder? Denne appen er laget nettop for deg!</p>',
				'<p>Finn fram til der det skjer med det innebyggede kartet, eller få kontakt med en fadder. Du finner også enkelt planene for fadderukene.</p>',
				'<p>Besøk oss gjerne på <a href="http://enigma.hiof.no">forumet</a>!</p>',
				'</center>'
			].join("")
		}
        ]
    }
});
