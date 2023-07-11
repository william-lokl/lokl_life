import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-landinpage',
  templateUrl: './landinpage.component.html',
  styleUrls: ['./landinpage.component.scss'],
})
export class LandinpageComponent implements OnInit {
  private player: any;
  constructor() {}

  ngOnInit(): void {
    this.loadYoutubePlayerAPI();
  }

  loadYoutubePlayerAPI() {
    // Crea un elemento <script> para cargar la API de YouTube
    const script = document.createElement('script');
    script.src = 'https://www.youtube.com/iframe_api';
    document.body.appendChild(script);

    // Registra una función global para inicializar el reproductor
    (window as any).onYouTubeIframeAPIReady = () => {
      this.createPlayer();
    };
  }

  createPlayer() {
    // Crea el reproductor de YouTube dentro del div con id "youtube-player"
    this.player = new (window as any).YT.Player('youtube-player', {
      height: '250',
      width: '640',
      videoId: 'CQDtTMMa2mQ', // Reemplaza con el ID de tu video de YouTube
    });
  }
}
