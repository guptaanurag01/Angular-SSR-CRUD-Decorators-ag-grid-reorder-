import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-child',
  imports: [CommonModule, FormsModule],
  template: `
  <fieldset>
  <legend>
    <h1>Child Component</h1>
  </legend>
  <p>Parent input: {{ parentInput }}</p>
  <input type="text" [(ngModel)]="parentInput" />
  
  <p>Child Message to send to parent: {{ message }}</p>
  <input type="text" [(ngModel)]="message" (keyup.enter)="sendMessage()" />
  <button (click)="sendMessage()">Send to Parent</button>
</fieldset>
  `
})
export class Child {
  @Input() parentInput: string = '';

  message: string = '';
  @Output() childOutput: EventEmitter<string> = new EventEmitter<string>();
  sendMessage() {
    this.childOutput.emit(this.message)
  };

}
