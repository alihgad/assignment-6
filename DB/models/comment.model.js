import { DataTypes } from "sequelize";
import {sequelize} from "../connection.js";
import post from "./post.model.js";
import user from "./user.model.js";



const comment = sequelize.define('Comment',{

    content : {
        type : DataTypes.STRING,
        allowNull : false
    }
    ,

    softDelete : {
        type : DataTypes.BOOLEAN,
        allowNull : false,
        defaultValue : false
    }


})




user.hasMany(comment,{
    onUpdate: 'CASCADE',
    onDelete: 'NO ACTION',
    foreignKey: {
        allowNull: false
    },
    sourceKey: 'id'
});

comment.belongsTo(user);


post.hasMany(comment, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
    foreignKey: {
        allowNull: false
    },
    sourceKey: 'id'
});
comment.belongsTo(post);










export default comment;




