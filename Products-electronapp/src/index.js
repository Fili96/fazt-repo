const {app, BrowserWindow, Menu, ipcMain} = require("electron");

const url = require("url");
const path = require("path");

// Ventanas
let mainWindow
let newProductWindow

// Menu principal
const customTemplateMenu = [
    {
        label: "File",
        submenu: [
            {
                label: "New product",
                accelerator: "Ctrl+N",
                click(){
                    createNewProductWindow();
                }
            },
            {
                label: "Remove all product windows",
                click(){
                    mainWindow.webContents.send("products:remove-all")
                }
            },
            {
                label: "Exit",
                accelerator: process.platform == 'darwin' ? "command+Q" : "Ctrl+Q",
                click(){
                    app.quit();
                }
            }
        ]
    }
];

/**
 * Evento Ready de Ventana Principal
 */
app.on("ready", ()=>{

    mainWindow = new BrowserWindow({});

    mainMenu = Menu.buildFromTemplate(customTemplateMenu);
    Menu.setApplicationMenu(mainMenu);

    mainWindow.loadURL( url.format({
        pathname: path.join(__dirname, "views/index.html"),
        protocol: "file",
        slashes: true
    }));

    mainWindow.on("closed", () => {
        app.quit();
    })
});

/**
 * Recibe los datos de la ventana new-product
 * y los envia a la ventana index
 */
ipcMain.on("product:new", (e, newProduct) => {
    mainWindow.webContents.send("product:new", newProduct)
    newProductWindow.close()
});

/**
 * Metodo para crear una 
 * nueva ventana para el producto
 */
function createNewProductWindow() {

    newProductWindow = new BrowserWindow({
        width: 400,
        height: 330,
        title: "Add a new Product"
    });

    // newProductWindow.setMenu(null);

    newProductWindow.loadURL( url.format({
        pathname: path.join(__dirname, "views/new-product.html"),
        protocol: "file",
        slashes: true
    }));

    newProductWindow.on("closed", () => {
        newProductWindow = null;
    });
}


/**
 * Si el SO es Mac, agrega al inicio del menu
 * una pestaña mas con el nombre de la aplicacion
 */
if (process.platform === "darwin") {
    customTemplateMenu.unshift({
        label: app.getName()
    });
}

/**
 * Comprueba el entorno
 * Para contenido modo desarrollo
 */
if (process.env.NODE_ENV !== 'production') {
    require("electron-reload")(__dirname, {
        // Revisar tambien cambios de electron
        electron: path.join( __dirname, '../node_modules', '.bin', 'electron')
    });
    customTemplateMenu.push({
        label: "DevTools",
        submenu: [
            {
                label: "Show/Hide Dev Tools",
                accelerator: "Ctrl+L",
                click(item, focusedWindow){
                    focusedWindow.toggleDevTools();
                }
            },
            {
                role: 'reload',
                accelerator: "Ctrl+R"
            }
        ]
    });
}