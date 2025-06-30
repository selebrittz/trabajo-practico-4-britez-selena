import { DataTypes } from "sequelize";
import { sequelize } from "./config/database.js" ;

export const Character = sequelize.define( 'Character', {
    id: {
        type: DataTypes.INTERGER,
        primatyKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    ki: {
        type: DataTypes.INTERGER,
        allowNull: false,
    },
    race: {
        type: DataTypes.STRING,
        allowNull: false,
    },
     gender: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    
    description: {
        type: DataTypes.STRING,
        allowNull: true
    }
});