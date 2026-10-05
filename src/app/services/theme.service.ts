import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly KEY = 'dark-mode';
  dark = false;

  init(): void {
    const saved = localStorage.getItem(this.KEY);
    this.dark =
      saved !== null
        ? saved === 'true'
        : window.matchMedia('(prefers-color-scheme: dark)').matches;
    this.apply();
  }

  toggle(): void {
    this.dark = !this.dark;
    localStorage.setItem(this.KEY, String(this.dark));
    this.apply();
  }

  private apply(): void {
    document.documentElement.classList.toggle('ion-palette-dark', this.dark);
  }
}