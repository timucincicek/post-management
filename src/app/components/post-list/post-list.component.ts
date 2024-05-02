import { AsyncPipe, NgForOf, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ExtendedPost } from 'src/app/models/extended-post';
import { StoreDTO } from 'src/app/models/store';
import { fetchPosts } from 'src/app/store/actions';
import { selectExtendedPostList } from 'src/app/store/selectors';
import { PostComponent } from '../post/post.component';

@Component({
  standalone: true,
  imports: [AsyncPipe, NgIf, NgForOf, PostComponent],
  selector: 'app-post-list',
  template: `<div class="row">
  <div class="col">
    <div class="grid-container">
      <app-post [post]="post" *ngFor="let post of (getExtendedPosts$ | async);let i = index;"
        class="grid-item"></app-post>
    </div>
  </div>
</div>`,
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit {

  getExtendedPosts$: Observable<ExtendedPost[]>;

  constructor(private readonly store: Store<StoreDTO>) {
    this.getExtendedPosts$ = store.select(selectExtendedPostList);
  }

  ngOnInit(): void {
    this.store.dispatch(fetchPosts());
  }

}
