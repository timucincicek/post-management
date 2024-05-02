import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { LoadingSpinnerComponent } from './loading-spinner.component';

describe('LoadingSpinnerComponent', () => {
  let component: LoadingSpinnerComponent;
  let fixture: ComponentFixture<LoadingSpinnerComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({}).compileComponents().then(() => {
      fixture = TestBed.createComponent(LoadingSpinnerComponent);
      component = fixture.componentInstance;
    });
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('HTML Template', () => {
    let loadingSpinnerElement: HTMLElement;
    let spinnerDiv: Element;
    beforeEach(() => {
      loadingSpinnerElement = fixture.nativeElement;
      spinnerDiv = loadingSpinnerElement.querySelector('.lds-ring');
    })
    it('should find the div element with lds-ring class', () => {
      expect(spinnerDiv).toBeTruthy();
    });
    it('should render the loading spinner with the children divs', () => {
      const spinnerDivChildren = spinnerDiv.querySelectorAll('div');
      expect(spinnerDivChildren.length).toBe(4);
      spinnerDivChildren.forEach(child => {
        expect(child.tagName.toLowerCase()).toBe('div');
      });
    });
  })

});
