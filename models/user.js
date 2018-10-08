module.exports = (sequelize, DataTypes) => {
  let User = sequelize.define('user', {
    email: {
      type: DataTypes.STRING,
      unique: true,
      validate: {
        notEmpty: true
      },
      allowNull: false
    },
    userName: DataTypes.STRING,
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    }
  }, {});

  User.addUser = (user) => {
    return User.create(user);
  };

  User.getAllUsers = () => {
    return User.all();
  };

  User.findOne = (id) => {
    User.findOne({where: {id: id}});
  };


  return User;
};

