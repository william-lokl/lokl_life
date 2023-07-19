import { Component, OnInit } from '@angular/core';

declare var YT: any;

@Component({
  selector: 'app-landinpage',
  templateUrl: './landinpage.component.html',
  styleUrls: ['./landinpage.component.scss'],
})
export class LandinpageComponent implements OnInit {
  private player: any;
  constructor() {}

  async ngOnInit() {
    /* const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    document.body.appendChild(tag); */
    this.loadYoutubePlayerAPI();
  }

  loadYoutubePlayerAPI() {
    // Crea un elemento <script> para cargar la API de YouTube
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';

    // Agrega el elemento <script> al final del cuerpo del documento
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);

    // Registra una función global para inicializar el reproductor
    (window as any).onYouTubeIframeAPIReady = () => {
      this.createPlayer();
    };
  }

  createPlayer() {
    // Crea el reproductor de YouTube dentro del div con id "youtube-player"
    this.player = new YT.Player('youtube-player', {
      height: '360',
      width: '640',
      videoId: 'CQDtTMMa2mQ', // Reemplaza con el ID de tu video de YouTube
    });
  }
}
