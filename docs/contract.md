[< All routes](README.md)

# Customers routes /customers

## GET /

### OK response

```ts
{
    [
        id: number,
        user_id: number,
        start_date: Date,
        end_date: Date,
        tariff_id: number,
        estimation_id: number,
        address: {
            id: number,
            street: string,
            city_id: number,
            country: string, // Only Belgium
        },
    ]
}
```

## GET /self

### OK response

```ts
{
    [
        id: number,
        user_id: number,
        start_date: Date,
        end_date: Date,
        tariff_id: number,
        estimation_id: number,
        address: {
            id: number,
            street: string,
            city_id: number,
            country: string, // Only Belgium
        },
    ]
}
```

## GET /contract_id

### OK response

```ts
{
    id: number,
    user_id: number,
    start_date: Date,
    end_date: Date,
    tariff_id: number,
    estimation_id: number,
    address: {
        id: number,
        street: string,
        city_id: number,
        country: string, // Only Belgium
    },
}
```
