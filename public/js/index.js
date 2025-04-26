const socket = io()

const main = () => {
    const npform = document.getElementById("formNP")
    const plist = document.getElementById("plist")
    npform.addEventListener("submit", (e) => {
        e.preventDefault()
        const formData = new FormData(npform)
        let np = {}
        formData.forEach((value, key) => {
            np[key] = value
        })
        socket.emit("NewProduct", np)
    })
    plist.addEventListener("click", (e) => {
        if (e.target.classList.contains("delete-btn")) {
            const pid = e.target.getAttribute("data-id")
            console.log("se elimino el producto", pid)
            socket.emit("del", { pid })
        }
    })

    socket.on("up", (products) => {
        plist.innerHTML = "" 
        products.forEach(prod => {
            plist.innerHTML += `<li data-id="${prod.id}">${prod.title} (ID: ${prod.id})
            <button class="delete-btn" data-id="${prod.id}"> Eliminar</button></li>`
        })
    })
}

main()
