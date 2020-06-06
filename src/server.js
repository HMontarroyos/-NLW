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
// server.listen(3000)

const express = require("express")
const server = express()

const db = require("./database/db.js")

server.use(express.static("public"))

server.use(express.urlencoded({ extended: true }))

const nunjucks = require("nunjucks")
nunjucks.configure("src/views", {
    express: server,
    noCache: true
})

server.get("//", (req, res) => {
    return res.render("index.html")
})

server.get("/create-point", (req, res) => {
    return res.render("create-point.html")
})

server.post("/savepoint", (req, res) => {
         const query=` 
            INSERT INTO places (
          
                image,
                name,
                address,
                address2,
                state,
                city,
                items
            ) VALUES (?,?,?,?,?,?,?);
        `

        const values = [
            req.body.image,
            req.body.name,
            req.body.address,
            req.body.address2,
            req.body.state,
            req.body.city,
            req.body.items
        ]

        function afterInsertData(err) {
            if(err) {
                console.log(err)
                return res.send("Erro no cadastro!")
            }
            console.log("Cadastrado com sucesso")
            console.log(this)
        }

        db.run(query, values, afterInsertData)


        db.all(`SELECT * FROM places`,function (err, rows) {
            if (err) {
                return console.log(err)
            }

            console.log("Aqui estão seus registros: ")
            console.log(rows)

            return  res.render("create-point.html", { saved: true })
        })

})

server.get("/search", (req, res) => {
    const search = req.query.search
    if (search == "" ){
        return res.render("search-results.html", { total: 0 })
    }

    db.all(`SELECT * FROM places WHERE LIKE '%${search}%'`, function (err, rows) {
        if (err) {
            return console.log(err)
        }

        const total = rows.length

        return res.render("search-results.html", { places: rows, total: total})
    })
})

server.listen(3000)