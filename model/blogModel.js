module.exports = (sequelize, DataTypes) => {
    const Blog = sequelize.define("blog", {
      title: {
        type: DataTypes.STRING,
        allowNull: false,  // empty vayo vane error aucha
      },
      subTitle: {
        type: DataTypes.STRING,
        allowNull:false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull:false,
      },
      
    });
    return Blog;
  };