import { DataTypes } from 'sequelize';

/**
 * Post model definition
 * Defines the structure and validation rules for blog posts
 * @param {Sequelize} sequelize - The Sequelize instance
 * @return {Model} - The Sequelize Post model
 */
export default (sequelize) => {
  const Post = sequelize.define('Post', {
    // Primary key with auto-increment
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    // Author of the post
    author: {
      type: DataTypes.STRING,
      allowNull: false
    },
    // Post title
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    // Post content (TEXT for unlimited length)
    content: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    // Cover image URL
    cover: {
      type: DataTypes.STRING,
      allowNull: false
    },
    // Publication date with default value of current time
    date: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  }, {
    tableName: 'posts',     // Explicitly set table name in database
    timestamps: false       // Disable Sequelize's default timestamp fields (createdAt, updatedAt)
  });

  return Post;
};