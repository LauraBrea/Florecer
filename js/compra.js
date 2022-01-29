const compra = new Carrito();
const listaCompra = document.querySelector("#lista-compra tbody");
const carrito = document.getElementById('carrito');
const procesarCompraBtn = document.getElementById('procesar-compra');
const cliente = document.getElementById('cliente');
const correo = document.getElementById('correo');


cargarEventos();

function cargarEventos() {
    document.addEventListener('DOMContentLoaded', compra.leerLocalStorageCompra());
    
    //Eliminar productos del carrito (pag compra.html)
    carrito.addEventListener('click', (e) => { compra.eliminarProducto(e) });

    compra.calcularTotal();

    //Proceso final de Compra
    procesarCompraBtn.addEventListener('click', procesarCompra);

    carrito.addEventListener('change', (e) => { compra.obtenerEvento(e) });
    carrito.addEventListener('keyup', (e) => { compra.obtenerEvento(e) });
}

function procesarCompra() {

    if (compra.obtenerProductosLocalStorage().length === 0) {
        Swal.fire({
            type: 'error',
            title: 'Oops...',
            text: 'No hay productos, selecciona alguno',
            showConfirmButton: false,
            timer: 2500
        }).then(function () {
            window.location = "index.html";
        })
    }
    else if (cliente.value === '' || correo.value === '') {
        Swal.fire({
            type: 'error',
            title: 'Oops...',
            text: 'Ingrese todos los campos requeridos',
            showConfirmButton: false,
            timer: 2500
        })
    }
    else {
        Swal.fire({
            type: 'success',
            title: 'COMPRA EXITOSA',
            text: 'Recibirá instrucciones de pago por mail ',
            showConfirmButton: false,
            timer: 6000
        }).then(function () {
            window.location = "index.html";
        })
            localStorage.clear();
    }
}

