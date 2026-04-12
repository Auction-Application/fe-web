import { Component } from '@angular/core';
import { Header } from '../shared/header/header';
import { Footer } from '../shared/footer/footer';

@Component({
  selector: 'app-user-entry',
  imports: [Header, Footer],
  templateUrl: './user-entry.html',
  styleUrl: './user-entry.scss',
})
export class UserEntry {}
