import { Component, Input, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-accordion',
  templateUrl: './accordion.component.html',
  styleUrls: ['./accordion.component.css']
})
export class AccordionComponent {
  @Input() header!: string;
  @Input() collapsedID?: string;
  @Input() collapseToggle?: string;
  @Input() collapseTarget?: string;
  @Input() accordionParent?: string;
  @Input() isCollapsed?: boolean = true;
  @Input() accordionContent!: TemplateRef<any>;
}
