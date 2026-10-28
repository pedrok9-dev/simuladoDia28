const {DataTypes} = require('sequelize')
const db = require('../db/conn')

const Carga = db.define('Carga',{
    codCarga:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    descricao: {
        type: DataTypes.STRING,
        allowNull: false
    },
    peso:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    volume:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    rastreio:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    idMotorista:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references:{
            key: 'codMotorista',
            model: 'Motorista'
        }
    }
},{
    timestamps: false,
    tableName: 'Carga'
})

module.exports = Carga