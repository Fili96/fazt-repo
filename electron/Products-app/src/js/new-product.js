const { ipcRenderer } = require("electron")
    
const form = document.querySelector("form")
form.addEventListener('submit', e =>{
    e.preventDefault()
    const nameProduct = document.getElementById("name").value
    const priceProduct = document.getElementById("price").value
    const descriptionProduct = document.getElementById("description").value

    const newProduct = {
        name: nameProduct,
        price: priceProduct,
        description: descriptionProduct
    }
    ipcRenderer.send("product:new", newProduct)
    
});