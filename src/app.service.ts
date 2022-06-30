import { Injectable } from '@nestjs/common';


const DB = {
  User: [
    {
      id: 1,
      name: 'deaf mund',
      age: 24
    },
    {
      id: 3,
      name: 'zafar khan',
      age: 30
    },
    {
      id: 2,
      name: 'supe amn',
      age: 65
    },
    {
      id: 4,
      name: 'clark trench',
      age: 42
    }
  ]
}

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  getSingleUser(id: number): object | string {
    const user = DB.User.find(u => u.id === id)
    if (!user) return 'User not found with ID'
    return user;
  }
}
