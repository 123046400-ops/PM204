/*
========================================
 CATÁLOGO DE CAFETERÍA
 ESTRUCTURA CON new Object()
========================================
*/


// ==========================
// BEBIDAS
// ==========================

var ExpresAmericano = new Object();

ExpresAmericano.nombre = "Expres Americano";
ExpresAmericano.precio = 45;
ExpresAmericano.tamaño = "Mediano";
ExpresAmericano.disponible = true;


var Capuccino = new Object();

Capuccino.nombre = "Capuccino";
Capuccino.precio = 60;
Capuccino.tamaño = "Grande";
Capuccino.disponible = true;


var Latte = new Object();

Latte.nombre = "Latte";
Latte.precio = 65;
Latte.tamaño = "Grande";
Latte.disponible = true;


// ==========================
// ALIMENTOS
// ==========================

var SandwichJamon = new Object();

SandwichJamon.nombre = "Sandwich de Jamón";
SandwichJamon.precio = 75;
SandwichJamon.disponible = true;


var EnsaladaCeser = new Object();

EnsaladaCeser.nombre = "Ensalada César";
EnsaladaCeser.precio = 90;
EnsaladaCeser.disponible = true;


var Hamburguesa = new Object();

Hamburguesa.nombre = "Hamburguesa";
Hamburguesa.precio = 120;
Hamburguesa.disponible = true;


// ==========================
// PANADERÍA
// ==========================

var Croissant = new Object();

Croissant.nombre = "Croissant";
Croissant.precio = 35;
Croissant.disponible = true;


var DonaChocolate = new Object();

DonaChocolate.nombre = "Dona de Chocolate";
DonaChocolate.precio = 30;
DonaChocolate.disponible = true;


var Muffin = new Object();

Muffin.nombre = "Muffin de Vainilla";
Muffin.precio = 40;
Muffin.disponible = true;


// ==========================
// CATÁLOGO GENERAL
// ==========================

var catalogo = [
    ExpresAmericano,
    Capuccino,
    Latte,
    SandwichJamon,
    EnsaladaCeser,
    Hamburguesa,
    Croissant,
    DonaChocolate,
    Muffin
];


// ==========================
// MOSTRAR PRODUCTOS
// ==========================

function mostrarCatalogo() {

    console.log("===== CATÁLOGO =====");

    catalogo.forEach(function(producto) {

        console.log(
            "Nombre: " + producto.nombre +
            " | Precio: $" + producto.precio
        );

    });

}


// ==========================
// AGREGAR PRODUCTO
// ==========================

function agregarProducto(producto) {

    catalogo.push(producto);

    console.log("Producto agregado correctamente");

}


// ==========================
// ACTUALIZAR PRODUCTO
// ==========================

function actualizarProducto(nombreProducto, nuevosDatos) {

    var producto = catalogo.find(function(item) {
        return item.nombre === nombreProducto;
    });

    if (producto) {

        Object.assign(producto, nuevosDatos);

        console.log("Producto actualizado");

    } else {

        console.log("Producto no encontrado");

    }

}


// ==========================
// ELIMINAR PRODUCTO
// ==========================

function eliminarProducto(nombreProducto) {

    var indice = catalogo.findIndex(function(item) {
        return item.nombre === nombreProducto;
    });

    if (indice !== -1) {

        catalogo.splice(indice, 1);

        console.log("Producto eliminado");

    } else {

        console.log("Producto no encontrado");

    }

}


// ==========================
// EJEMPLOS
// ==========================

// Mostrar catálogo
mostrarCatalogo();


// Actualizar producto
actualizarProducto("Latte", {
    precio: 70
});


// Eliminar producto
eliminarProducto("Muffin de Vainilla");


// Nuevo producto
var ChocolateCaliente = new Object();

ChocolateCaliente.nombre = "Chocolate Caliente";
ChocolateCaliente.precio = 55;
ChocolateCaliente.disponible = true;


// Agregar producto
agregarProducto(ChocolateCaliente);


// Mostrar catálogo actualizado
mostrarCatalogo();