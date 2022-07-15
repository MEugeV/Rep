const { UUIDV4 } = require("sequelize");
const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define("character", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4, //es distinto el tipo para generarlos que el que se permite
      // autoIncrement: true,
      primaryKey: true,
      allowNull: false, //al ser primarykey ya no se puede repetir por lo que no se necesita el allownull
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    species: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    origin: {
      type: DataTypes.STRING,      
      allowNull: false,
    },
    image: {
      type: DataTypes.TEXT,
      // allowNull: false,
    },
    created: {
      type: DataTypes.DATEONLY,
      defaultValue: DataTypes.NOW,
      allowNull: false,
    }
  },{
    timestamps: false
  });
};
