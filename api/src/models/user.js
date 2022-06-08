const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  sequelize.define("User", {
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
    surname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      isEmail: true,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    shipping_address: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: "",
    },
    shipping_city_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    shipping_country_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    shipping_postalcode: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },

    role: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "user",
    },
    tokens: {
      type: DataTypes.ARRAY(DataTypes.TEXT),
      defaultValue: [],
    },
    signedInWithGoogle: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: true,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    activationToken: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    needsPasswordReset: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    passwordResetToken: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  });
};