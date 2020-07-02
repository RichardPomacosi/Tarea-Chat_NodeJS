//importamos los modulos necesarios.
const net = require('net');
// variables servidor
const puerto = 8888;
// iniciamos servidor
iniciarServidor();
function iniciarServidor() {
	// Creamos el servidor TCP
	const server = net.createServer();
	// creamos la variable de lectura
    var lectura = process.openStdin();
	// Emite cuando el socket está listo y escuchando mensajes de datagramas
	server.listen(puerto, 'localhost', () => {
		const address = server.address();
		const port = address.port;
		const ipaddr = address.address;
		console.log("RICHARD POMACOSI QUISPE PARALELO: C");
		console.log("********SERVIDOR TCP INICIADO********");
		console.log("   El servidor esta escuchando : " + ipaddr + ":" + port);
	});
	const sockets = [];
	server.on('connection', (sock) => {
		// colocamos el sock en el vector sockets
		sockets.push(sock);
		// Ingresamos datos
		lectura.on('data', function(d) {
			// enviamos en response la cadena 'SERVIDOR: hola'
			const datoEnviar = d.toString().trim();
			// intanciamos el buffer para el mensaje a enviar
			const dataBuffer = Buffer.from(datoEnviar);
			// Enviamos dato al cliente
			sock.write(dataBuffer);
		});
		// Recibimos el mensaje y enviamos al cliente
		sock.on('data', data => {
			// guardamos el mensaje del cliente
			var datoRecibido = data.toString();
			// Mostramos el mensaje recibido del cliente
			console.log('CLIENTE : '+ datoRecibido);
			console.log("SERVIDOR : ");
		});

		// Cerramos la conexion del socket
		sock.on('close', data => {
			let index = sockets.findIndex( o => {
				return o.remoteAddress === sock.remoteAddress && o.remotePort === sock.remotePort;
			});
			if (index !== -1) {
				sockets.splice(index, 1);
			}
		});
	});
	// Emite cuando existe algun error
	server.on('error', (error) => {
		console.log("error", error);
		server.close();
	});
}
