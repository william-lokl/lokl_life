import { Injectable } from '@angular/core';

import Swal from 'sweetalert2';

export class LoadingService {
  show(title: any) {
    return Swal.fire({
      title,
      allowEscapeKey: false,
      allowOutsideClick: false,
      showConfirmButton: false,
      // didOpen: () => {
      //   Swal.showLoading({});
      // },
    });
  }
}
