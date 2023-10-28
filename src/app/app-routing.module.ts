import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './component/home/home.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { LineChartComponent } from './component/line-chart/line-chart.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'page/:country', 
    component: LineChartComponent
  },
  {
    path: '404', 
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
