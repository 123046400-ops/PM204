const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function preguntar(texto) {
    return new Promise(function(resolve) {
        rl.question(texto, function(respuesta) {
            resolve(respuesta);
        });
    });
}


// BEBIDAS

var ExpresAmericano = new Object();
ExpresAmericano.nombre = "Expres Americano";
ExpresAmericano.precio = 45;
ExpresAmericano.tamaño = "Mediano";
ExpresAmericano.disponible = true;
ExpresAmericano.categoria = "bebida";

var Capuccino = new Object();
Capuccino.nombre = "Capuccino";
Capuccino.precio = 60;
Capuccino.tamaño = "Grande";
Capuccino.disponible = true;
Capuccino.categoria = "bebida";

var Latte = new Object();
Latte.nombre = "Latte";
Latte.precio = 65;
Latte.tamaño = "Grande";
Latte.disponible = true;
Latte.categoria = "bebida";


// ALIMENTOS

var SandwichJamon = new Object();
SandwichJamon.nombre = "Sandwich de Jamón";
SandwichJamon.precio = 75;
SandwichJamon.disponible = true;
SandwichJamon.categoria = "alimento";

var EnsaladaCeser = new Object();
EnsaladaCeser.nombre = "Ensalada César";
EnsaladaCeser.precio = 90;
EnsaladaCeser.disponible = true;
EnsaladaCeser.categoria = "alimento";

var Hamburguesa = new Object();
Hamburguesa.nombre = "Hamburguesa";
Hamburguesa.precio = 120;
Hamburguesa.disponible = true;
Hamburguesa.categoria = "alimento";


// PANADERIA

var Croissant = new Object();
Croissant.nombre = "Croissant";
Croissant.precio = 35;
Croissant.disponible = true;
Croissant.categoria = "postre";

var DonaChocolate = new Object();
DonaChocolate.nombre = "Dona de Chocolate";
DonaChocolate.precio = 30;
DonaChocolate.disponible = true;
DonaChocolate.categoria = "postre";

var Muffin = new Object();
Muffin.nombre = "Muffin de Vainilla";
Muffin.precio = 40;
Muffin.disponible = true;
Muffin.categoria = "postre";


// MENU POR SECCIONES

var bebidas = [ ExpresAmericano, Capuccino, Latte ];

var alimentos = [ SandwichJamon, EnsaladaCeser, Hamburguesa ];

var panaderia = [ Croissant, DonaChocolate, Muffin ];


// CATALOGO GENERAL

var catalogo = [
    ExpresAmericano, Capuccino, Latte,
    SandwichJamon, EnsaladaCeser, Hamburguesa,
    Croissant, DonaChocolate, Muffin
];


// MOSTRAR MENU

function mostrarMenu() {

    console.log("\n========= MENU CAFETERIA =========");

    console.log("\n--- BEBIDAS ---");
    bebidas.forEach(function(producto, indice) {
        console.log((indice + 1) + ". " + producto.nombre + " - $" + producto.precio);
    });

    console.log("\n--- ALIMENTOS ---");
    alimentos.forEach(function(producto, indice) {
        console.log((indice + 4) + ". " + producto.nombre + " - $" + producto.precio);
    });

    console.log("\n--- PANADERIA ---");
    panaderia.forEach(function(producto, indice) {
        console.log((indice + 7) + ". " + producto.nombre + " - $" + producto.precio);
    });

}


// MOSTRAR CATALOGO

function mostrarCatalogo() {

    console.log("\n========= CATALOGO =========");

    catalogo.forEach(function(producto) {
        console.log("Nombre: " + producto.nombre + " | Precio: $" + producto.precio);
    });

}


// AGREGAR PRODUCTO

function agregarProducto(producto) {
    catalogo.push(producto);
    console.log("Producto agregado correctamente");
}


// ACTUALIZAR PRODUCTO

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


// ELIMINAR PRODUCTO

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


// BUSQUEDA INTERACTIVA
async function buscar() {

    console.log("\nQue quieres buscar?");
    console.log("1. Productos baratos");
    console.log("2. Productos caros");
    console.log("3. Bebidas");
    console.log("4. Postres");

    var tipo = await preguntar("\nElige una opcion: ");

    // Si el usuario elige baratos o caros, pedimos el precio limite
    // Si elige bebidas o postres, solo filtramos por categoria

    if (tipo === "1") {

        var input = await preguntar("Mostrar productos menores a: $");
        var limite = Number(input);

        // filter() devuelve todos los productos que cumplan la condicion
        var resultado = catalogo.filter(function(producto) {
            return producto.precio < limite;
        });

        console.log("\nProductos baratos (menos de $" + limite + "):");
        console.log("-----------------------------------");

        resultado.forEach(function(p) {
            console.log(p.nombre + " - $" + p.precio);
        });

    } else if (tipo === "2") {

        var input = await preguntar("Mostrar productos mayores a: $");
        var limite = Number(input);

        // filter() devuelve todos los que tengan precio mayor al limite
        var resultado = catalogo.filter(function(producto) {
            return producto.precio > limite;
        });

        console.log("\nProductos caros (mas de $" + limite + "):");
        console.log("-----------------------------------");

        resultado.forEach(function(p) {
            console.log(p.nombre + " - $" + p.precio);
        });

    } else if (tipo === "3") {

        // filter() filtra por la propiedad categoria
        var resultado = catalogo.filter(function(producto) {
            return producto.categoria === "bebida";
        });

        console.log("\nBebidas:");
        console.log("-----------------------------------");

        resultado.forEach(function(p) {
            console.log(p.nombre + " - $" + p.precio);
        });

    } else if (tipo === "4") {

        // filter() filtra todos los que sean categoria postre
        var resultado = catalogo.filter(function(producto) {
            return producto.categoria === "postre";
        });

        console.log("\nPostres:");
        console.log("-----------------------------------");

        resultado.forEach(function(p) {
            console.log(p.nombre + " - $" + p.precio);
        });

    } else {

        console.log("Opcion no valida.");

    }

}


// MENU PRINCIPAL

async function menu() {

    var activo = true;

    while (activo) {

        console.log("\n========= CAFETERIA =========");
        console.log("1. Mostrar menu");
        console.log("2. Mostrar catalogo");
        console.log("3. Buscar productos");
        console.log("4. Agregar producto");
        console.log("5. Actualizar producto");
        console.log("6. Eliminar producto");
        console.log("0. Salir");

        var opcion = await preguntar("\nOpcion: ");

        switch (opcion.trim()) {

            case "1":
                mostrarMenu();
                break;

            case "2":
                mostrarCatalogo();
                break;

            case "3":
                // Aqui entra al submenu de busqueda
                await buscar();
                break;

            case "4":
                var nombre = await preguntar("Nombre del producto: ");
                var precio = await preguntar("Precio: $");
                var categoria = await preguntar("Categoria (bebida / alimento / postre): ");

                var nuevoProducto = new Object();
                nuevoProducto.nombre = nombre;
                nuevoProducto.precio = Number(precio);
                nuevoProducto.categoria = categoria;
                nuevoProducto.disponible = true;

                agregarProducto(nuevoProducto);
                break;

            case "5":
                var nombre = await preguntar("Nombre del producto a actualizar: ");
                var nuevoPrecio = await preguntar("Nuevo precio: $");
                actualizarProducto(nombre, { precio: Number(nuevoPrecio) });
                break;

            case "6":
                var nombre = await preguntar("Nombre del producto a eliminar: ");
                eliminarProducto(nombre);
                break;

            case "0":
                activo = false;
                rl.close();
                break;

            default:
                console.log("Opcion no valida.");

        }

    }

}

menu();