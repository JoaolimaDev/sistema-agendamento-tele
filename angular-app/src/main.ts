import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { importProvidersFrom } from '@angular/core';
import { RouterModule } from '@angular/router';
import { routes } from './app/app.routes';
import { HttpClientModule } from '@angular/common/http';

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(RouterModule.forRoot(routes)),
    importProvidersFrom(HttpClientModule),
    provideAnimationsAsync()
  ]
})
.catch(err => console.error(err));
