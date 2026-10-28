const {Funcionario, Motorista, Carga, Entrega} = require('./models/rel')
const conn = require('./db/conn')

async function syncDataBase() {
    try{
        await conn.sync({force: true})
        console.log('sincronização feita')
    }catch(err){
        console.error('erro',err)
    }finally{
        await conn.close()
        console.log('fechando')
    }
}

syncDataBase()