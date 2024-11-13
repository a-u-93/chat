import { Injectable } from "@nestjs/common"

export class User {
  userId: number
  username: string
  password: string
}

@Injectable()
export class UsersService {
  private readonly users = [
    {
      userId: 1,
      username: 'Chopik',
      password: 'Chopik',
    },
    {
      userId: 2,
      username: 'Buddy',
      password: 'Buddy',
    },
  ]

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find(user => user.username === username)
  }
}
