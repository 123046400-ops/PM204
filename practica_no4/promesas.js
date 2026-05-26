const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});


// BEBIDAS

const ExpresAmericano = new Object();
ExpresAmericano.nombre = "Expres Americano";
ExpresAmericano.precio = 45;
ExpresAmericano.tamaño = "Mediano";
ExpresAmericano.disponible = true;

const Capuccino = new Object();
Capuccino.nombre = "Capuccino";
Capuccino.precio = 60;
Capuccino.tamaño = "Grande";
Capuccino.disponible = true;

const Latte = new Object();
Latte.nombre = "Latte";
Latte.precio = 65;
Latte.tamaño = "Grande";
Latte.disponible = true;

// ==========================
// ALIMENTOS
// ==========================

const SandwichJamon = new Object();
SandwichJamon.nombre = "Sandwich de Jamón";
SandwichJamon.precio = 75;
SandwichJamon.disponible = true;

const EnsaladaCeser = new Object();
EnsaladaCeser.nombre = "Ensalada César";
EnsaladaCeser.precio = 90;
EnsaladaCeser.disponible = true;

const Hamburguesa = new Object();
Hamburguesa.nombre = "Hamburguesa";
Hamburguesa.precio = 120;
Hamburguesa.disponible = true;

// PANADERÍA

const Croissant = new Object();
Croissant.nombre = "Croissant";
Croissant.precio = 35;
Croissant.disponible = true;

const DonaChocolate = new Object();
DonaChocolate.nombre = "Dona de Chocolate";
DonaChocolate.precio = 30;
DonaChocolate.disponible = true;

const Muffin = new Object();
Muffin.nombre = "Muffin de Vainilla";
Muffin.precio = 40;
Muffin.disponible = true;

// CATÁLOGO POR SECCIONES

const bebidas   = [ExpresAmericano, Capuccino, Latte];
const alimentos = [SandwichJamon, EnsaladaCeser, Hamburguesa];
const panaderia = [Croissant, DonaChocolate, Muffin];

const todos = [ExpresAmericano, Capuccino, Latte,
               SandwichJamon, EnsaladaCeser, Hamburguesa,
               Croissant, DonaChocolate, Muffin];

// PEDIDO ACTUAL

const pedido = [];

// MOSTRAR MENU

function mostrarMenu() {
    console.log("\n         MENU CAFECITO        ");

    console.log("\n --- BEBIDAS ---");
    bebidas.forEach(function(producto, indice) {
        console.log("  " + (indice + 1) + ". " + producto.nombre + " - $" + producto.precio);
    });

    console.log("\n --- ALIMENTOS ---");
    alimentos.forEach(function(producto, indice) {
        console.log("  " + (indice + 4) + ". " + producto.nombre + " - $" + producto.precio);
    });

    console.log("\n --- PANADERIA ---");
    panaderia.forEach(function(producto, indice) {
        console.log("  " + (indice + 7) + ". " + producto.nombre + " - $" + producto.precio);
    });

    console.log("\n  0.  Cancelar pedido");
    console.log("  00. Terminar pedido y ver total");
}

// MODULO DE COCINA

// FUNCION 1 - Preparar cafe
// Simula la preparacion de una bebida de cafe.
// Si todo sale bien resuelve con el mensaje de listo.

const prepararCafe = (nombreProducto) => {
    return new Promise((resolve, reject) => {

        console.log("\n[COCINA] Iniciando preparacion de " + nombreProducto + "...");

        setTimeout(() => {
            console.log("[COCINA] Moliendo cafe...");
        }, 500);

        setTimeout(() => {
            console.log("[COCINA] Calentando agua...");
        }, 1000);

        setTimeout(() => {
            console.log("[COCINA] Sirviendo en vaso...");
        }, 1500);

        setTimeout(() => {
            resolve(nombreProducto + " listo para entregar. Tiempo: 2s");
        }, 2000);
    });
};


// FUNCION 2 - Error de cocina
// Simula un fallo durante la preparacion.
// Rechaza la promesa y cancela el pedido.

const errorCocina = (nombreProducto) => {
    return new Promise((resolve, reject) => {

        console.log("\n[COCINA] Iniciando preparacion de " + nombreProducto + "...");

        setTimeout(() => {
            console.log("[COCINA] Calentando agua...");
        }, 500);

        setTimeout(() => {
            console.log("[COCINA] ALERTA: Temperatura inestable...");
        }, 1000);

        setTimeout(() => {
            reject("Error de cocina: fallo en la preparacion de " + nombreProducto + ". Pedido cancelado.");
        }, 1500);
    });
};


// FUNCION 3 - Falta ingrediente
// Simula que no hay stock de un ingrediente necesario.
// Rechaza la promesa y cancela el pedido.

