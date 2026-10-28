const {DataTypes} = require('sequelize')
const db = require('../db/conn')

const Entrega = db.define('Entrega',{
    codEntrega:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    cidade: {
        type: DataTypes.STRING,
        allowNull: false
    },
    status:{
        type: DataTypes.ENUM('Entregue','Transito'),
        allowNull: false
    },
    data:{
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    hora:{
        type: DataTypes.TIME,
        allowNull: false
    },
    idCarga:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references:{
            key: 'codCarga',
            model: 'Carga'
        }
    }
},{
    timestamps: false,
    tableName: 'Entrega'
})

module.exports = Entrega