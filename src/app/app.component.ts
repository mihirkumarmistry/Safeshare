import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SharedModule } from './theme/shared/shared.module';
// import { AppRoutingModule } from './app-routing.module';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SharedModule,],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'safeshare';
}
