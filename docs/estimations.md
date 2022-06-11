[< All routes](README.md)

# Estimations routes /estimations

## GET /

### OK response

```ts
{
    [
        id: number,
        past_consumption: number,
        estimated_consumption: number,
        address: {
            id: number,
            street: string,
            city_id: number,
            country: string, // Only Belgium
        }
    ]
}
```

## POST /

### Request body

```ts
{
    past_consumption: number;
    address_id: number;
    family_size: number,
    building_type: BuildingType,
    service_type: ServiceType,
    meters: Meter[],
    equipment: EquipmentType[],
}
```
