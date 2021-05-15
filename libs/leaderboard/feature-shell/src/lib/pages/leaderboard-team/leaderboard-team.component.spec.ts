import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { CounterDTO, CountersStateService } from '@leaderboard/data-access';
import {
  NgbModule,
  NgbActiveModal,
  NgbModal,
} from '@ng-bootstrap/ng-bootstrap';
import { StoreModule } from '@ngrx/store';
import { UsersStateService } from '@shared/data-access';
import { TeamDTO, UserDTO } from '@shared/models';
import { of } from 'rxjs';

import { LeaderboardTeamComponent } from './leaderboard-team.component';

describe('LeaderboardTeamComponent', () => {
  let component: LeaderboardTeamComponent;
  let fixture: ComponentFixture<LeaderboardTeamComponent>;
  let usersStateService: UsersStateService;
  let countersStateService: CountersStateService;
  let activatedRoute: ActivatedRoute;
  const mockTeam: TeamDTO = {
    id: '9dd1b5b2-4889-5b34-9765-dd2eb1600d1c',
    name: 'sunt vero sit',
  };
  const mockTeamUsers: UserDTO[] = [
    {
      id: '4cb914ac-fa74-5eb8-826d-8df2f5062ad5',
      name: 'Kianna',
      teamId: '9dd1b5b2-4889-5b34-9765-dd2eb1600d1c',
    },
    {
      id: 'bdd345e1-7ede-5a7a-86cd-0d3ef9b8ad30',
      name: 'Emory',
      teamId: '9dd1b5b2-4889-5b34-9765-dd2eb1600d1c',
    },
  ];
  const mockTeamUserCounters: CounterDTO[] = [
    {
      id: '4cb914ac-fa74-5eb8-826d-8df2f5062ad5',
      userId: '4cb914ac-fa74-5eb8-826d-8df2f5062ad5',
      value: 10,
    },
    {
      id: 'bdd345e1-7ede-5a7a-86cd-0d3ef9b8ad30',
      userId: 'bdd345e1-7ede-5a7a-86cd-0d3ef9b8ad30',
      value: 10,
    },
  ];
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LeaderboardTeamComponent],
      imports: [StoreModule.forRoot({}), NgbModule, RouterTestingModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [NgbActiveModal],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LeaderboardTeamComponent);
    component = fixture.componentInstance;
    usersStateService = fixture.debugElement.injector.get(UsersStateService);
    countersStateService = fixture.debugElement.injector.get(
      CountersStateService
    );
    activatedRoute = fixture.debugElement.injector.get(ActivatedRoute);
    spyOn(activatedRoute, 'params').and.returnValue(of({ id: mockTeam.id }));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  describe('component init', () => {
    beforeEach(() => {
      spyOn(usersStateService, 'selectItems').and.returnValue(
        of(mockTeamUsers)
      );
      component.ngOnInit();
    });

    it('should select team users', () => {
      component.teamUsers$.subscribe((users) =>
        expect(users).toEqual(mockTeamUsers)
      );
    });
    it('should select users counters', () => {
      component.teamUsers$ = of(mockTeamUsers);
      let selectUsersCounterSpy = spyOn(
        countersStateService,
        'selectUsersCounter'
      );
      component.counters$.subscribe((x) =>
        expect(selectUsersCounterSpy).toBeCalledWith(
          mockTeamUsers.map((u) => u.id)
        )
      );
    });
  });

  describe('getUserCounter', () => {
    it('should return user counter', () => {
      let userCounter = component.getUserCounter(
        mockTeamUserCounters,
        '4cb914ac-fa74-5eb8-826d-8df2f5062ad5'
      );
      expect(userCounter).toEqual(mockTeamUserCounters[0]);
    });
  });

  describe('incrementCounter', () => {
    it('should dispatch increment user counter action', () => {
      let dispatchUserCounterSpy = spyOn(
        countersStateService,
        'dispatchIncrementItemValue'
      );
      component.incrementCounter(mockTeamUserCounters[0].id);
      expect(dispatchUserCounterSpy).toBeCalledWith(mockTeamUserCounters[0].id);
    });
  });

  describe('createUser', () => {
    it('ui should include Add User button', () => {
      const compiled = fixture.debugElement.nativeElement;
      expect(compiled.innerHTML).toContain('Add User');
    });
    it('should trigger create user modal', () => {
      const modalService = fixture.debugElement.injector.get(NgbModal);
      const modalServiceSpy = spyOn(modalService, 'open').and.returnValue(
        Object.assign({ componentInstance: {} })
      );
      component.createUser();
      expect(modalServiceSpy).toBeCalled();
    });
    it('should trigger send teamId to create user modal', () => {
      const modalService = fixture.debugElement.injector.get(NgbModal);
      component['teamId'] = mockTeam.id;
      let componentInstance = {};
      spyOn(modalService, 'open').and.returnValue(
        Object.assign({ componentInstance })
      );
      component.createUser();
      expect(componentInstance['teamId']).toEqual(mockTeam.id);
    });
  });
});
