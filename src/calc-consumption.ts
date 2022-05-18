import {Consumtion} from "./classes/consumption"
import * as consumptionService from "./services/consumption-service";

// every month this should run

//query to get all meters

//for all meters that are smart meters:
    // 

function tryMeterUpdate() {
    const response = fetch("http://10.97.0.100:3000/meter/1/update", {
        method: "PATCH",
        headers: {
            'content-type': 'application/json;charset=UTF-8',
        },
    })
    .then(
        (response) => {
        // response.consumption ofzo -> querie voor nieuwe consumption toe te voegen uit voeren en klaar
            return response;
        }
    )
    .catch(
        (error) => console.log('error', error)
    )

    console.log(response);
}

export default tryMeterUpdate;
