const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  sequelize.define('Product', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    imagesec: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    imageone: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    imagetwo: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    imagethree: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    imagefour: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    weight: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    discountPercent: {
      type: DataTypes.FLOAT,
      defaultValue: 0,
      allowNull: true,
    },
    isInDiscount: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: true,
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    genres: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'Hombre',
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  });
};
