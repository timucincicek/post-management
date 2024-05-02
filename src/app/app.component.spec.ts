import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let store: Store;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: Store, useValue: {
            select: () => { of(false) },
            dispatch: () => { }
          }
        }
      ]
    }).compileComponents().then(() => {
      store = TestBed.inject(Store);
      fixture = TestBed.createComponent(AppComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
  }));

  it('should create the app', () => {
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render header, post list, and loading spinner if loading is true', () => {
    component.loading$ = of(true);
    fixture.detectChanges();
    const headerElement = fixture.debugElement.query(By.css('app-header'));
    const postListElement = fixture.debugElement.query(By.css('app-post-list'));
    const loadingSpinnerElement = fixture.debugElement.query(By.css('app-loading-spinner'));
    expect(headerElement).toBeTruthy();
    expect(postListElement).toBeTruthy();
    expect(loadingSpinnerElement).toBeTruthy();
  });

  it('should render header and post list only if loading is false', () => {
    component.loading$ = of(false);
    fixture.detectChanges();
    const headerElement = fixture.debugElement.query(By.css('app-header'));
    const postListElement = fixture.debugElement.query(By.css('app-post-list'));
    const loadingSpinnerElement = fixture.debugElement.query(By.css('app-loading-spinner'));
    expect(headerElement).toBeTruthy();
    expect(postListElement).toBeTruthy();
    expect(loadingSpinnerElement).toBeFalsy();
  });

});
