import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { onPostClick } from 'src/app/store/actions';
import { post } from 'src/app/unit-test/post';
import { PostComponent } from './post.component';

describe('PostComponent', () => {
  let component: PostComponent;
  let fixture: ComponentFixture<PostComponent>;
  let store: Store;
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      providers: [provideMockStore()]
    }).compileComponents().then(() => {
      store = TestBed.inject(Store);
      fixture = TestBed.createComponent(PostComponent);
      component = fixture.componentInstance;
      component.post = post;
    });
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch onPostClick action when post is clicked', () => {
    spyOn(store, 'dispatch');
    const compiled: HTMLElement = fixture.nativeElement;
    const postLinkElement = compiled.querySelector('a');
    postLinkElement.click();
    expect(store.dispatch).toHaveBeenCalledWith(onPostClick({ value: component.post }));
  });

});
