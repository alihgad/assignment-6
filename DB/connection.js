import { Sequelize } from "sequelize";


export const sequelize = new Sequelize('mysql://unlv5doqqfnerwxj:tXh2TfuL9bUwrUilJAkn@bctxmkcjfumy1hiwhxex-mysql.services.clever-cloud.com:3306/bctxmkcjfumy1hiwhxex');


 let connection = async()=>{ await sequelize.sync({alter:false}).then((response) => {
  console.log('Connection has been established successfully.');
}).catch((error) => {
  console.error('Unable to connect to the database:', error);
})

 }



export default connection;
