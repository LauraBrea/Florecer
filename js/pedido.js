const carro = new Carrito();
const carrito = document.getElementById('carrito');
const productos = document.getElementById('lista-productos');
const listaProductos = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.getElementById('vaciar-carrito');
const procesarPedidoBtn = document.getElementById('procesar-pedido');

cargarEventos();

function cargarEventos(){

    //Se agrega producto carrito (index)
    productos.addEventListener('click', (e)=>{carro.comprarProducto(e)});

    //Elimina producto del carrito (index)
    carrito.addEventListener('click', (e)=>{carro.eliminarProducto(e)});

    //Vacia carrito
    vaciarCarritoBtn.addEventListener('click', (e)=>{carro.vaciarCarrito(e)});

    //Lee el LS
    document.addEventListener('DOMContentLoaded', carro.leerLocalStorage());

    //Redirige a pag Carrito
    procesarPedidoBtn.addEventListener('click', (e)=>{carro.procesarPedido(e)});
}
