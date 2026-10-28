const cryptoJs = require('crypto-js')
const CHAVE_SECRETA = 'segredo'

function authMiddleware(req,res,next){
    const token = req.headers['authorization']

    if(!token){
        return res.status(401).json({message: 'não tem token'})
    }

    try{
        const bytes = cryptoJs.AES.decrypt(token,CHAVE_SECRETA)
        const dadosDecript = bytes.toString(cryptoJs.enc.Utf8)

        if(!dadosDecript){
            return res.status(401).json({message: 'dados invalido'})
        }

        const payload = JSON.parse(dadosDecript)

        if(Date.now() > payload.expiraEm){
            return res.status(401).json({message: 'tempo expirado'})
        }

        req.usuario = payload

        next()
    }catch(err){
        res.status(500).json({message: 'erro'})
    }
}

module.exports = authMiddleware