// Definicion del modelo de Comentario con validación

module.exports = function(sequelize, DataTypes) {
  return sequelize.define(
  	'Comment',
    { comment: {
        type: DataTypes.STRING,
        validate: { notEmpty: {msg: "Falta texto"}}
      },
      publicado: {
      	type: DataTypes.BOOLEAN,
      	defaultValue: false
      }
    }
  );
}
