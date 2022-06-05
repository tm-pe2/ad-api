[< All routes](README.md)

# Customers routes /customers

## GET /

### OK response

```ts
{
    [
        id: number,
        first_name: string,
        last_name: string,
        birth_date: Date,
        email: string,
        phone_number: string,
        national_registry_number: string,
        role_ids: UserRole[],
        addresses: [
            {
                id: number,
                street: string,
                city_id: number,
                country: string, // Only Belgium
            }
        ],
    ]
}
```

## GET /id

### OK response

```ts
{
    id: number,
    first_name: string,
    last_name: string,
    birth_date: Date,
    email: string,
    phone_number: string,
    national_registry_number: string,
    role_ids: UserRole[],
    addresses: [
        {
            id: number,
            street: string,
            city_id: number,
            country: string, // Only Belgium
        }
    ],
}
```

## POST /

### Request body

```ts
{
    first_name: string,
    last_name: string,
    birth_date: Date,
    email: string,
    phone_number: string,
    national_registry_number: string,
    addresses: [
        {
            street: string,
            city_id: number,
            country: string, // Only belgium
        }
    ],
    type_id: CustomerType,
    password: string,
}
```

### Errors

- 400 bad request, bad request data
- 500 query failed
