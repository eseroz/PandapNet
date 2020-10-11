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

    isTokenExpired()
    {
        let decodeToken=this.getDecodedToken();

        var now=new Date();
        var now_seconds=now.getTime()/1000;
    
        let isExpired=now_seconds>decodeToken.exp;
        return isExpired;
    }

}