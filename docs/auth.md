[< All routes](README.md)
# Auth routes /auth

## POST /login

### Request body

```ts
{
  email: string,
  password: string
}
```

### OK response

```ts
{
  accessToken: string,
  refreshToken: string,
}
```

### Errors

- 401 if invalid credentials
- 500 if comparing passwords failed

## POST /logout

### Request body

```ts
{
  refreshToken: string
}
```

### Errors

- 400 if token failed to remove (likely doesn't exist)

## POST /token

### Request body

```ts
{
  refreshToken: string
}
```

### OK response

```ts
{
  accessToken: string
}
```

### Errors

- 403
  - Refresh token expired
  - Refresh token invalid/not found
- 500
  - Failed to retrieve user from existing refresh token
  - User service failed to retrieve user
