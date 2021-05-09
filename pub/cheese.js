function ver(markupText) {
  //TENER EN CUENTA QUE LUEGO DE VER TAMBIEN HAY QUE REGRESAR AL LISTADO
  //TIENE QUE MODIFICARSE DE TAL MANERA QUE AL HACER CLICK EN EL ARCHIVO SE MUESTRE
  
  const url = 'http://localhost:3000/ver'
	const data = {
		text: markupText
	}
  console.log(data);
  const request = {
		method: 'POST', // Podría ser GET
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(data),
	}
	http = fetch(url, request)
	http.then(
		response => response.json()
	).then(
		data => {
			document.getElementById('htmlText').innerHTML = data.text;
		}
	)
}


function listar() {
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
		html = html + "<li>"+data[i]+"</li>\n";
	}
	if(data.length == 0){
		html= "<p>Aún no hay archivos</p>";
	}else{
		html = html + "</ul>\n";
	}
	document.getElementById("lista").innerHTML = html;
}
/*
//ESTO EN TEORIA NO FUNCIONARIA PARA LA FUNCION VER
document.addEventListener('DOMContentLoaded', function () {
	const text = document.getElementById('markupText');
	document.querySelector('#markupForm').onsubmit = () => {
		recitar(text.value)
		return false;
	}
})
*/

//@jackMerma
//funcion crear() -> mostrar formulario y opciones
function crear(){
	console.log("funcion crear");
	//tomare al div del cuerpo -> bodyContent
	let html = "<div id='formBox'>" 
	+ "<form id='form'>"
	+ "<label for='archiveName'>Archivo: </label>"
	+ "<input type='text' id='archiveName'><br>"
	+ "<textarea id='text'></textarea><br>"
	+ "<input type='submit' value='guardar'><a href='http://localhost:3000/'>Cancelar</a>" //al cancelar muestra el inicio
	+ "</form>"
	+ "</div>";
	console.log(html);
	document.querySelector('#bodyContent').innerHTML = html;
	enviarData();
}
//extraer data del formulario una vez enviada
function enviarData(){ //no se tiene que hacer un listener event para cuando se cargue la pagina
	const text = document.querySelector('#text')
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
	//listar();

}