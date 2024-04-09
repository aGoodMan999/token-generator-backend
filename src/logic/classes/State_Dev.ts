import Visibility_Dev from "../enums/Visibility_Dev";
import { ContractElement } from "../interfaces/ContractElement";
import OverriderSpecifier_Dev from "./OverriderSpecifier_Dev";
class State_Dev extends ContractElement {
    _name: String;
    _type: String;
    _visibility?: Visibility_Dev = Visibility_Dev.INTERNAL;
    _isConstant?: boolean = false;
    _overrideList?: OverriderSpecifier_Dev;
    _isImmutable?: boolean = false;
    _value?: String | undefined;
    constructor(name: String, type: String, visibility?: Visibility_Dev, isConstant?: boolean, overrideList?: OverriderSpecifier_Dev, isImmutable?: boolean, value?: String) {
        super();
        this._name = name;
        this._type = type;
        visibility && (this._visibility = visibility);
        isConstant && (this._isConstant = isConstant);
        overrideList && (this._overrideList = overrideList);
        isImmutable && (this._isImmutable = isImmutable);
        value && (this._value = value);
    }
    toString: Function = (): String => {
        return (`${this._type}`
            + `${this._visibility ? ' ' + Object.values(Visibility_Dev)[this._visibility] : ''}`
            + `${this._isImmutable ? ' immutable' : ''}`
            + `${this._isConstant ? ' constant' : ''}`
            + `${this._overrideList?.listToString()}`)
            + `${this._value ? (` = ${this._value};`) : ''}`;
    }
}


export default State_Dev;
