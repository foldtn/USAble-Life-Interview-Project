import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';

// Components
import { AppComponent } from './app.component';
import { NavMenuComponent } from './components/nav-menu/nav-menu.component';
import { HomeComponent } from './components/home/home.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { UnauthorizedComponent } from './components/unauthorized/unauthorized.component';

// Modules
import { UserDashboardModule } from './user-dashboard/user-dashboard.module';
import { MenuDashboardModule } from './menu-dashboard/menu-dashboard.module';
import { TaxDashboardModule } from './tax-dashboard/tax-dashboard.module';

// Helpers
import { JwtInterceptor} from './helpers/jwt.interceptor';
import { ErrorInterceptor } from './helpers/error.interceptor';

const routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'unauthorized', component: UnauthorizedComponent },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    NotFoundComponent,
    UnauthorizedComponent,
  ],
  imports: [
    // Angular Modules
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routes),
    // Custom Modules
    UserDashboardModule,
    MenuDashboardModule,
    TaxDashboardModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
