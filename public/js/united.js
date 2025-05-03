const socket = io()

const main = ()=>{
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
}