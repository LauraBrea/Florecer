class Carrito {

    //Agrega producto al carrito
    comprarProducto(e){
        e.preventDefault();

        if(e.target.classList.contains('agregar-carrito')){
            const producto = e.target.parentElement.parentElement;
            this.leerDatosProducto(producto);
        }
    }

    //Leyendo datos del producto
    leerDatosProducto(producto){
        const infoProducto = {
            imagen : producto.querySelector('img').src,
            titulo: producto.querySelector('h4').textContent,
            precio: producto.querySelector('.precio span').textContent,
            id: producto.querySelector('a').getAttribute('data-id'),
            cantidad: 1
        }
        let productosLS;
        productosLS = this.obtenerProductosLocalStorage();
        productosLS.forEach(function (productoLS){
            if(productoLS.id === infoProducto.id){
                productosLS = productoLS.id;
            }
        });

        if(productosLS === infoProducto.id){
            Swal.fire({
                type: 'info',
                title: 'Oops...',
                text: 'El producto ya está agregado',
                showConfirmButton: false,
                timer: 2000
            })
        }
        else {
                Swal.fire({
                    type: 'success',
                    title: 'Ok',
                    text: 'Se agregó al carrito',
                    showConfirmButton: false,
                    timer: 1000
                })
            this.insertarCarrito(infoProducto);
        }
    }

    //Muestra producto en carrito (pag index)
    insertarCarrito(producto){
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <img src="${producto.imagen}" width=75>
            </td>
            <td>${producto.titulo}</td>
            <td>$ ${producto.precio}</td>
            <td>
                <button href="#" class="borrar-producto car__icon" data-id="${producto.id}"> X </button>
            </td>
        `;
        listaProductos.appendChild(row);
        this.guardarProductosLocalStorage(producto);
    }

    //Elimina producto del carrito (pag index)
    eliminarProducto(e){
        e.preventDefault();
        let producto, productoID;
        if(e.target.classList.contains('borrar-producto')){
            e.target.parentElement.parentElement.remove();
            producto = e.target.parentElement.parentElement;
            productoID = producto.querySelector('a').getAttribute('data-id');
        }
        this.eliminarProductoLocalStorage(productoID);
        this.calcularTotal();
    }

    //Elimina todos los productos
    vaciarCarrito(e){
        e.preventDefault();
        while(listaProductos.firstChild){
            listaProductos.removeChild(listaProductos.firstChild);
        }
        this.vaciarLocalStorage();
        return false;
    }

    //Guarda compra en el Local storage
    guardarProductosLocalStorage(producto){
        let productos;

        productos = this.obtenerProductosLocalStorage();
        productos.push(producto);
        localStorage.setItem('productos', JSON.stringify(productos));
    }

    //Comprobar si no hay elementos repetidos Local storage
    obtenerProductosLocalStorage(){
        let productoLS;

        if(localStorage.getItem('productos') === null){
            productoLS = [];
        }
        else {
            productoLS = JSON.parse(localStorage.getItem('productos'));
        }
        return productoLS;
    }

    //Mostrar productos guardados en el Local Storage (pag index)
    leerLocalStorage(){
        let productosLS;
        productosLS = this.obtenerProductosLocalStorage();
        productosLS.forEach(function (producto){

            const row = document.createElement('tr');
            row.innerHTML = `
                <td>
                    <img src="${producto.imagen}" width=75>
                </td>
                <td>${producto.titulo}</td>
                <td>$ ${producto.precio}</td>
                <td>
                    <button href="#" class="borrar-producto car__icon" data-id="${producto.id}"> X </button>
                </td>
            `;
            listaProductos.appendChild(row);
        });
    }

    //Renderiza carrito (pag compra.html)
    leerLocalStorageCompra(){
        let productosLS;
        productosLS = this.obtenerProductosLocalStorage();
        productosLS.forEach(function (producto){
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>
                    <img src="${producto.imagen}" width=100>
                </td>
                <td>${producto.titulo}</td>
                <td>$ ${producto.precio}</td>
                <td>
                    <input type="number" class="form-control cantidad" min="1" value=${producto.cantidad}>
                </td>
                <td id='subtotales'>$ ${producto.precio * producto.cantidad}</td>
                <td>
                <a href="#" class="borrar-producto buttondelet"  data-id="${producto.id}"> X </a>
                </td>
            `;
            listaCompra.appendChild(row);
        });
    }

    //Elimina producto del Local storage (pag compra.html)
    eliminarProductoLocalStorage(productoID){
        let productosLS;

        productosLS = this.obtenerProductosLocalStorage();
        productosLS.forEach(function(productoLS, index){
            if(productoLS.id === productoID){
                productosLS.splice(index, 1);
            }
        });

        localStorage.setItem('productos', JSON.stringify(productosLS));
    }

    //Vaciar local storage
    vaciarLocalStorage(){
        localStorage.clear();
    }

    //Procesa compra y redirecciona a pag carrito (compra.html)
    procesarPedido(e){
        e.preventDefault();

        if(this.obtenerProductosLocalStorage().length === 0){
            Swal.fire({
                type: 'warning',
                title: 'Oops...',
                text: 'El carrito está vacío, agregue algún producto',
                showConfirmButton: false,
                timer: 3000
            })
        }
        else {
            location.href = "compra.html";
        }
    }

    //Calcula importes finales
    calcularTotal(){
        let productosLS;
        let total = 0, igv = 0, subtotal = 0;
        productosLS = this.obtenerProductosLocalStorage();
        for(let i = 0; i < productosLS.length; i++){
            let element = Number(productosLS[i].precio * productosLS[i].cantidad);
            subtotal += element;
        }
        
        igv = parseFloat(subtotal * 0.21).toFixed(2);
        total = parseFloat(subtotal * 1.21).toFixed(2);

        document.getElementById('subtotal').innerHTML = "AR$ " + subtotal.toFixed(2);
        document.getElementById('igv').innerHTML = "AR$ " + igv;
        document.getElementById('total').innerHTML = "AR$ " + total;
    }

    obtenerEvento(e) {
        e.preventDefault();
        let id, cantidad, producto, productosLS;
        if (e.target.classList.contains('cantidad')) {
            producto = e.target.parentElement.parentElement;
            id = producto.querySelector('a').getAttribute('data-id');
            cantidad = producto.querySelector('input').value;
            let actualizarMontos = document.querySelectorAll('#subtotales');
            productosLS = this.obtenerProductosLocalStorage();
            productosLS.forEach(function (productoLS, index) {
                if (productoLS.id === id) {
                    productoLS.cantidad = cantidad;                    
                    actualizarMontos[index].innerHTML = Number(cantidad * productosLS[index].precio);
                }    
            });
            localStorage.setItem('productos', JSON.stringify(productosLS));
        }
        else {
            console.log("..");
        }
    }
}