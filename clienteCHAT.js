// Importamos los modulos necesarios
const net = require('net');
// Direccion del servidor
const direccion = '127.0.0.1';
//puerto de escucha del servidor
const puerto = 8888;
iniciarCliente();
//iniciamos el cliente
function iniciarCliente() {
    // creamos el socket del cliente
    const client = new net.Socket();
    // creamos una variable para el mensaje
    var lectura = process.openStdin();
    //nos conectamos al servidor
    client.connect(puerto, direccion, ()=> {
        const address = client.address();
        //obtenemos el puerto del cliente
        const port = address.port;
        //obtenemos la direccion del cliente
        const ipaddr = address.address;
        console.log("RICHARD POMACOSI QUISPE PARALELO: C");
        console.log("****Cliente TCP INICIADO****");
        console.log("  Cliente escuchando: " + ipaddr + ":" + port);
        console.log("CLIENTE : ");
    });
    lectura.on('data', function(d) {
        const datoEnviar = d.toString().trim();
        // enviamos el datagrama al servidor
        client.write(datoEnviar);
    });
    // recibimos el datagrama del servidor
    client.on('data', data => {
        console.log('SERVIDOR : ' + data);
        console.log("CLIENTE : ");
    });
    // cerramos el socket cliente
    client.on('close', () => {
        console.log('Conexión cerrada');
        process.exit();
    });
}