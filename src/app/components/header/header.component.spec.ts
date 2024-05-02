import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { HeaderComponent } from './header.component';
import { StoreDTO } from 'src/app/models/store';
import { post } from 'src/app/unit-test/post';
import { DebugElement } from '@angular/core';
import { of } from 'rxjs';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let debugElement: DebugElement;
  let element: HTMLElement;
  let fixture: ComponentFixture<HeaderComponent>;
  let store: Store<StoreDTO>;
  const initialState = { activePost: post };

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      providers: [
        provideMockStore({ initialState }),
      ]
    }).compileComponents().then(() => {
      store = TestBed.inject(MockStore);
      fixture = TestBed.createComponent(HeaderComponent);
      component = fixture.componentInstance;
      debugElement = fixture.debugElement;
      element = debugElement.nativeElement;
      fixture.detectChanges();
    });
  }));

  describe('HTML Template', () => {
    it('should display "Post Management" as the navbar brand', () => {
      const brandElement = element.querySelector('.navbar-brand');
      expect(brandElement.textContent.trim()).toEqual('Post Management');
    });

    it('should display active post id if last post exists', () => {
      const brandElements = element.querySelectorAll('.navbar-brand');
      const activePostElement = brandElements[1];
      const textContent = activePostElement.textContent.trim();
      const postId = textContent.split(':')[1].trim();
      expect(postId).toEqual('1');
    });

    it('should not display active post id if last post does not exist', () => {
      component.getActivePost$ = of(null);
      fixture.detectChanges();
      const brandElements = element.querySelectorAll('.navbar-brand');
      const activePostElement = brandElements[1];
      expect(activePostElement).toBeFalsy();
    });
  });

  describe('TS File', () => {
    it('should get active post from store', () => {
      component.getActivePost$.subscribe((result) => {
        expect(result).toBe(post);
      })
    });
  });

});
