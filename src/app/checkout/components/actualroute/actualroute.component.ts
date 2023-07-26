import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-actualroute',
  templateUrl: './actualroute.component.html',
  styleUrls: ['./actualroute.component.scss'],
})
export class ActualrouteComponent implements OnInit {
  constructor(private route: ActivatedRoute, private router: Router) {}
  rutaActual: string = '';
  ngOnInit(): void {
    this.route.url.subscribe((segments) => {
      // Obtener la ruta actual (suponiendo que es el último segmento de la URL)
      this.rutaActual = segments[segments.length - 1].path;
      console.log(this.rutaActual);
    });
  }

  redireTo(path: string) {
    this.router.navigate([`${path}`]);
  }
}
