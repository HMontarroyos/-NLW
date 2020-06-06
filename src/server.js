// const express = require('express');
// const server = express ()
// // configurar pasta publica 

// // Pegar o banco de dados 

// const db = require("./database/db.js")

// server.use(express.static("public"))

// // habilitar o uso do req.body na aplicação 
// server.use(express.urlencoded({extended:true}))


// // utilizando template engine nunjucks 

// const nunjucks = require('nunjucks')
// nunjucks.configure("src/views", {
//     express: server,
//     noCache: true
// })

// // configurar caminhos da minha aplicação 
// // pagina inicial 
// // req : Requisição 
// // res: Resposta 
// server.get("/",(req,resp)=>{
//     return resp.render("index.html")
// })

// server.get("/create-point",(req,resp)=>{
//     return resp.render("create-point.html")
// })

// server.post("/savepoint", (req, res) => {
//     // Inserir dados no banco de dados 
//     const query=` 
//        INSERT INTO places (
     
//            image,
//            name,
//            address,
//            address2,
//            state,
//            city,
//            items
//        ) VALUES (?,?,?,?,?,?,?);
//    `

//    const values = [
//        req.body.image,
//        req.body.name,
//        req.body.address,
//        req.body.address2,
//        req.body.state,
//        req.body.city,
//        req.body.items
//    ]

//    function afterInsertData(err) {
//        if(err) {
//            console.log(err)
//            return res.send("Erro no cadastro!")
//        }
//        console.log("Cadastrado com sucesso")
//        console.log(this)
//    }

//    db.run(query, values, afterInsertData)


//    db.all(`SELECT * FROM places`,function (err, rows) {
//        if (err) {
//            return console.log(err)
//        }

//        console.log("Aqui estão seus registros: ")
//        console.log(rows)

//        return  res.render("create-point.html", { saved: true })
//    })

// })


// server.get("/search", (req, res) => {
//     // Pegar os dados do banco de dados  

//     const search = req.query.search
//     if (search == "" ){
//         return res.render("search-results.html", { total: 0 })
//     }

//     db.all(`SELECT * FROM places WHERE LIKE '%${search}%'`, function (err, rows) {
//         if (err) {
//             return console.log(err)
//         }

//         const total = rows.length
//         // mostrar a pagina com os dados do banco de dados 
//         return res.render("search-results.html", { places: rows, total: total})
//     })
// })


// // ligar o servidor 
// server.listen(2000)


const express = require("express")
const server = express()

//pegar banco de dados
const db = require("./database/db")

//Configurar Pasta Public
server.use(express.static("public"))

//habilitar o uso de rq.body
server.use(express.urlencoded ( { extended:true } ) )
//usando template engine nunjucks
    const nunjucks= require("nunjucks")

    nunjucks.configure("src/views", {
        express: server,
        noCache: true
    })

//configurar rotas
// >>>> HOME

    server.get("/", (req, res) => {
       return  res.render("index.html", {title: "Seu Market Place de Coleta de resíduos"})    
    })
    
    server.get("/create-point", (req, res) => {
        //req.query: Query strings
        console.log(req.query)
        return res.render("create-point.html")    

    })
    server.post("/savepoint", (req,res) => {
        //req.body: o corpo do fomulário
        //console.log(req.body)

         //inserir dados
        const query = `INSERT INTO places (name,image,address,address2,state,city,items) VALUES (?,?,?,?,?,?,?);`
        const values = [
            req.body.name,
            req.body.image,
            req.body.address,
            req.body.address2,
            req.body.state,
            req.body.city,
            req.body.items,
        ]
        function affterInsertData(err) {
            if (err){
                console.log(err)
                return res.send("Erro de Cadastro")
            }
            console.log ("Cadastrado com Sucesso")
            console.log(this)
            return res.render("create-point.html", {saved: true})
        }
        db.run(query, values, affterInsertData)
    })

    server.get("/search", (req, res) => {

        const search = req.query.search
        if (search=="") {
            return res.render("search-results.html", {total:0})            
        }

        //pegar os dados no banco de dados para exibir no html
        db.all(`SELECT * FROM places`, function(err,rows){

            if (err){
                return console.log(err)
            }
            const total = rows.length
            //console.log("Registros encontrados")
            console.log(rows)
            return res.render("search-results.html", {places: rows, total})    
        })

        
    })
// ligar o servidor
server.listen(3000)