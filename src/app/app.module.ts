import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/not-found/home/home.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { PieChartComponent } from './component/pie-chart/pie-chart.component';
import { LineChartComponent } from './component/line-chart/line-chart.component';
import { NgChartsModule} from 'ng2-charts';
import { HeaderComponent } from './component/header/header.component';
import { MainComponent } from './component/main/main.component';
import { FooterComponent } from './component/footer/footer.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [AppComponent, HomeComponent, NotFoundComponent, PieChartComponent, LineChartComponent, HeaderComponent, MainComponent, FooterComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule,NgChartsModule, NgbModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
