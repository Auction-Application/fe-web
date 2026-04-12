import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NewsletterInput } from '../newsletter-input/newsletter-input';

interface FooterLink {
  label: string;
  path: string;
}

@Component({
  selector: 'app-footer',
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
  imports: [RouterLink, NewsletterInput],
})
export class Footer {
  protected readonly platformLinks: FooterLink[] = [
    { label: 'Consign',    path: '/consign' },
    { label: 'Valuations', path: '/valuations' },
    { label: 'FAQ',        path: '/faq' },
  ];

  protected readonly legalLinks: FooterLink[] = [
    { label: 'Privacy Policy',   path: '/privacy' },
    { label: 'Terms of Service', path: '/terms' },
    { label: 'Contact',          path: '/contact' },
  ];

  protected onNewsletterSubscribe(email: string): void {
    // TODO: wire up to newsletter service
    console.log('Newsletter subscription:', email);
  }
}
