const { app, BrowserWindow } = require( "electron" );

app.on('ready', ()=>{

    const ventana = new BrowserWindow();
  
    ventana.loadURL(`file://${__dirname}/index.html`);

    ventana.webContents.on( 'will-navigate', ( e, url ) =>{
        e.preventDefault();
        alert(url);
        ventana.webContents.send('open-file', url );
        
    });
});