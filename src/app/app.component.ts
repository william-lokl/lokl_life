import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BnNgIdleService } from 'bn-ng-idle';
import { log } from 'console';
import * as moment from 'moment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'LOKL';
  constructor(private bnIdle: BnNgIdleService, private router: Router) {}

  ngOnInit() {
    // this.isSpinner = false
    moment.locale('es');
    /* this.bnIdle.startWatching(14400).subscribe((res) => {
      if (res && localStorage.getItem('token')) {
        localStorage.removeItem('token');
        this.router.navigate(['login']);
      }
    }); */
  }

  redireTo(path: string) {
    this.router.navigate([`${path}`]);
  }
}
