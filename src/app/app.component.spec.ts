import { TestBed, async } from '@angular/core/testing';
import { WycieczkiComponent } from './wycieczki.component';

describe('WycieczkiComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        WycieczkiComponent
      ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(WycieczkiComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'wycieczki'`, () => {
    const fixture = TestBed.createComponent(WycieczkiComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('wycieczki');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(WycieczkiComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('.content span').textContent).toContain('wycieczki app is running!');
  });
});
