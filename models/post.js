module.exports = (sequelize, DataTypes, User) => {


  const Post = sequelize.define('post', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    post: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    }
  }, {});

  Post.belongsTo(User, {
    foreignKey: 'userId'
  });


  Post.addPost = (post) => {
    return Post.create(post);
  };

  return Post;
};
