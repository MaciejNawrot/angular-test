import {Observable, of} from 'rxjs';

export class DataService {
  users: Array<Person> = [  // Add employee object
    {
      id: '1',
      name: 'Jane',
      role: 'Designer',
      pokemon: 'Blastoise'
    },
    {
      id: '2',
      name: 'Bob',
      role: 'Developer',
      pokemon: 'Charizard'
    },
    {
      id: '3',
      name: 'Jim',
      role: 'Developer',
      pokemon: 'Venusaur'
    },
    {
      id: '4',
      name: 'Adam',
      role: 'Designer',
      pokemon: 'Yoshi'
    }
  ];

  getDetails() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve('Data');
      }, 1500);
    });
  }

  getObs(): Observable<Person[]> {
    return of(this.users);
  }

  findOne(id: string): Observable<Person> {
    const user = this.users.find((u: any) => {
      return u.id === id;
    });
    return of(user);
  }
}

export interface Person {
  id: string;
  name: string;
  role: string;
  pokemon: string;
}
