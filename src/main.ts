import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http';
import { provideStore } from '@ngrx/store';
import { Effects } from './app/store/effects';
import { provideEffects } from '@ngrx/effects';
import { activePostReducer, extendedPostListReducer, loadingReducer, previousPostReducer } from './app/store/reducers';
import { provideToastr } from 'ngx-toastr';

bootstrapApplication(AppComponent, {
  providers: [
    provideAnimations(),
    provideHttpClient(),
    provideStore(
      {
        extendedPostList: extendedPostListReducer,
        previousPost: previousPostReducer,
        activePost: activePostReducer,
        loading: loadingReducer
      }
    ),
    provideToastr({
      positionClass: 'toast-bottom-right'
    }),
    provideEffects([Effects])
  ]
});
