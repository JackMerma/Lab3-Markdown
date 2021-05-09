const fs = require('fs');
const path = require('path');
const express = require('express');
const bp = require('body-parser');
//npm install markdown-it
const MarkdownIt = require('markdown-it');
  md = new MarkdownIt;
const app = express();

app.use(express.static('pub'));
app.use(bp.json());
app.use(bp.urlencoded({
  extended: true
}))

app.listen(3000, () => {
	console.log("Escuchando en: http://localhost:3000");
});

app.get('/', (request, response) => {
	response.sendFile(path.resolve(__dirname, 'index.html'));
});

app.post('/', (request, response) => {
  var fileName = request.body.text;
  console.log(fileName);
  fs.readFile(path.resolve(__dirname, 'dat/' + fileName), 'utf8',(err, data) => {
    if(err){
      console.log(err);
      response.status(500).json({
        error: 'message'
      })
      return
    }
    let markDownText = data;
    console.log(markDownText);
    let htmlText = md.render(markDownText);
    response.setHeader('Content-Type', 'application/json');
    response.end(JSON.stringify({
      text: htmlText
    }))
  })
})

app.get('/explorar', (request, response) => {
  fs.readdir(path.resolve(__dirname,'dat/'), (error, files) => {
    if (error) {
      console.error(error)
      response.status(500).json({
        error: 'message'
      })
      return
    }
    console.log(files);
    response.json(files);
  });
});
 