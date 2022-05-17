import {Consumtion} from "./classes/consumption"
import * as consumptionService from "./services/consumption-service";
import fetch from "node-fetch";
// every month this should run

//query to get all meters

//for all meters that are smart meters:
    // 

const response = fetch("http://10.97.0.100:3000/meter/1/update", {
    method: "PATCH",
    headers: {
      'content-type': 'application/json;charset=UTF-8',
    },
})
.then(
    (response) => {
        // response.consumption ofzo -> querie voor nieuwe consumption toe te voegen uit voeren en klaar
        console.log(response);
    }
)
.catch(
    (error) => console.log('error', error)
)