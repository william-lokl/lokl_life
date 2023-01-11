import {
  animate,
  keyframes,
  state,
  style,
  transition,
  trigger,
  useAnimation,
} from '@angular/animations';
import { Component, TemplateRef } from '@angular/core';
import { bounceInRight, bounceOutRight } from 'ng-animate';
import { Toast, ToastPackage, ToastrService } from 'ngx-toastr';

@Component({
  selector: '[toast-component]',
  template: `
    <div [style.display]="state.value === 'inactive' ? 'none' : ''">
      <div
        id="toast-simple"
        class="flex items-center p-4 space-x-4 w-full max-w-xs text-white bg-white rounded-lg divide-x divide-gray-200 shadow space-x"
        [ngClass]="{
          'bg-green-500': title === 'ok',
          'bg-red-600': title === 'error'
        }"
        role="alert"
      >
        <!-- <svg
          aria-hidden="true"
          class="w-5 h-5 text-white dark:text-white"
          focusable="false"
          data-prefix="fas"
          data-icon="paper-plane"
          role="img"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
        >
          <path
            *ngIf="title === 'ok'"
            fill="currentColor"
            d="M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zM227.314 387.314l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.249-16.379-6.249-22.628 0L216 308.118l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.249 16.379 6.249 22.628.001z"
          ></path>
          <path
            *ngIf="title === 'error'"
            fill="currentColor"
            d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm121.6 313.1c4.7 4.7 4.7 12.3 0 17L338 377.6c-4.7 4.7-12.3 4.7-17 0L256 312l-65.1 65.6c-4.7 4.7-12.3 4.7-17 0L134.4 338c-4.7-4.7-4.7-12.3 0-17l65.6-65-65.6-65.1c-4.7-4.7-4.7-12.3 0-17l39.6-39.6c4.7-4.7 12.3-4.7 17 0l65 65.7 65.1-65.6c4.7-4.7 12.3-4.7 17 0l39.6 39.6c4.7 4.7 4.7 12.3 0 17L312 256l65.6 65.1z"
          ></path>
        </svg> -->
        <div class="pl-4 text-sm font-normal">{{ message }}</div>
      </div>
    </div>
  `,
  animations: [
    trigger('flyInOut', [
      state('show', style({})),
      state(
        'hide',
        style({
          opacity: 0,
        })
      ),
      transition(
        'hide => show',
        useAnimation(bounceInRight, {
          params: {
            timing: 3,
          },
        })
      ),
      transition(
        'show => hide',
        useAnimation(bounceOutRight, {
          params: {
            timing: 3,
          },
        })
      ),
    ]),
  ],
  preserveWhitespaces: false,
})
export class ToastsContainer extends Toast {
  undoString = 'undo';

  // constructor is only necessary when not using AoT
  // constructor(
  //   protected toastrService: ToastrService,
  //   public toastPackage: ToastPackage
  // ) {
  //   super();
  // }

  action(event: Event) {
    event.stopPropagation();
    this.undoString = 'undid';
    this.toastPackage.triggerAction();
    return false;
  }
}
