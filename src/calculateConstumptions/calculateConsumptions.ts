function calcConstumtionMeter(): number{
    const limit = 10000000;

    var values = getValues();
    console.log(values);

    var prevValue = 9999999;
    var currentValue = 1;

    var actualConstumption = 0;

    if(currentValue < prevValue){
        var beforeTurnOver = limit - prevValue; 
        actualConstumption = currentValue + beforeTurnOver;


        console.log(actualConstumption);
        return actualConstumption;
    }
    
    actualConstumption = prevValue - currentValue; 

    console.log(actualConstumption);

    return actualConstumption

}

function getValues(){

}

    
calcConstumtionMeter();

