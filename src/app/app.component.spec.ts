import { Location } from '@angular/common';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { APP_ROUTES } from './app.routes';
import { UserLoaderGuard } from './core/user-loader.guard';
import { GdpcComponent } from './gdpc/gdpc.component';
import { RequestInfoComponent } from './holidays/request-info/request-info.component';
import { HomeComponent } from './home/home.component';

it('should check /home redirects to /', fakeAsync(() => {
  const fixture = TestBed.configureTestingModule({
    declarations: [
      HomeComponent,
      AppComponent,
      GdpcComponent,
      RequestInfoComponent,
    ],
    imports: [RouterTestingModule.withRoutes(APP_ROUTES)],
    providers: [
      {
        provide: UserLoaderGuard,
        useValue: { canActivate: () => true },
      },
    ],
    schemas: [NO_ERRORS_SCHEMA],
  }).createComponent(AppComponent);

  const router = TestBed.inject(Router);
  const location = TestBed.inject(Location);
  fixture.ngZone.run(() => {
    router.initialNavigation();
    router.navigateByUrl('/home');
    tick();
    expect(location.path()).toBe('/');
  });
}));
