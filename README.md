# Vanilla Chat

## Get JWT Token

```sh
$ curl -L chat.ushakov.by/auth/profile
{"statusCode":401,"message":"Unauthorized"}

$ curl -L -X POST chat.ushakov.by/auth/login -d '{"username": "Chopik", "password": "Chopik"}' -H "Content-Type: application/json"
{"access_token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vybm..."}

# token=$(curl -X POST 127.0.0.1:3000/auth/login -d '{"username": "Chopik", "password": "Chopik"}' -H "Content-Type: application/json" -s | jq .access_token)

$ curl -L chat.ushakov.by/auth/profile -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vybm..."
{"sub":1,"username":"john","iat":...,"exp":...}
```
## CI

![alt text](https://github.com/a-u-93/chat/blob/master/ci_design.png?raw=true)
