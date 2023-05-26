import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BnNgIdleService } from 'bn-ng-idle';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'portal-pagatodopr';
  constructor(private bnIdle: BnNgIdleService, private router: Router) {

  }

  ngOnInit() {
    // this.isSpinner = false

    this.bnIdle.startWatching(60).subscribe((res) => {

      if (res && localStorage.getItem('token')) {

        this.router.navigate(['login'])

      }
    });



  }
}
