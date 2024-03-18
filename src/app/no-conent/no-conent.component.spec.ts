import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoConentComponent } from './no-conent.component';

describe('NoConentComponent', () => {
  let component: NoConentComponent;
  let fixture: ComponentFixture<NoConentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NoConentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NoConentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
