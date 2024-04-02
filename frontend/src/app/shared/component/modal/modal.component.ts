import { Component, Input, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent {
  // @Input() modalHeader!: TemplateRef<any>;
  // @Input() modalBody!: TemplateRef<any>;
  // @Input() modalFooter!: TemplateRef<any>;
  @Input() modalID!: string;
  @Input() modalContent!: TemplateRef<any>;
  @Input() width?: number;

}
