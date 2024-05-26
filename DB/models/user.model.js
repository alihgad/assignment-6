import { DataTypes } from "sequelize";
import {sequelize} from "../connection.js";
import post from "./post.model.js";
import comment from "./comment.model.js";



const user = sequelize.define('User', {
    username:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    email:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    }
    ,
    password:{
        type: DataTypes.BLOB("medium"),
        allowNull: false,
    }
    ,
    softDelete : {
        type : DataTypes.BOOLEAN,
        allowNull : false,
        defaultValue : false
    }
    

})














export default user;

