const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  sequelize.define("User_address", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    AdrressType: {
        type: DataTypes.STRING,
        allowNull: false,
      },    
    AdrressNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    AddressCity:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    AddressProvince: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    AddressCountry: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    AddressPO: {
        type: DataTypes.STRING,
        allowNull: true,
    },    
  });
};
