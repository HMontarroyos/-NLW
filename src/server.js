const express = require('express');
const server = express ()
// configurar pasta publica 

server.use(express.static("public"))



// utilizando template engine nunjucks 

const nunjucks = require('nunjucks')
nunjucks.configure("src/views", {
    express: server,
    noCache: true
})

// configurar caminhos da minha aplicação 
// pagina inicial 
// req : Requisição 
// res: Resposta 
server.get("/",(req,resp)=>{
    return resp.render("index.html")
})

server.get("/create-point",(req,resp)=>{
    return resp.render("create-point.html")
})

server.get("/search",(req,resp)=>{
    return resp.render("search-results.html")
})



// ligar o servidor 
server.listen(3000)