import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, ValidationErrors } from '@angular/forms';

@Component({
  selector: 'app-validation, [validation]',
  templateUrl: './validation.component.html',
  styleUrls: ['./validation.component.scss']
})
export class ValidationComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  @Input() control!: AbstractControl;
  @Input() fieldLabel!: string;
  @Input() label!: string;

  messages: any = {
    "required": 'Field harus diisi',
    "minlength": 'Field %s minimal harus lebih panjang dari %s.',
    "maxlength": 'Field %s minimal harus lebih pendek dari %s.',
    "email": "Masukkan Email yang valid"
  }

  isFieldValid(): boolean {
    return this.control.invalid && this.control.touched;
  }

  displayErrors(): string {

    let message = '';
    const errors: ValidationErrors = this.control.errors as ValidationErrors

    for (let key in errors) {
      const error: any[] = errors[key] ? Object.values(errors[key]) : [];
      const params: any[] = [this.label].concat(error);
      const valMessage: string = this.messages[key];

      message += `<p class="m-0">${this.formatString(valMessage, params)}</p>`;
    }
    return message;
  }

  private formatString(text: string, params: any[]): string {
    let i = 0;

    return (text ? text.replace(/%s/g, () => params.slice(i, ++i) as any) : '')
  }

}
