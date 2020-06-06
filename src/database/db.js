// importar a dependencia do sqlite3 

const sqlite3 = require("sqlite3").verbose()

// criar o objeto que irá fazer operações no banco de dados 

const db = new sqlite3.Database("./src/database/database.db")

// Utilizar o objeto de banco de dados, para nossas operações 

module.exports = db 

//PARA RODAR FAVOR UTILIZAR O SEGUINTE COMANDO : 
// node src/database/db.js

// E DESCOMENTAR QUAL AÇÃO IRA UTILIZAR EX. DELETE OU PUT ETC ...


/*
db.serialize(() => {

    // com comandos SQL eu vou :

    // 1 Criar uma tabela 

    db.run(`
        CREATE TABLE IF NOT EXISTS places (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            image TEXT,
            name TEXT,
            address TEXT,
            address2 TEXT,
            state TEXT,
            city TEXT,
            items TEXT

        );
    `)
    // 2 Inserir dados na tabela 
const query = `
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
    "https://images.unsplash.com/photo-1567393528677-d6adae7d4a0a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80",
    "Paperside",
    "Guilherme Gemballa, Jardim América",
    "Número 260",
    "Santa Catarina",
    "Rio Sul",
    "Papeis e Papelão"
]

function afterInsertData(err){
    if(err) {
        return console.log(err)
    }
    console.log("Cadastrado com sucesso ")
    console.log(this)
}

    db.run(query,values,afterInsertData)

    // 3 Consultar os dados da tabela 

    db.all(`SELECT * FROM places`,function (err, rows) {
                     if (err) {
                        return console.log(err)
                    }
        
                    console.log("Aqui estão seus registros: ")
                     console.log(rows)
                })

        // 4 Deletar um dado da tabela 

            db.run(`DELETE FROM places WHERE id = ?`, [1], function (err) {
                 if(err) {
                     return console.log(err)
                 }
    
                 console.log("Registro foi apagado com sucesso")
             })
     

})

*/
