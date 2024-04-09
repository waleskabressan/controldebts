import { TestBed } from '@angular/core/testing';

import { PainelFinancasService } from './painel-financas.service';

describe('PainelFinancasService', () => {
  let service: PainelFinancasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PainelFinancasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
