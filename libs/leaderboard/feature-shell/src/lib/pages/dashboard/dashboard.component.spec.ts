import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { StoreModule } from '@ngrx/store';
import { TeamsStateService } from '@shared/data-access';

import { DashboardComponent } from './dashboard.component';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let teamsStateService: TeamsStateService;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DashboardComponent],
      imports: [StoreModule.forRoot({})],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('component init', () => {
    beforeEach(() => {
      teamsStateService = fixture.debugElement.injector.get(TeamsStateService);
    });
    it('should select all teams', () => {
      const teamsStateServiceSpy = spyOn(teamsStateService, 'selectItems');
      component.ngOnInit();
      expect(teamsStateServiceSpy).toBeCalled();
    });
  });

  describe('create team', () => {
    beforeEach(() => {
      teamsStateService = fixture.debugElement.injector.get(TeamsStateService);
    });
    it('ui should include create team button', () => {
      const compiled = fixture.debugElement.nativeElement;
      expect(compiled.innerHTML).toContain('Add Team');
    });
    it('should trigger create team modal', () => {
      const modalService = fixture.debugElement.injector.get(NgbModal);
      const modalServiceSpy = spyOn(modalService, 'open');
      component.createTeam();
      expect(modalServiceSpy).toBeCalled();
    });
  });
});
