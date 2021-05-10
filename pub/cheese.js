function ver(fileName) {//PRIMERO BUSCO EL ARCHIVO
	const url = 'http://localhost:3000/view';
	console.log(fileName);
	const data = {
		text: fileName
	}
	console.log(data);
  const request = {
		method: 'POST', // Podría ser GET sin incorporar un BODY
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(data),
	}
	fetch(url, request).then(//RECIBO EL OBJETO INTERPRETADO POR MARKDOWN
		response => response.json()
	).then(
		data => {
			var texto = data.text;
			console.log(texto);
			var button = "<br><button onclick='explorar()'>Regresar</button>";
			texto = texto + button;
			document.getElementById('contenido').innerHTML = texto;;
		}
	)
}

function explorar() {
	const url = 'http://localhost:3000/explorar';
  fetch(url).then(
    response => response.json()
  ).then(
    data => {
      renderList(data);
    }
  )
}
function renderList(data) {//Anexa al HTML LA LISTA ES LLAMADA POR LA FUNCION DE ARRIBA LISTAR()
	var html = "<ul>\n";
	for (let i = 0; i < data.length; i++) {
		console.log(data[i]);
		var funcion = "ver(\"" + data[i] + "\")";
		html = html + "<li id='liFile'>" + "<a id='linkFile' onclick='" + funcion + "')>" + data[i] + "</a></li>\n";
	}
	if(data.length == 0){
		html= "<p>Aún no hay archivos</p>";
	}else{
		html = html + "</ul>\n";
	}
	document.getElementById("contenido").innerHTML = html;
}

//@jackMerma
//funcion crear() -> mostrar formulario y opciones
function crear(){
	console.log("funcion crear");
	//tomare al div del cuerpo -> bodyContent
	let html = "<div id='formBox'>" 
	+ "<form id='form'>"
	+ "<div><label for='archiveName'>Archivo: </label>"
	+ "<input type='text' id='archiveName' placeholder='File...' required></div><br>"
	+ "<div id='text'><textarea id='textMarkdown' cols='50' rows='10'></textarea></div><br>"
	+ "<div id='buttons'><input class='linkC' type='submit' value='guardar'><a id='linkButton' class='linkC' href='http://localhost:3000/'>cancelar</a>" //al cancelar muestra el inicio
	+ "</div></form>"
	+ "</div>";
	console.log(html);
	document.querySelector('#contenido').innerHTML = html;
	enviarData();
}
//extraer data del formulario una vez enviada
function enviarData(){ //no se tiene que hacer un listener event para cuando se cargue la pagina
	const text = document.querySelector('#textMarkdown')
	const name = document.querySelector('#archiveName')
	document.querySelector('#form').onsubmit = () => {
		console.log(text.value)
		console.log(name.value)
		guardar(text.value, name.value)
		return false;
	}
}
function guardar(textM, archiveName){
	const url = 'http://localhost:3000/save'
	const data = { //envio al objeto con text y data
		text: textM,
		name: archiveName
	}
	console.log(data)
	const request = {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(data),
	}
	fetch(url, request) //no debe retornar nada
	//listar de nuevo archivos
	explorar();

}
