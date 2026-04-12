import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TuiButton, TuiIcon } from '@taiga-ui/core';

interface NavItem {
  label: string;
  path: string;
}

@Component({
  selector: 'app-header',
  templateUrl: './header.html',
  styleUrl: './header.scss',
  imports: [RouterLink, RouterLinkActive, TuiButton, TuiIcon],
})
export class Header {
  protected readonly navItems: NavItem[] = [
    { label: 'Live Auctions',       path: '/live-auctions' },
    { label: 'Upcoming',            path: '/upcoming' },
    { label: 'Private Collections', path: '/private-collections' },
    { label: 'Artists',             path: '/artists' },
    { label: 'Journal',             path: '/journal' },
  ];
}
