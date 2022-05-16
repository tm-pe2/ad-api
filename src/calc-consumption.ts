// every month this should run

//query to get all meters

//for all meters that are smart meters:
    // 

fetch("http://10.97.0.100:3000/meter/${meter_id}/update", {
    method: "PATCH",
    headers: {
      'content-type': 'application/json;charset=UTF-8',
    },
})
.then(
    (response) => {
        // response.consumption ofzo -> querie voor nieuwe consumption toe te voegen uit voeren en klaar
    }
)