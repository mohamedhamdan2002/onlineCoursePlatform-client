import { Component } from '@angular/core';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-empty-wishlist',
  imports: [
    RouterLink,
    MatIconButton,
    MatIcon,
    MatButton
  ],
  templateUrl: './empty-wishlist.component.html',
  styleUrl: './empty-wishlist.component.scss',
})
export class EmptyWishlistComponent {

}
