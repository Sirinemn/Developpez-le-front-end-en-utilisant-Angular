import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { PieChartComponent } from './pie-chart/pie-chart.component';
import { LineChartComponent } from './line-chart/line-chart.component';
import { NgChartsModule} from 'ng2-charts';
import { HeaderComponent } from './header/header.component';


@NgModule({
  declarations: [AppComponent, HomeComponent, NotFoundComponent, PieChartComponent, LineChartComponent, HeaderComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule,NgChartsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
