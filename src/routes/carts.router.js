import { Router } from "express";
const router = Router()

let carts = []
let idCart = 1;

router.get("", (req, res) => {
    res.json(carts)
})

router.post("/", (req, res) => {
    const newCart = {
        id: idCart++,
        products: []
    };
    carts.push(newCart)
    res.status(201).json({ id: newCart.id })
});

router.get("/:cid", (req, res) => {
    const cid = req.params.cid
    const cart = carts.find(c => c.id === parseInt(cid))
    if(cart){
        res.json(cart.products)
    }else{
        res.status(404).json({error: "El carrito no ha sido encontrado."})
    }
})

router.post("/:cid/product/:pid", (req, res) => {
    const cid = parseInt(req.params.cid)
    const pid = req.params.pid
    const quantity = req.body.quantity || 1

    const cart = carts.find(c=> c.id === cid)
    if(!cart){
        res.status(404).json({error: "El carrito no ha sido encontrado"})
        return
    }

    const indexProduct = cart.products.findIndex(p => p.product === pid)
    if(indexProduct !== -1){
        cart.products[indexProduct].quantity += quantity
    }else{
        cart.products.push({product: pid, quantity})
    }
    res.status(201).json({message: "Producto agregado al carrito correctamente."})
})


export default router