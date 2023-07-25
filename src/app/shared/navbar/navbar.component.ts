import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { HotToastService } from '@ngneat/hot-toast';
import { createPopper } from '@popperjs/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  @ViewChild('sidenav') sidenav: MatSidenav | undefined = undefined;

  reason = '';

  dropdownPopoverShow = false;
  @ViewChild('btnDropdownRef', { static: false }) btnDropdownRef: any;
  @ViewChild('popoverDropdownRef', { static: false })
  popoverDropdownRef: any;

  infoUser: any = [];
  showMenu = false;
  open = false;
  menu_name: any = undefined;

  ngAfterViewInit() {
    /* createPopper(
      this.btnDropdownRef?.nativeElement,
      this.popoverDropdownRef?.nativeElement,
      {
        placement: 'bottom-start',
      }
    ); */
  }

  constructor(private apiService: ApiService, private router: Router) {}

  async ngOnInit() {
    const menu_selected = JSON.parse(localStorage.getItem('menu') || '{}');
    this.menu_name = menu_selected.MENU_DESCRIPCION;
    /* if (!this.passData.infoClient) {
      await this.getInfoUser();
      console.log(this.passData.infoClient);
    } */
    //await this.getInfoUser();
  }

  toggleNavbar() {
    this.showMenu = !this.showMenu;
  }

  toggleDropdown(event: any) {
    event.preventDefault();
    if (this.dropdownPopoverShow) {
      this.dropdownPopoverShow = false;
    } else {
      this.dropdownPopoverShow = true;
    }
  }

  close(reason: string) {
    this.reason = reason;
    this.sidenav?.close();
  }

  redireTo(path: string) {
    this.router.navigate([`${path}`]);
  }
}
