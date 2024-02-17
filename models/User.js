const {Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');

class User extends Model {
    checkPassword(passwordAttempt) {
        return bcrypt.compareSync(passwordAttempt, this.password);
    }
}

User.init(
    {
        user_id:{
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            validate:{
                len: [5, 23]
            }
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate:{
                isEmail: true
            }
        },
        password:{
            type: DataTypes.STRING,
            allowNull: false,
            validate:{
                len:[7]
            }
        }
    },
    {
        hooks:{
            beforeCreate: async (newUser) => {
                newUser.password = await bcrypt.hash(newUser.password, 13);
                return newUser;
            }
        },
        timestamps: true,
        updatedAt: false,
        createdAt: 'date_joined',
        freezeTableName: true,
        underscored: true,
        modelName: 'user',
        sequelize
    });
module.exports = User;