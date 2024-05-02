import { AsyncPipe, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { HeaderComponent } from './components/header/header.component';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { PostListComponent } from './components/post-list/post-list.component';
import { StoreDTO } from './models/store';
import { selectLoading } from './store/selectors';

@Component({
  standalone: true,
  imports: [HeaderComponent, PostListComponent, LoadingSpinnerComponent, AsyncPipe, NgIf],
  selector: 'app-root',
  template: `
  <app-header></app-header>
  <app-post-list></app-post-list>
  <app-loading-spinner *ngIf="loading$ | async"></app-loading-spinner>
  `,
})

export class AppComponent {
  loading$: Observable<boolean>;
  constructor(private readonly store: Store<StoreDTO>) {
    this.loading$ = store.select(selectLoading);
  }
}
