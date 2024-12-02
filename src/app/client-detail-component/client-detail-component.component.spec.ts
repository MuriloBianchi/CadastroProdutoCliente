import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientDetailComponentComponent } from './client-detail-component.component';

describe('ClientDetailComponentComponent', () => {
  let component: ClientDetailComponentComponent;
  let fixture: ComponentFixture<ClientDetailComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientDetailComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientDetailComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
