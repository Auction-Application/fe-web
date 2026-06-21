import { Component } from '@angular/core';
import { FooterComponent } from '../shared/footer/footer.component';
import { HeaderComponent } from '../shared/header/header.component';

@Component({
  selector: 'app-user-entry',
  imports: [HeaderComponent, FooterComponent],
  templateUrl: './user-entry.html',
  styleUrl: './user-entry.scss',
})
export class UserEntryComponent {}
