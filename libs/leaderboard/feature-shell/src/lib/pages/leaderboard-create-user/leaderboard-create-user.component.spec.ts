import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { StoreModule } from '@ngrx/store';
import { UsersStateService } from '@shared/data-access';
import { TeamDTO } from '@shared/models';
import { of } from 'rxjs';

import { LeaderboardCreateUserComponent } from './leaderboard-create-user.component';

describe('LeaderboardCreateUserComponent', () => {
  let component: LeaderboardCreateUserComponent;
  let fixture: ComponentFixture<LeaderboardCreateUserComponent>;
  let usersStateService: UsersStateService;
  const mockTeam: TeamDTO = {
    id: '9dd1b5b2-4889-5b34-9765-dd2eb1600d1c',
    name: 'sunt vero sit',
  };
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LeaderboardCreateUserComponent],
      imports: [ReactiveFormsModule, StoreModule.forRoot({}), NgbModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [NgbActiveModal],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LeaderboardCreateUserComponent);
    component = fixture.componentInstance;
    usersStateService = fixture.debugElement.injector.get(UsersStateService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('component init', () => {
    beforeEach(() => {
      component.teamId = mockTeam.id;
      component.ngOnInit();
    });
    it('should initiate user form', () => {
      component.ngOnInit();
      expect(component.createUserForm).toBeTruthy();
    });
    it('should set team id', () => {
      component.ngOnInit();
      expect(component.createUserForm.value.teamId).toEqual(mockTeam.id);
    });
  });

  describe('create user', () => {
    beforeEach(() => {
      component.teamId = mockTeam.id;
      component.ngOnInit();
    });
    it('should not dispatch create user action if the form is not valid', () => {
      const addItemSpy = spyOn(usersStateService, 'dispatchAddItem');
      component.createUser();
      expect(addItemSpy).not.toBeCalled();
    });
    it('should dispatch create user action if form is valid', () => {
      component.createUserForm.patchValue({ name: 'newUser' });
      const addItemSpy = spyOn(usersStateService, 'dispatchAddItem');
      component.createUser();
      expect(addItemSpy).toBeCalled();
    });
    it('should close modal after item created', () => {
      component.createUserForm.patchValue({ name: 'newUser' });
      const addItemSpy = spyOn(
        usersStateService,
        'selectIsSuccess'
      ).and.returnValue(of(true));
      const ngbActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
      const closeModalSpy = spyOn(ngbActiveModal, 'close').and.returnValue(
        of(true)
      );
      component.createUser();
      expect(closeModalSpy).toBeCalled();
    });
  });
});
