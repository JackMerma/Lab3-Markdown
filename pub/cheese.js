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

//ESTO EN TEORIA NO FUNCIONARIA PARA LA FUNCION VER
document.addEventListener('DOMContentLoaded', function () {
	const text = document.getElementById('markupText');
	document.querySelector('#markupForm').onsubmit = () => {
		recitar(text.value)
		return false;
	}
})