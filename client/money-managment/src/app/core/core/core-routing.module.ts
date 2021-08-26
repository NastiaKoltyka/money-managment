import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/auth.guard';
import { UserResolverService } from 'src/app/user-resolver.service';



const routes: Routes = [
  { path: 'dashboard', loadChildren: () => import('../../dashboard/dashboard.module').then(m => m.DashboardModule), resolve: { user: UserResolverService },canActivate: [AuthGuard] },
  { path: 'login', loadChildren: () => import('../../login/login.module').then(m => m.LoginModule) },
  { path: 'settings', loadChildren: () => import('../../settings/settings.module').then(m => m.SettingsModule),canActivate: [AuthGuard] },
  { path: 'statistic', loadChildren: () => import('../../statistic/statistic.module').then(m => m.StatisticModule),canActivate: [AuthGuard] },
  { path: 'my-profile', loadChildren: () => import('../../my-profile/my-profile.module').then(m => m.MyProfileModule),canActivate: [AuthGuard] },
  { path: 'history', loadChildren: () => import('../../history/history.module').then(m => m.HistoryModule),canActivate: [AuthGuard] },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class CoreRoutingModule { }
