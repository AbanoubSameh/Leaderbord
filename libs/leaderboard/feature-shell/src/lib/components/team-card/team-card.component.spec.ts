import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamCardComponent } from './team-card.component';
import { RouterTestingModule } from '@angular/router/testing';
import { StoreModule } from '@ngrx/store';
import { TeamDTO, UserDTO } from '@shared/models';
import { CounterDTO, CountersStateService } from '@leaderboard/data-access';
import { UsersStateService } from '@shared/data-access';
import { of } from 'rxjs';
describe('TeamCardComponent', () => {
  let component: TeamCardComponent;
  let fixture: ComponentFixture<TeamCardComponent>;
  let usersStateService: UsersStateService;
  let countersStateService;
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
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TeamCardComponent],
      imports: [RouterTestingModule, StoreModule.forRoot({})],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('component init', () => {
    beforeEach(() => {
      component.team = mockTeam;
      usersStateService = fixture.debugElement.injector.get(UsersStateService);
      countersStateService = fixture.debugElement.injector.get(
        CountersStateService
      );
    });
    it('should fetch team users', () => {
      const usersStateServiceSpy = spyOn(
        usersStateService,
        'selectItemsByteamId'
      ).and.returnValue(of(mockTeamUsers));
      component.ngOnInit();

      expect(usersStateServiceSpy).toBeCalledWith(mockTeam.id);
    });
    it('should fetch team total counters', () => {
      spyOn(usersStateService, 'selectItemsByteamId').and.returnValue(
        of(mockTeamUsers)
      );
      const countersStateServiceSpy = spyOn(
        countersStateService,
        'selectUsersTotalCounter'
      );
      component.ngOnInit();
      component.teamTotalCounter$.subscribe()
      expect(countersStateServiceSpy).toBeCalledWith(
        mockTeamUsers.map((x) => x.id)
      );
    });
  });
});
