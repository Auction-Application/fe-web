import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TuiRoot } from '@taiga-ui/core';
import { FooterComponent } from './shared/footer/footer.component';
import { HeaderComponent } from './shared/header/header.component';

@Component({
  imports: [RouterModule, TuiRoot, HeaderComponent, FooterComponent],
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected title = 'auction';
}
