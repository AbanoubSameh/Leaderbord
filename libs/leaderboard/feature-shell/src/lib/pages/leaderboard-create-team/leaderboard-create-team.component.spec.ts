import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import {  ReactiveFormsModule } from '@angular/forms';
import {
  NgbActiveModal,
  NgbModule,
} from '@ng-bootstrap/ng-bootstrap';
import { StoreModule } from '@ngrx/store';
import { TeamsStateService } from '@shared/data-access';
import { TeamDTO } from '@shared/models';
import { of } from 'rxjs';

import { LeaderboardCreateTeamComponent } from './leaderboard-create-team.component';

describe('LeaderboardCreateTeamComponent', () => {
  let component: LeaderboardCreateTeamComponent;
  let fixture: ComponentFixture<LeaderboardCreateTeamComponent>;
  let teamsStateService: TeamsStateService;
  const mockTeam: TeamDTO = {
    id: '9dd1b5b2-4889-5b34-9765-dd2eb1600d1c',
    name: 'sunt vero sit',
  };
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LeaderboardCreateTeamComponent],
      imports: [ReactiveFormsModule, StoreModule.forRoot({}), NgbModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [NgbActiveModal],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LeaderboardCreateTeamComponent);
    component = fixture.componentInstance;
    teamsStateService = fixture.debugElement.injector.get(TeamsStateService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('component init', () => {
    it('should initiate team form', () => {
      component.ngOnInit();
      expect(component.createTeamForm).toBeTruthy();
    });
  });

  describe('create team', () => {
    beforeEach(() => {
      component.ngOnInit();
    });
    it('should not dispatch create team action if the form is not valid', () => {
      const addItemSpy = spyOn(teamsStateService, 'dispatchAddItem');
      component.createTeam();
      expect(addItemSpy).not.toBeCalled();
    });
    it('should dispatch create team action if form is valid', () => {
      component.createTeamForm.patchValue({name:'newTeam'});
      const addItemSpy = spyOn(teamsStateService, 'dispatchAddItem');
      component.createTeam();
      expect(addItemSpy).toBeCalled();
    });
    it('should close modal after item created', () => {
      component.createTeamForm.patchValue({name:'newTeam'});
      const addItemSpy = spyOn(teamsStateService, 'selectIsSuccess').and.returnValue(of(true));
      const ngbActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
      const closeModalSpy = spyOn(ngbActiveModal, 'close').and.returnValue(of(true));
      component.createTeam();
      expect(closeModalSpy).toBeCalled();
    });
   
  });
});
