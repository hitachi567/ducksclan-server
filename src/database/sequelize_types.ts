import { DataType } from 'sequelize-typescript';

export default function sequelizeTypes() {
    let date_not_null_now = {
        type: DataType.DATE,
        allowNull: false,
        defaultValue: DataType.NOW
    }

    let date = {
        type: DataType.DATE
    }

    let integer = {
        type: DataType.INTEGER
    }

    let integer_not_null = {
        type: DataType.INTEGER,
        allowNull: false
    }

    let uuid_not_null = {
        type: DataType.UUID,
        allowNull: false
    }

    let uuid_primary_key = {
        type: DataType.UUID,
        primaryKey: true
    }

    let text = {
        type: DataType.TEXT
    }

    let text_primary_key = {
        type: DataType.TEXT,
        primaryKey: true
    }

    let text_not_null_unique = {
        type: DataType.TEXT,
        allowNull: false,
        unique: true
    }

    let text_not_null = {
        type: DataType.TEXT,
        allowNull: false
    }

    let boolean_not_null = {
        type: DataType.BOOLEAN,
        allowNull: false
    }

    let string30_not_null_unique = {
        type: DataType.STRING(30),
        allowNull: false,
        unique: true
    }

    return {
        date_not_null_now,
        integer,
        integer_not_null,
        uuid_not_null,
        uuid_primary_key,
        text_primary_key,
        text_not_null_unique,
        text_not_null,
        boolean_not_null,
        date,
        text,
        string30_not_null_unique
    }
}