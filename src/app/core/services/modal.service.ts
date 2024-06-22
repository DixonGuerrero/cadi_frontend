// src/app/core/services/modal.service.ts
import { Injectable } from '@angular/core';
import { Modal, ModalOptions, ModalInterface, InstanceOptions } from 'flowbite';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  private modal: ModalInterface | null = null;

  initModal(modalId: string, options: ModalOptions = {}) {
    const modalElement: HTMLElement =
      document.querySelector(`#${modalId}`) ?? document.createElement('div');

    if (modalElement) {
      const modalOptions: ModalOptions = {
        placement: 'bottom-right',
        backdrop: 'dynamic',
        backdropClasses:
            'bg-gray-900/50 dark:bg-gray-900/80 fixed inset-0 z-40',
        closable: true,
        onHide: () => {
          
        },
        onShow: () => {
           
        },
        onToggle: () => {
            
        },
        ...options,
    };



      this.modal = new Modal(modalElement, modalOptions);
    }
  }

  showModal() {
    if (this.modal) {
      this.modal.show();
    } else {
      console.error('Modal not initialized');
    }
  }

  hideModal() {
    if (this.modal) {
      this.modal.hide();
    } else {
      console.error('Modal not initialized');
    }
  }

  toggleModal() {
    if (this.modal) {
      this.modal.toggle();
    } else {
      console.error('Modal not initialized');
    }
  }

  destroyModal() {
    if (this.modal) {
      this.modal.destroy();
    } else {
      console.error('Modal not initialized');
    }
  }
}
