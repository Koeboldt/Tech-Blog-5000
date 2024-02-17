const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');


class BlogPost extends Model {}

BlogPost.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        username:{
            type: DataTypes.INTEGER,
            allowNull: false,
            references:{
                model: 'user',
                key: 'user_id'
            }
        },
        content: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    },  
    {
        sequelize,
        timestamps: true,
        updatedAt: false,
        createdAt: 'date_created',
        freezeTableName: true,
        modelName: 'blog_posts',
      }
);
module.exports = BlogPost;