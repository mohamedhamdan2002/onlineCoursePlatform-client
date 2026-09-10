import { Component, ElementRef, input, output, signal, viewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { VgCoreModule, VgApiService } from '@videogular/ngx-videogular/core';
import { VgControlsModule } from '@videogular/ngx-videogular/controls';
import { VgOverlayPlayModule } from '@videogular/ngx-videogular/overlay-play';
import { VgBufferingModule } from '@videogular/ngx-videogular/buffering';
@Component({
  selector: 'app-video-player',
  imports: [
    MatIcon,
    MatButtonModule,
    MatProgressBarModule,
    VgCoreModule,
    VgControlsModule,
    VgOverlayPlayModule,
    VgBufferingModule
  ],
  templateUrl: './video-player.component.html',
  styleUrl: './video-player.component.scss',
})
export class VideoPlayerComponent {
  videoUrl = input.required<string>();

  ended = output<void>();

  onPlayerReady(api: VgApiService) {
    api.getDefaultMedia().subscriptions.ended.subscribe(() => {
      this.ended.emit();
    });
  }
}
