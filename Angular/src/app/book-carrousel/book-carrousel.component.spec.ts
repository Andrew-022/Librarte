import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookCarrouselComponent } from './book-carrousel.component';

describe('BookCarrouselComponent', () => {
  let component: BookCarrouselComponent;
  let fixture: ComponentFixture<BookCarrouselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookCarrouselComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BookCarrouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
