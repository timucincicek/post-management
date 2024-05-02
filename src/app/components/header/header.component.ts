import { AsyncPipe, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ExtendedPost } from 'src/app/models/extended-post';
import { StoreDTO } from 'src/app/models/store';
import { selectActivePost } from 'src/app/store/selectors';

@Component({
  standalone: true,
  imports: [NgIf, AsyncPipe],
  selector: 'app-header',
  template: `
  <nav class="navbar navbar-dark bg-dark">
  <div class="container-fluid">
    <span class="navbar-brand mb-0">Post Management</span>
    <span class="navbar-brand mb-0" *ngIf="(getActivePost$ | async) as lastPost;">Active post id:&nbsp;{{lastPost.id}}</span>
  </div>
</nav>
`})
export class HeaderComponent {

  getActivePost$: Observable<ExtendedPost>;

  constructor(private readonly store: Store<StoreDTO>) {
    this.getActivePost$ = this.store.select(selectActivePost);
  }

}
