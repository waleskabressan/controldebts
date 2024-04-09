import { ComponentFixture, TestBed } from '@angular/core/testing';import { PainelFinancasComponent } from './painel-financas.component';
;

describe('PainelFinancasComponent', () => {
  let component: PainelFinancasComponent;
  let fixture: ComponentFixture<PainelFinancasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PainelFinancasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PainelFinancasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
