# Vanilla Chat

## Get JWT Token

```sh
$ curl chat.ushakov.by/auth/profile
{"statusCode":401,"message":"Unauthorized"}

$ curl -X POST chat.ushakov.by/auth/login -d '{"username": "Chopik", "password": "Chopik"}' -H "Content-Type: application/json"
{"access_token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vybm..."}

# token=$(curl -X POST 127.0.0.1:3000/auth/login -d '{"username": "Chopik", "password": "Chopik"}' -H "Content-Type: application/json" -s | jq .access_token)

$ curl chat.ushakov.by/auth/profile -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vybm..."
{"sub":1,"username":"john","iat":...,"exp":...}
```