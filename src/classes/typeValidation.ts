import { Connection } from 'mysql';

// ID
function isID(id: number): boolean
{
    if( typeof id === 'number' && !isNaN(id))
    {
        return true;
    }
    else
    {
        console.log("Id not valid");
        return false;
    }
}

// Price | Amount | Number value
function isNumber(num: number)
{
    if( typeof num === 'number' && !isNaN(num))
    {
        return true;
    }
    else
    {
        console.log("Id not valid");
        return false;
    }
}

function isString(input: string): boolean
{
    if(input != '' && typeof input === 'string')
    {
        return true;
    }
    else
    {
        return false;
    }
}

//PHONE-NUMBER -> VARCHAR
function isPhoneNumber(pNum: string): boolean
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
function isName(name: string): boolean
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
function isDate(date: Date): boolean
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
function isEmail(mail: string): boolean
{
    const regexp: RegExp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    return regexp.test(mail);
}

// PASSWORD
function isPassword(pass: string): boolean
{
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

    const isValidLength: RegExp = new RegExp(/^.{8,50}$/);
    if (!isValidLength.test(pass)) 
    {
        console.log("Length is not valid!");
      return false;
    }

    return true;
}

function query<T>(conn: Connection, query: string, params?: unknown): Promise<T> {
    return (new Promise((resolve, reject) => {
        conn.query(query, params ,(err: unknown, data: T) => {
            if (err) reject(err);
            else resolve(data);
        });
    }));
}

export { isID, isNumber, isDate, isName, isString, isPhoneNumber, isEmail, isPassword, query}