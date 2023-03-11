import { Component, Input, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { ApiService } from 'src/app/services/api.service';
import { LoadingService } from 'src/app/services/loading.service';
import { PassDataService } from 'src/app/services/pass-data.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.scss'],
})
export class ProductosComponent implements OnInit {
  @Input() tipo: Number = 1;

  selectedRecipe: any;
  paises: any = [];
  paisSelected: any = null;
  productos: any = [];
  topfive: any = [];
  productoSelected: any = null;
  servicioSelected: any = null;
  fee = 0;
  totalPagar = 0;
  totalResponse: any = 0;
  response: any = [];

  recarga: any = {
    cantidad: '',
    numero: '',
    serial: '',
    email: '',
  };
  recargaForm!: FormGroup;
  showModal: boolean = false;

  routeSub: any;

  div2: boolean = true;
  div3: boolean = false;

  constructor(
    private apiService: ApiService,
    public passData: PassDataService,
    public loading: LoadingService,
    public router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private toastService: HotToastService
  ) {}

  Show: boolean = false;

  async ngOnInit() {
    this.routeSub = this.route.params.subscribe((params: any) => {
      if (params['id']) this.tipo = Number(params['id']);
    });

    // this.recargaForm = this.formBuilder.group({
    //   cantidad: new FormControl('', Validators.compose([Validators.required])),
    //   numero: new FormControl('', Validators.compose([Validators.required])),
    // });

    this.recargaForm = this.formBuilder.group({
      cantidad: new FormControl(''),
      numero: new FormControl(''),
      serial: new FormControl(''),
      email: new FormControl(''),
    });

    this.recargaForm.controls['cantidad'].disable();
    this.recargaForm.controls['numero'].disable();
    this.recargaForm.controls['serial'].disable();
    this.recargaForm.controls['email'].disable();

    if (this.tipo === 1 || this.tipo === 3 || this.tipo === 15) {
      /// Recargas - pines - recaudo claro
      this.div2 = true;
      this.div3 = false;
      // this.recargaForm.get('numero')?.clearValidators();
      this.recargaForm.get('cantidad')?.setValidators(Validators.required);
      this.recargaForm.get('numero')?.setValidators(Validators.required);
    } else {
      /// Activaciones - gifcards
      this.div2 = false;
      this.div3 = true;
      this.recargaForm.get('cantidad')?.setValidators(Validators.required);
      this.recargaForm.get('numero')?.setValidators(Validators.required);
      this.recargaForm.get('serial')?.setValidators(Validators.required);

      if (this.tipo === 20)
        this.recargaForm.get('email')?.setValidators(Validators.required);
    }

    await this.consultarPaises();
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }

  async consultarPaises() {
    let promise = new Promise((resolve, reject) => {
      const loadingM: any = this.loading.show(
        'Cargando paises, por favor espere...'
      );

      this.apiService.get(`/productos/info-paises/${this.tipo}`).subscribe(
        async (res: any) => {
          loadingM.close();
          if (res.status === 202) this.showError(res);
          else if (!res.status) this.showError(res);
          else if (res.status === 404) this.showError(res);
          else if (res.data.length === 0) {
            this.showError('No se tienen paises asignados');
          } else {
            this.paises = res.data;
            // console.log(this.paises);

            let filter = this.paises.filter((acc: any) => {
              return acc.PAIS_ID === 227;
            });
            if (filter.length > 0) {
              await new Promise((resolve) =>
                setTimeout(async () => {
                  this.paisSelected = filter[0];
                  await this.consultarProductos(this.paisSelected);
                }, 400)
              );
            }

            resolve(this.paises);
          }
        },
        (error: any) => {
          loadingM.close();
          console.log('Error consultando los paises', error);
          this.showError(error);
          reject(error);
        }
      );
    });
    return promise;
  }

  async consultarProductos(pais: any) {
    let promise = new Promise((resolve, reject) => {
      let loadingM: any = this.loading.show(
        'Cargando productos, por favor espere...'
      );

      this.apiService
        .get(`/productos/info-productos/${this.tipo}/${pais.PAIS_ID}`)
        .subscribe(
          async (res: any) => {
            loadingM.close();
            if (res.status === 202) this.showError(res);
            else if (!res.status) this.showError(res);
            else if (res.status === 404) this.showError(res);
            else if (res.data.length === 0) {
              this.showError('No se tienen productos asignados');
            } else {
              this.productos = res.data;
              let arrayfive: any = [];
              let beautyProducts = this.productos
                .map((product: any) => {
                  const fives = product.productos.filter(
                    (b: any) => b.topfive > 0
                  );

                  if (fives.length) {
                    fives.map((five: any) => {
                      arrayfive.push({ ...product, five });
                    });
                  }
                  return null;
                })
                .filter((p: any) => p);
              this.topfive = arrayfive.slice(0, 5);
              //console.log(this.topfive);
              resolve(this.productos);
            }
          },
          (error: any) => {
            loadingM.close();
            console.log('Error consultando los productos', error);
            this.showError(error);
            reject(error);
          }
        );
    });
    return promise;
  }

  async checkPassword(clave: any) {
    let promise = new Promise((resolve, reject) => {
      this.apiService.post(`/productos/verifypass`, { clave }).subscribe(
        async (res: any) => {
          if (!res.status) this.showError(res.message);
          resolve(res);
        },
        (error: any) => {
          console.log('Error consultando la constraseña', error);
          this.showError(error);
          reject(error);
        }
      );
    });
    return promise;
  }

