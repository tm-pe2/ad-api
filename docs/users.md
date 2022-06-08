[< All routes](README.md)

# Users routes /users

## GET /self

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
  addresses: [
    {
      id: number,
      street: string,
      house_number: string,
      city_name: string,
      postal_code: number,
      country: string
    }
  ],
  roles: RoleType[]
}
```
