import AccessControlState from "../AccessControlState";
import ERC721Mapper from "../../../../mappers/ERC721Mapper";
import AccessControl_Dev from "../../../../enums/AccessControl_Dev";


class AC_NoneState extends AccessControlState {
    constructor(mapper: ERC721Mapper) {
        super(mapper);
        this._mapper._accessControl = AccessControl_Dev.NONE;
    }
    override setName(name: String) {
        super.setName(name);
    }
    override setLicense(license: String) {
        super.setLicense(license);
    }
    override setSymbol(symbol: String) {
        super.setSymbol(symbol);
    };
    // setPremint = (amount: number) => {
    //     super.setPremint(amount);
    // };
    // setIsPermit = (isPermit: boolean) => {
    //     super.setIsPermit(isPermit);
    // };
    // setIsBurnable = (isBurnable: boolean) => {
    //     super.setIsBurnable(isBurnable);
    // };
    setIsPausable = (isPausable: boolean) => {
        throw Error("Can not set pausable without access control");
    };
    // setIsFlashMintable = (isFlashMint: boolean) => {
    //     super.setIsFlashMintable(isFlashMint);
    // };
    setIsMintable = (isMintable: boolean) => {
        if (isMintable === this._mapper._isMintable) {
            return;
        } else {
            const functionList = this._mapper.contract.contractBody._functionList;
            if (isMintable) {
                if (this._mapper.constructor.name === "AC_NoneState") {
                    console.log("Access control have to be set before mintable")
                    this._mapper.changeAccessControlState(AccessControl_Dev.OWNABLE);
                    return;
                }
            } else {
                // REMOVE MINT FUNCTION IF EXIST
                if (functionList.find((item) => item._name === 'mint')) {
                    functionList.splice(functionList.findIndex((item) => item._name === 'mint'), 1);
                }
            }
        }
        this._mapper._isMintable = isMintable;

    };

}
export default AC_NoneState;