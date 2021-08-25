import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/auth.guard';
import { UserResolverService } from 'src/app/user-resolver.service';



const routes: Routes = [
  { path: 'dashboard', loadChildren: () => import('../../dashboard/dashboard.module').then(m => m.DashboardModule), resolve: { user: UserResolverService },canActivate: [AuthGuard] },
  { path: 'login', loadChildren: () => import('../../login/login.module').then(m => m.LoginModule) },
  { path: 'settings', loadChildren: () => import('../../settings/settings.module').then(m => m.SettingsModule) },
  { path: 'statistic', loadChildren: () => import('../../statistic/statistic.module').then(m => m.StatisticModule) },
  { path: 'my-profile', loadChildren: () => import('../../my-profile/my-profile.module').then(m => m.MyProfileModule) },
  { path: 'history', loadChildren: () => import('../../history/history.module').then(m => m.HistoryModule) },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class CoreRoutingModule { }
