import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpavlovskyiUiCommonComponent } from './opavlovskyi-ui-common.component';

describe('OpavlovskyiUiCommonComponent', () => {
  let component: OpavlovskyiUiCommonComponent;
  let fixture: ComponentFixture<OpavlovskyiUiCommonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OpavlovskyiUiCommonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(OpavlovskyiUiCommonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
