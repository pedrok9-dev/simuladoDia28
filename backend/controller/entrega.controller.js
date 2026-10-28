const Carga = require('../models/Carga')
const Entrega = require('../models/Entrega')

const cadastrar = async(req,res)=>{
    const valores = req.body

    if(!valores.cidade || !valores.status || !valores.data || !valores.hora || !valores.idCarga){
        return res.status(400).json({message:'todos os campos são obrigatórios'})
    }

    try{
        const carga = await Carga.findByPk(valores.idCarga)
        if(!carga){
            return res.status(404).json({message: 'não encontrado'})
        }

        const novaEntrega = await Entrega.create(valores)
        res.status(201).json({message: 'dados cadastrados', entrega: novaEntrega})
    }catch(err){
        res.status(500).json({message: 'erro'})
    }
}

module.exports = {cadastrar}