

console.log("Hola Mundo Js desde el servidor")

/* promedio 2 variables*/
let edad1= 11
let edad2= 33
console.log("Edad promedio")
console.log((edad1+edad2)/2)

/*Medir tiempo de procesos*/
console.time("miProceso")
 for(let i=0; i<1000000; i++){}
console.timeEnd("miProceso")

/*/ Objetos tipo tabla*/
let usuarios=[
    {nombre: "ivan",edad:"38"},
    {nombre: "isay",edad:"38"}
]

console.table(usuarios)