  async selectPais() {
    if (this.paisSelected.PAIS_ID) {
      // this.classFull = true;
      // this.showPrepagos = true;
      this.productoSelected = null;
      this.servicioSelected = null;
      this.resetForm();
      await this.consultarProductos(this.paisSelected);
    }
  }

  async selectProducto() {
    //console.log(this.productoSelected);
    this.servicioSelected = null;
    this.resetForm();
  }

  async selectService(service: any) {
    this.servicioSelected = service;
    if (this.servicioSelected) {
      if (this.servicioSelected.valor > 0) {
        this.recargaForm.controls['cantidad'].disable();
        this.recarga.cantidad = this.servicioSelected.valor;
      } else {
        this.recarga.cantidad = 0.0;
        this.recargaForm.controls['cantidad'].enable();
        this.recargaForm.controls['numero'].enable();
      }
      this.recargaForm.controls['numero'].enable();
      this.recargaForm.controls['serial'].enable();
      this.recargaForm.controls['email'].enable();
      this.calculateTotalPagar();
    }
  }

  async clickFav(fav: any) {
    this.productoSelected = fav;
    this.servicioSelected = fav.five;
    await this.selectService(this.servicioSelected);
  }

  calculateTotalPagar() {
    this.fee = this.servicioSelected ? this.servicioSelected.fee : 0.0;
    this.totalPagar = Number(this.recarga.cantidad) + Number(this.fee);
  }

  resetForm() {
    this.recargaForm.controls['cantidad'].disable();
    this.recargaForm.controls['numero'].disable();
    this.recargaForm.controls['serial'].disable();
    this.recargaForm.controls['email'].disable();
    this.recarga = {
      cantidad: '',
      // numero: '',
    };
    this.calculateTotalPagar();
  }

  cantidadchange(percent: number) {
    this.calculateTotalPagar();
  }

  clickRecarga() {
    if (
      Number(this.recarga.cantidad) > Number(this.servicioSelected.valorMax) ||
      Number(this.recarga.cantidad) < Number(this.servicioSelected.valorMin)
    ) {
      this.showError(
        'El valor debe ser mayor o igual $ ' +
          this.servicioSelected.valorMin +
          ' y menor o igual a $ ' +
          this.servicioSelected.valorMax
      );
    } else {
      Swal.fire({
        // title: 'Submit your Github username',
        html: `
              <label for="countries" class="block mb-4 text-md font-medium text-gray-900"><b>Ingrese su clave</b></label>

                <div class="w-full max-w-md space-y-8">
                <form class="mt-1.5 space-y-6" >
                  <div class="relative">
                    <input type="password" id="pass_outlined-2" class="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                    <label for="pass_outlined-2" class="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Clave</label>
                  </div>
                </form>
              </div>
        `,
        confirmButtonText: 'Confirmar',
        focusConfirm: false,
        showCloseButton: true,
        showLoaderOnConfirm: true,
        preConfirm: async () => {
          const password: any =
            Swal.getPopup()?.querySelector('#pass_outlined-2');
          try {
            let result: any = await this.checkPassword(password.value);
            if (result.status) return true;
            else {
              Swal.showValidationMessage(`${result.message}`);
              return false;
            }
          } catch (e) {
            Swal.showValidationMessage(`${e}`);
            return false;
          }
        },
        allowOutsideClick: () => !Swal.isLoading(),
      }).then((result) => {
        if (result.isConfirmed) {
          let objRecarga = {
            numero: this.recarga.numero,
            valor: this.totalPagar,
            operador: this.servicioSelected.code,
            proveedor: this.servicioSelected.proveedorId,
            tipo: this.servicioSelected.tipo,
          };

          //console.log(this.totalPagar, this.servicioSelected);
          console.log('crear recarga', objRecarga);

          const loadingM: any = this.loading.show(
            'Creando recarga, por favor espere...'
          );

          this.apiService
            .post(
              `${this.tipo === 3 ? `/productos/pin/` : `/productos/recharge/`}`,
              objRecarga
            )
            .subscribe(
              async (res: any) => {
                loadingM.close();
                if (res.status === 202) this.showError(res.message);
                else if (!res.status) this.showError(res.message);
                else if (res.status === 404) this.showError(res.message);
                else {
                  this.showModal = true;
                  this.showError('Recarga realizada con éxito', 'ok');
                  this.productoSelected = null;
                  this.servicioSelected = null;
                  this.resetForm();

                  this.response = this.tipo === 3 ? res.data : res.data[0];
                  this.totalResponse =
                    Number(this.response.valorrec) +
                    Number(this.response.ivurec);
                  // await new Promise((resolve) =>
                  //   setTimeout(async () => {
                  //     window.location.reload();
                  //   }, 1800)
                  // );
                  //this.response = res;
                }
              },
              (error: any) => {
                loadingM.close();
                console.log('error creando la recarga', error);
                this.showError(error);
              }
            );
        }
        // if (result.isConfirmed) {
        //   Swal.fire({
        //     title: `${result?.value.login}'s avatar`,
        //     imageUrl: result?.value.avatar_url,
        //   });
        // }
      });
    }
  }

  toggleModal() {
    this.showModal = false;
  }

  toggle() {
    this.Show = !this.Show;
  }

  setThresholds() {
    this.Show = true;
  }

  closeList1() {
    this.Show = false;
  }

  showError(error: any, option?: any) {
    if (option) this.toastService.success(error);
    else {
      this.toastService.error(
        typeof error === 'object'
          ? '¡Lo sentimos! Estamos presentando problemas. Intenta más tarde'
          : error
      );
    }
  }
}
