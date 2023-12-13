module.exports = (sequelize, dataTypes) => {
  let alias = 'Book';
  let cols = {
    id: {
      type: dataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    title: {
      type: dataTypes.STRING,
      allowNull: false
    },
    cover: {
      type: dataTypes.STRING
    },
    description: {
      type: dataTypes.STRING
    }
  };
  let config = {
    tableName: 'books',
    timestamps: false,
    paranoid: true,
    deletedAt: "deleted_at",
    updatedAt: "updated_at",
    createdAt: "created_at"
  };
  const Book = sequelize.define(alias, cols, config);

  Book.associate = function (models) {
    Book.belongsToMany(models.Author, {
      as: 'authors',
      through: 'BooksAuthors',
      foreingKey: 'BookId',
      otherKey: 'AuthorId',
      timestamps: false,
    });
  };

  return Book;
};
