import { Injectable, signal } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class HeaderService {
  private mobileMenuOpen = signal(false);
  isMobileMenuOpen = this.mobileMenuOpen.asReadonly()

  closeMobileMenu() {
    this.mobileMenuOpen.set(false);
  }

  openMobileMenu() {
    this.mobileMenuOpen.set(true);
  }

  flipMobileMenu() {
    this.mobileMenuOpen.set(!this.mobileMenuOpen());
  }
}
