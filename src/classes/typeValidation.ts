//this class validates the MAIN input types
export class Validation
{
    constructor(){}

    // ID
    isID(id: number): boolean
    {
        if( id && typeof id === 'number')
        {
            return true;
        }
        else
        {
            console.log("Id not valid");
            return false;
        }
    }

    //NUMBER
    isPhoneNumber(pNum: string): boolean
    {
        if(typeof pNum === 'string' && pNum.length > 10)
        {
            return true;
        }
        else
        {
            console.log("Number not valid!");
            return false;
        }
    }

    // NAME
    isName(name: string): boolean
    {
        if(name != '' && typeof name === 'string')
        {
            return true;
        }
        else
        {
            console.log("Name not valid");
            return false;
        }
    }

    // DATE
    isDate(date: Date): boolean
    { 
        //&& date.toDateString() > '01/01/1900'
        if(date)
        {
           return true; 
        }
        else
        {
            console.log("Date not valid");
            return false;
        }
    }

    // EMAIL
    isEmail(mail: string): boolean
    {
        const regexp: RegExp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
        return regexp.test(mail);
    }

    // PASSWORD
    isPassword(pass: string): boolean
    {
        const isWhiteSpace: RegExp = new RegExp(/^(?=.*\s)/);
        if(isWhiteSpace.test(pass))
        {
            console.log("Password contains white spaces!");
            return false;
        }

        const containsUppercase: RegExp = new RegExp(/^(?=.*[A-Z])/);
        if (!containsUppercase.test(pass)) 
        {
            console.log("Password does not contain an upper case letter!");
            return false;
        }

        const containsLowercase: RegExp = new RegExp(/^(?=.*[a-z])/);
        if (!containsLowercase.test(pass)) 
        {
            console.log("Password does not contain lower case letter!");
            return false;
        }
    
    
        const containsNumber: RegExp = new RegExp(/^(?=.*[0-9])/);
        if (!containsNumber.test(pass)) 
        {
            console.log("Password does not contain number!");
            return false;
        }
    
    
        // const containsSymbol: RegExp = new RegExp(/^(?=.*[~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?/_₹])/);
        // if (!containsSymbol.test(pass)) 
        // {
        //     console.log("");
        //   return false;
        // }
    
    
        const isValidLength: RegExp = new RegExp(/^.{8,16}$/);
        if (!isValidLength.test(pass)) 
        {
            console.log("Length is not valid!");
          return false;
        }

        return true;
    }
    // FLOAT ?
}