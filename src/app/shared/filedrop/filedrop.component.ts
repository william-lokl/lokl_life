import { Component, HostListener, Input, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-filedrop',
  templateUrl: './filedrop.component.html',
  styleUrls: ['./filedrop.component.scss'],
})
export class FiledropComponent implements OnInit {
  @Input() label: string = '';

  file: any = [];
  dragAreaClass: string = '';
  preview: any;
  error: string = '';
  constructor(private sanitizer: DomSanitizer) {}
  @HostListener('dragover', ['$event']) onDragOver(event: any) {
    this.dragAreaClass = 'droparea';
    event.preventDefault();
  }
  @HostListener('dragenter', ['$event']) onDragEnter(event: any) {
    this.dragAreaClass = 'droparea';
    event.preventDefault();
  }
  @HostListener('dragend', ['$event']) onDragEnd(event: any) {
    this.dragAreaClass = 'dragarea';
    event.preventDefault();
  }
  @HostListener('dragleave', ['$event']) onDragLeave(event: any) {
    this.dragAreaClass = 'dragarea';
    event.preventDefault();
  }
  @HostListener('drop', ['$event']) onDrop(event: any) {
    this.dragAreaClass = 'dragarea';
    event.preventDefault();
    event.stopPropagation();
    if (event.dataTransfer.files) {
      let files: FileList = event.dataTransfer.files;
      this.saveFiles(files);
    }
  }
  ngOnInit(): void {}

  public async incomingfile(event: any) {
    this.file = [];
    this.file = event.target.files[0];
    this.extraerBase64(this.file).then((imagen: any) => {
      this.preview = imagen.base;
    });
    console.log(this.file);
  }

  extraerBase64 = async ($event: any) =>
    new Promise((resolve, reject) => {
      try {
        const unsafeImg = window.URL.createObjectURL($event);
        const image = this.sanitizer.bypassSecurityTrustUrl(unsafeImg);
        const reader = new FileReader();
        reader.readAsDataURL($event);
        reader.onload = () => {
          resolve({
            base: reader.result,
          });
        };
        reader.onerror = (error) => {
          resolve({
            base: null,
          });
        };
      } catch (e) {
        return reject(e);
      }
    });

  saveFiles(files: FileList) {
    if (files.length > 1) this.error = 'Only one file at time allow';
    else {
      this.error = '';
      this.file = files[0];
      console.log('nombre', this.file);
      this.extraerBase64(this.file).then((imagen: any) => {
        this.preview = imagen.base;
      });
      //console.log(files[0].size, files[0].name, files[0].type);
    }
  }
}
