// TODO: verify interfaces and types

export interface EstimationRegistration {
    address_id: number,
    family_size: number,
    building_type: BuildingType,
    past_consumption: number,
    service_type: ServiceType,
    meters: [
        {
            meter_type: MeterType
            //...
        }
    ]
    equipment: EquipmentType[]
}

enum ServiceType {
    // shrug
}

enum EquipmentType {
    WASHINGMACHINE,
    //...
}

enum BuildingType {
    APPARTMENT,
    HOUSE,
    //...
}

enum MeterType {
    GAS,
    ELECTRICITY,
    // ...
}