const faltaIngrediente = (nombreProducto) => {
    return new Promise((resolve, reject) => {

        console.log("\n[COCINA] Verificando ingredientes para " + nombreProducto + "...");

        setTimeout(() => {
            console.log("[COCINA] Buscando ingredientes en inventario...");
        }, 500);

        setTimeout(() => {
            console.log("[COCINA] Ingrediente no encontrado...");
        }, 1000);

        setTimeout(() => {
            reject("Falta ingrediente: no se puede preparar " + nombreProducto + ". Pedido cancelado.");
        }, 1500);
    });
};


// PROCESAR PEDIDO EN COCINA

// Decide que funcion usar segun el producto.
// Las bebidas van a prepararCafe.
// Si el producto es Ensalada simula error de cocina.
// Si el producto es Muffin simula falta de ingrediente.

function procesarPedidoEnCocina(nombre) {
    console.log("\n[COCINA] Pedido recibido de " + nombre + ". Iniciando preparacion...");

    const promesas = pedido.map(function(producto) {

        const esBebida      = bebidas.includes(producto);
        const hayError      = producto.nombre === "Ensalada César";
        const faltaStock    = producto.nombre === "Muffin de Vainilla";

        if (esBebida) {
            return prepararCafe(producto.nombre);
        } else if (hayError) {
            return errorCocina(producto.nombre);
        } else if (faltaStock) {
            return faltaIngrediente(producto.nombre);
        } else {
            return prepararCafe(producto.nombre);
        }
    });

    Promise.all(promesas)
        .then(function(resultados) {
            console.log("\n[COCINA] Todos los productos listos:");
            resultados.forEach(function(resultado) {
                console.log("  - " + resultado);
            });
            notificarPedidoListo(nombre, function() {
                rl.close();
            });
        })
        .catch(function(error) {
            console.log("\n[COCINA] " + error);
            notificarPedidoCancelado(nombre, function() {
                rl.close();
            });
        })
        .finally(function() {
            console.log("\n[COCINA] Cocina lista para la siguiente orden.");
        });
}

// NOTIFICACIONES - CALLBACKS

function notificarPedidoListo(nombre, callback) {
    console.log("\nPreparando tu pedido...");
    setTimeout(function() {
        console.log("\nPedido listo! Pasa a recogerlo " + nombre + "!");
        callback();
    }, 2000);
}

function notificarPedidoCancelado(nombre, callback) {
    console.log("\nCancelando tu pedido...");
    setTimeout(function() {
        console.log("\nPedido cancelado. Hasta pronto " + nombre + "!");
        callback();
    }, 1000);
}

// MOSTRAR TOTAL

function mostrarTotal(nombre) {

    const subtotal = pedido.reduce(function(acumulador, producto) {
        const { precio } = producto;
        return acumulador + precio;
    }, 0);

    const iva   = subtotal * 0.16;
    const total = subtotal + iva;

    console.log("\n --- TU PEDIDO ---");

    pedido.forEach(function(producto) {
        const { nombre: nombreProducto, precio } = producto;
        console.log("  " + nombreProducto + " - $" + precio);
    });

    console.log("\n  Subtotal: $" + subtotal.toFixed(2));
    console.log("  IVA 16%:  $" + iva.toFixed(2));
    console.log("  Total:    $" + total.toFixed(2));

    procesarPedidoEnCocina(nombre);
}

// ELEGIR PRODUCTOS

function elegirProducto(nombre) {
    mostrarMenu();

    rl.question("\nElige el numero de tu producto: ", function(opcion) {

        if (opcion.trim() === "00") {
            if (pedido.length === 0) {
                console.log("\nNo elegiste ningun producto.");
                elegirProducto(nombre);
            } else {
                mostrarTotal(nombre);
            }

        } else {
            const seleccion = parseInt(opcion);

            if (seleccion === 0) {
                notificarPedidoCancelado(nombre, function() {
                    rl.close();
                });

            } else if (seleccion >= 1 && seleccion <= todos.length) {
                const producto = todos[seleccion - 1];
                pedido.push(producto);
                console.log("\nAgregado: " + producto.nombre + " - $" + producto.precio);
                console.log("Productos en tu pedido: " + pedido.length);
                elegirProducto(nombre);

            } else {
                console.log("\nOpcion no valida, intenta de nuevo.");
                elegirProducto(nombre);
            }
        }
    });
}

// PROGRAMA PRINCIPAL

console.log("Hola Bienvenidos a Cafecito");

rl.question("\nCual es tu nombre? ", function(nombre) {
    console.log("\nHola " + nombre + "! Que vas a ordenar hoy?");
    elegirProducto(nombre);
});