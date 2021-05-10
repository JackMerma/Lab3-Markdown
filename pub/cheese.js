
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
			var button = "<br><button onclick='listar()'>Regresar</button>";
			texto = texto + button;
			document.getElementById('contenido').innerHTML = texto;;
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
		var funcion = "ver(\"" + data[i] + "\")";
		html = html + "<li>" + "<a onclick='" + funcion + "')>" + data[i] + "</a></li>\n";
	}
	if(data.length == 0){
		html= "<p>Aún no hay archivos</p>";
	}else{
		html = html + "</ul>\n";
	}
	document.getElementById("contenido").innerHTML = html;
}

//ESTO EN TEORIA NO FUNCIONARIA PARA LA FUNCION VER
//document.addEventListener('DOMContentLoaded', function () {
//	const text = document.getElementById('markupText');
//	document.querySelector('#markupForm').onsubmit = () => {
//		recitar(text.value)
//		return false;
//	}
//})