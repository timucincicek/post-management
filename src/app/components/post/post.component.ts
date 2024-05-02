import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { arrayOfPostProperties } from 'src/app/constants/post-properties';
import { ExtendedPost } from 'src/app/models/extended-post';
import { StoreDTO } from 'src/app/models/store';
import { onPostClick } from 'src/app/store/actions';

@Component({
  standalone: true,
  selector: 'app-post',
  template: `<a (click)="postClick()">{{post[arrayOfPostProperties[post.activeState]]}}</a>`,
  styleUrls: ['./post.component.scss']
})

export class PostComponent {

  @Input() post: ExtendedPost;
  readonly arrayOfPostProperties = arrayOfPostProperties;
  constructor(private readonly store: Store<StoreDTO>) { }

  postClick() {
    this.store.dispatch(onPostClick({ value: this.post }));
  }

}
