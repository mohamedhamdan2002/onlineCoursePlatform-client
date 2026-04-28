import { Component, input, output, signal } from '@angular/core';
import { MaterialModule } from '../../material.module';

@Component({
  selector: 'app-password-input',
  imports: [
    MaterialModule
  ],
  templateUrl: './password-input.component.html',
  styleUrl: './password-input.component.scss',
})
export class PasswordInputComponent {
  readonly label = input<string>('password');
  readonly style = input<string>('');
  readonly inputValue = output<string>();
  readonly hide = signal(true);
  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }
}
