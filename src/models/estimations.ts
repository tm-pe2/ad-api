// TODO: verify interfaces and types

export interface EstimationRegistration {
    family_size: number,
    address_id: number,
    building_type: BuildingType,
    past_consumption: number,
    service_type: ServiceType,
    meters: Meter[],
    equipment: EquipmentType[],
}

interface Meter {
    id?: number,
    physical_id?: number,
    meter_type: string, // TODO: Specify type
    value: number,
}

enum BuildingType {
    APARTMENT = 0,
    CLOSED = 1,
    SEMI_DETACHED = 2,
    OPEN = 3,
}

enum ServiceType {
    ELECTRICITY = 0,
    GAS = 1,
}

enum EquipmentType {
    OVEN_STOVE = 1,
    DISHWATER = 2,
    WASHING_MACHINE = 3,
    DRYING_MACHINE = 4,
    HAIR_DRYER = 5,
}
