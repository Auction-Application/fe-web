import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TuiButton } from '@taiga-ui/core';

@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.html',
  styleUrl: './signup-form.scss',
  imports: [RouterLink, TuiButton],
})
export class SignupForm {}
