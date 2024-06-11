import { Router } from "express";
const router = Router()

const productosEnStock = [
    { id: 1, title: "Marcador Sharpie", description: "Color Negro", price: 1650, status: true, code: "Librería", stock: 10, category: "Libería" },
    { id: 2, title: "Cuaderno Mooving", description: "A4", price: 13550, status: true, code: "Librería", stock: 10, category: "Libería" },
    { id: 3, title: "Goma de borrar Parker", description: "Pack x 2u.", price: 1200, status: true, code: "Librería", stock: 10, category: "Libería" },
    { id: 4, title: "Marcador Acuarela Mooving", description: "Color Verde", price: 2650, status: true, code: "Librería", stock: 10, category: "Libería" },
    { id: 5, title: "Marcador Posca", description: "Color Azul", price: 19650, status: true, code: "Librería", stock: 10, category: "Libería" },
    { id: 6, title: "Block de hojas Nro 5 El Nene", description: "Color Blanco", price: 9850, status: true, code: "Librería", stock: 10, category: "Libería" },
    { id: 7, title: "Repuesto de lapicera borrable", description: "Color Rojo", price: 650, status: true, code: "Librería", stock: 10, category: "Libería" },
    { id: 8, title: "Ganchos abrochadora", description: "Nro 10", price: 950, status: true, code: "Librería", stock: 10, category: "Libería" },
    { id: 9, title: "Cartuchera Talbot", description: "Color Verde", price: 13250, status: true, code: "Librería", stock: 10, category: "Libería" },
    { id: 10, title: "Mochila Disney 100 años", description: "50 lts.", price: 55550, status: true, code: "Librería", stock: 10, category: "Libería" }
]


router.get("", (req, res) => {
    let limit = req.query.limit
    let products = productosEnStock
    products = products.slice(0, parseInt(limit))
    res.json(products)
})


router.get("/:pid", (req, res) => {
    let pid = req.params.pid
    let productoBuscado = productosEnStock.find(producto => producto.id === parseInt(pid))
    if (productoBuscado) {
        res.send(productoBuscado)
    } else {
        res.send("El producto que buscas no ha sido encontrado.")
    }
})

router.post("/", (req, res) => {
    console.log(req.body)
    const title = req.body.title
    const description = req.body.description
    const price = req.body.price
    const status = true
    const code = req.body.code
    const stock = req.body.stock
    const category = req.body.category
    if (!title && !description && !price && !status && !code && !stock && !category) {
        res.status(400).json({ error: "Faltan completar campos para crear un nuevo producto." })
        return
    }
    let id = productosEnStock[productosEnStock.length - 1].id + 1
    productosEnStock.push({ id, title, description, price, code, stock, category })
    res.status(201).json("Producto agregado correctamente")
})

router.put("/:pid", (req, res) => {
    const pid = parseInt(req.params.pid)
    const { title, description, price, status, code, stock, category } = req.body
    const productFound = productosEnStock.find(product => product.id === pid)
    if (productFound) {
        const index = productosEnStock.findIndex(product => product.id === pid)
        productosEnStock[index] = {...productosEnStock[index], title, description, price, status, code, stock, category}
        res.status(201).json("Producto actualizado correctamente")
    }else{
        res.status(404).json({ error: "Producto no encontrado." })
    }
})

router.delete("/:pid", (req, res) => {
    const pid = parseInt(req.params.pid)
    const productToDelete = productosEnStock.find(product => product.id === pid)
    if(productToDelete){
        const index = productosEnStock.findIndex(product => product.id === pid)
        productosEnStock.splice(index, 1)
        res.send("El producto con ID " + pid + " ha sido eliminado con éxito.")
    }else{
        res.status(404).json({error: "El producto no ha sido encontrado."})
    }
})

export default router