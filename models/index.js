const User = require('./User.js');
const BlogPost = require('./BlogPost.js');

User.hasMany(BlogPost, {
    foreignKey: 'id',
    onDelete: 'CASCADE'
});
BlogPost.belongsTo(User, {
    foreignKey:'user_id'
});


module.exports = { User, BlogPost };