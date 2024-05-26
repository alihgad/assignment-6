import { Sequelize } from "sequelize";


export const sequelize = new Sequelize('assignment-6', 'root', '', {
    host: 'localhost',
    dialect:  'mysql' 
  });


 let connection = async()=>{ await sequelize.sync({alter:false}).then((response) => {
  console.log('Connection has been established successfully.');
}).catch((error) => {
  console.error('Unable to connect to the database:', error);
})

 }



export default connection;
