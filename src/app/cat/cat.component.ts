import { Component, OnInit } from '@angular/core';
import {UserService} from '../user/user.service';
import {DataService, Person} from '../shared/data.service';

@Component({
  selector: 'app-cat',
  templateUrl: './cat.component.html',
  styleUrls: ['./cat.component.css']
})
export class CatComponent implements OnInit {
  cat: { name: string };
  ppl: Person[];
  isLoggedIn = false;
  data: string;

  constructor(private userService: UserService, private dataService: DataService) { }

  ngOnInit() {
    this.cat = {
      name: this.userService.user.name
    };
    this.dataService.getDetails().then((data: string) => this.data = data);
    this.dataService.getObs()
      .subscribe((resp: Person[]) => {
        this.ppl = resp;
      });
  }

}
