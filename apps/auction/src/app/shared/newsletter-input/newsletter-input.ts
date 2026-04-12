import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TuiButton, TuiIcon, TuiInput, TuiLabel } from '@taiga-ui/core';

@Component({
  selector: 'app-newsletter-input',
  templateUrl: './newsletter-input.html',
  styleUrl: './newsletter-input.scss',
  imports: [FormsModule, TuiInput, TuiButton, TuiIcon, TuiLabel],
})
export class NewsletterInput {
  @Output() subscribe = new EventEmitter<string>();

  protected email = '';

  protected onSubmit(): void {
    const trimmed = this.email.trim();
    if (trimmed) {
      this.subscribe.emit(trimmed);
      this.email = '';
    }
  }
}
