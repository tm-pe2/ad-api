// TODO: verify interfaces and types

import { Address } from "cluster";

export interface Estimation {
    id: number;
    past_consumption: number;
    estimated_consumption: number;
    address: Address
}

export interface EstimationRegistration {
    past_consumption: number;
    address_id: number;
    family_size: number,
    building_type: BuildingType,
    service_type: ServiceType,
    meters: Meter[],
    equipment: EquipmentType[],
}

interface Meter {
    id?: number,
    physical_id?: number,
    meter_type: MeterType, // TODO: Specify type
    value: number,
}

export enum MeterType {
    MANUAL = "Manual",
    SMART = "Smart",
}

export enum BuildingType {
    APARTMENT = 0,
    CLOSED = 1,
    SEMI_DETACHED = 2,
    OPEN = 3,
}

export enum ServiceType {
    ELECTRICITY = 1,
    GAS = 2,
}

export enum EquipmentType {
    OVEN_STOVE = 1,
    DISHWATER = 2,
    WASHING_MACHINE = 3,
    DRYING_MACHINE = 4,
    HAIR_DRYER = 5,
}
