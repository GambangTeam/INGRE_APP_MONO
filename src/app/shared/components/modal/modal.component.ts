import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  showModal = false

  ngOnInit(): void {
    ModalComponent
  }

  toggleModal() {
    this.showModal = !this.showModal
  }



}
