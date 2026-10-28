const Motorista = require('../models/Motorista')
const cryptoJs = require('crypto-js')
const CHAVE_SECRETA = 'segredo'

const cadastrar = async(req,res)=>{
    const valores = req.body

    if(!valores.nome || !valores.cnh || !valores.cpf || !valores.telefone){
        return res.status(400).json({message:'todos os campos são obrigatórios'})
    }

    try{
        const cnhCripto = cryptoJs.AES.encrypt(valores.cnh, CHAVE_SECRETA).toString()
        const cpfCripto = cryptoJs.AES.encrypt(valores.cpf, CHAVE_SECRETA).toString()

        await Motorista.create({
            nome: valores.nome,
            cnh: cnhCripto,
            cpf: cpfCripto,
            telefone: valores.telefone
        })
        res.status(201).json({message: 'dados cadastrados'})
    }catch(err){
        res.status(500).json({message: 'erro'})
    }
}

const consultar = async(req,res)=>{
    const id = req.params.id
    try{
        const dados = await Motorista.findByPk(id)
        if(!dados){
            return res.status(404).json({message: 'não encontrado'})
        }
        const bytesCnh = cryptoJs.AES.decrypt(dados.cnh,CHAVE_SECRETA)
        const cnhDecript = bytesCnh.toString(cryptoJs.enc.Utf8)
        const bytesCpf = cryptoJs.AES.decrypt(dados.cpf,CHAVE_SECRETA)
        const cpfDecript = bytesCpf.toString(cryptoJs.enc.Utf8)
        res.status(200).json({message: `
            nome: ${dados.nome}<br>;
            cnh: ${cnhDecript}<br>;
            cpf: ${cpfDecript}<br>;
            telefone: ${dados.telefone}<br>;
            `})
    }catch(err){
        res.status(500).json({message: 'erro'})
    }
}

const consultarNome = async(req,res)=>{
    const nome = req.params.nome
    try{
        const dados = await Motorista.findOne({where: {nome: nome}})
        if(!dados){
            return res.status(404).json({message: 'não encontrado'})
        }
        const bytesCnh = cryptoJs.AES.decrypt(dados.cnh,CHAVE_SECRETA)
        const cnhDecript = bytesCnh.toString(cryptoJs.enc.Utf8)
        const bytesCpf = cryptoJs.AES.decrypt(dados.cpf,CHAVE_SECRETA)
        const cpfDecript = bytesCpf.toString(cryptoJs.enc.Utf8)
        res.status(200).json({message: `
            nome: ${dados.nome}<br>;
            cnh: ${cnhDecript}<br>;
            cpf: ${cpfDecript}<br>;
            telefone: ${dados.telefone}<br>;
            `})
    }catch(err){
        res.status(500).json({message: 'erro'})
    }
}

const apagar = async(req,res)=>{
    const id = req.params.id
    try{
        const dados = await Motorista.findByPk(id)
        if(!dados){
            return res.status(404).json({message: 'não encontrado'})
        }
        await Motorista.destroy({where: {codMotorista: id}})
        res.status(200).json({message: `apagado com sucesso`})
    }catch(err){
        res.status(500).json({message: 'erro'})
    }
}

module.exports = {cadastrar, consultar, consultarNome, apagar}