import { BIGINT, DataTypes } from "sequelize";
import {sequelize} from "../connection.js";
import user from "./user.model.js";
import comment from "./comment.model.js";


const post = sequelize.define('Post', {

    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    content: {
        type: DataTypes.STRING,
        allowNull: false
    }
    ,
    softDelete : {
        type : DataTypes.BOOLEAN,
        allowNull : false,
        defaultValue : false
    }
})





post.belongsTo(user, {
    onUpdate: 'CASCADE',
    onDelete: 'NO ACTION',
    foreignKey: {
        allowNull: false
    },
});

user.hasMany(post);





export default post;


