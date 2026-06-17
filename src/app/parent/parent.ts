import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Child } from '../child/child';

@Component({
  selector: 'app-parent',
  imports: [CommonModule, FormsModule, Child],
  template: `
    <fieldset>
      <legend>
        <h1>Parent Component</h1>
      </legend>
      <p>Parent Input</p>
      <input type="text" [(ngModel)]="inputText"/>
      <p>Received message from child: {{ receivedMessage }} </p>
      
      <app-child [parentInput]="inputText" (childOutput)="onMessageReceived($event)"></app-child>
    </fieldset>
  `,
})
export class Parent {
  inputText!: string;
  receivedMessage: string = '';

  onMessageReceived(message: string) {
    this.receivedMessage = message;
  };
}
