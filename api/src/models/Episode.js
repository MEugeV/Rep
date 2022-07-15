const { DataTypes } = require('sequelize')
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('episode', {
    id: {
      type: DataTypes.INTEGER,
      // autoIncrement: true, //no es necesario porqeu es el id que trae de la appi el que tomo
      primaryKey: true,      
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

  },{
    timestamps: false
  })
}