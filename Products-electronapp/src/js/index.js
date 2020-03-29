const { ipcRenderer } = require("electron")
const products = document.querySelector("#products")

ipcRenderer.on("product:new", (e, newProduct) => {
    
    const newProductTemplate = `
        <div class="col-xs-4 p-2">
            <div class="card text-center">
                <div class="card-header">
                    <h5 class="card-title">${newProduct.name}</h5>
                </div>
                <div class="card-body">
                    <p>${newProduct.description}</p>    
                    <hr/>
                    <p>${newProduct.price}</p> 
                </div>
                <div class="card-footer">
                    <button class="btn btn-danger btn-sm">
                        Delete 
                    </button>
                </div>
            </div>
        </div>
    `
    products.innerHTML += newProductTemplate
    const buttons = document.querySelectorAll(".btn.btn-danger")

    buttons.forEach( btn =>{

        btn.addEventListener("click", e =>{
            // sube 3 niveles
            e.target.parentElement.parentElement.parentElement.remove()
        })
        
    })

})

ipcRenderer.on("products:remove-all", e => {
    products.innerHTML = "";
})