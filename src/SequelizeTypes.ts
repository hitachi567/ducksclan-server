import { DataTypes } from 'sequelize';

export default class SequelizeTypes {

    protected type: DataTypes.AbstractDataTypeConstructor | DataTypes.StringDataType
    protected allowNull: boolean = true
    protected defaultValue: DataTypes.AbstractDataTypeConstructor | boolean
    protected _primaryKey: boolean = false
    protected _unique: boolean = false

    static integer() {
        const instance = new SequelizeTypes();
        instance.type = DataTypes.INTEGER;
        return instance;
    }

    static text() {
        const instance = new SequelizeTypes();
        instance.type = DataTypes.TEXT;
        return instance;
    }

    static string(length?: number) {
        const instance = new SequelizeTypes();
        instance.type = DataTypes.STRING(length);
        return instance;
    }

    static uuid() {
        const instance = new SequelizeTypes();
        instance.type = DataTypes.UUID;
        return instance;
    }

    static date() {
        const instance = new SequelizeTypes();
        instance.type = DataTypes.DATE;
        return instance;
    }

    static bool() {
        const instance = new SequelizeTypes();
        instance.type = DataTypes.BOOLEAN;
        return instance;
    }

    notNull() {
        this.allowNull = false;
        return this;
    }

    now() {
        this.defaultValue = DataTypes.NOW;
        return this;
    }

    true() {
        this.defaultValue = true;
        return this;
    }

    false() {
        this.defaultValue = false;
        return this;
    }

    primaryKey() {
        this._primaryKey = true;
        return this;
    }

    unique() {
        this._unique = true;
        return this;
    }

    get value(): {
        type: DataTypes.AbstractDataTypeConstructor | DataTypes.StringDataType,
        defaultValue?: DataTypes.AbstractDataTypeConstructor | boolean,
        allowNull?: boolean,
        primaryKey?: boolean,
        unique?: boolean
    } {
        const type = this.type;
        const allowNull = this.allowNull;
        const defaultValue = this.defaultValue;
        const primaryKey = this._primaryKey;
        const unique = this._unique;
        return {
            type,
            allowNull,
            defaultValue,
            primaryKey,
            unique
        }
    }

    /* let _notNull = { allowNull: false }    
    let _date = { type: DataTypes.DATE }
    let _integer = { type: DataTypes.INTEGER }
    
    let date = {
        value: { ..._date },
        notNull: {
            value: { ..._date, ..._notNull },
            now: {
                value: {
                    ..._date, ..._notNull,
                    defaultValue: DataTypes.NOW
                }
            }
        },
        now: {
            value: { ..._date, defaultValue: DataTypes.NOW }
        }
    }

    return {
        date
    } */
}
