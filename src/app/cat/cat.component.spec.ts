import {async, ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';

import {CatComponent} from './cat.component';
import {UserService} from '../user/user.service';
import {DataService} from '../shared/data.service';
import {of} from 'rxjs';

describe('CatComponent', () => {
  let component: CatComponent;
  let fixture: ComponentFixture<CatComponent>;
  let userService: UserService;
  let dataService: DataService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CatComponent],
      providers: [UserService, DataService]
    })
    // In case if you fetch something from server and it is async, in this example it will work without .compileComponents()
      .compileComponents();
    fixture = TestBed.createComponent(CatComponent);
    component = fixture.debugElement.componentInstance;
    userService = fixture.debugElement.injector.get(UserService);
    dataService = fixture.debugElement.injector.get(DataService);

  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('userService.user.name === cat.name', () => {
    fixture.detectChanges();
    expect(userService.user.name).toEqual(component.cat.name);
  });

  it('should render name if logged', () => {
    const nativeElement = fixture.debugElement.nativeElement;
    component.isLoggedIn = true;
    fixture.detectChanges();

    // querySelector has to be after detectChanges()
    const p = nativeElement.querySelector('p');
    expect(p.textContent).toContain(component.cat.name);
  });

  it('should render other text if not logged', () => {
    const nativeElement = fixture.debugElement.nativeElement;
    fixture.detectChanges();

    // querySelector has to be after detectChanges()
    const p = nativeElement.querySelector('p');
    expect(p.textContent).not.toContain(component.cat.name);
  });

  it('[async wrapped method] async data from DataService', async(() => {

    // Overwriting dataService promise
    const spy = spyOn(dataService, 'getDetails')
      .and
      .returnValue(
        Promise.resolve('Data')
      );
    fixture.detectChanges();

    // whenStable() only for async wrapper
    fixture
      .whenStable()
      .then(() => {
        expect(component.data).toBe('Data');
      });
  }));

  it('[fakeAsync wrapped method] async data from DataService', fakeAsync(() => {
    const spy = spyOn(dataService, 'getDetails')
      .and.returnValue(Promise.resolve('Data'));
    fixture.detectChanges();

    // tick with no params end async method inside fakeAsync()
    tick();
    expect(component.data).toBe('Data');
  }));

  it('should return a single user', fakeAsync(() => {
    const userResponse = {
      id: '2',
      name: 'Bob',
      role: 'Developer',
      pokemon: 'Charizard'
    };
    spyOn(dataService, 'findOne').and.returnValue(of(userResponse));
    let response;

    dataService.findOne('2').subscribe(res => {
      response = res;
    });

    tick();
    console.log(response);
    expect(response).toEqual(userResponse);
  }));

});
