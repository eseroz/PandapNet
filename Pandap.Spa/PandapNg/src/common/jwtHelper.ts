export class jwtHelper
{
    _jwtText:string;
    constructor(jwtText:string)
    {
        this._jwtText=jwtText;

    }

    getDecodedToken()
    {
        let payload=this._jwtText.split('.')[1];
        var decodedToken = JSON.parse(window.atob(payload));
        const date = new Date(0);
        date.setUTCSeconds(decodedToken.exp);
        decodedToken.expTime=date;

        return decodedToken;

    }

}