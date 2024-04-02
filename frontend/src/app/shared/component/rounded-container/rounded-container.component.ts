import { Component, Input, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-rounded-container',
  templateUrl: './rounded-container.component.html',
  styleUrls: ['./rounded-container.component.css']
})
export class RoundedContainerComponent {
  @Input() contentTemplate!: TemplateRef<any>;
}

// import {
//   AfterViewInit,
//   Component,
//   ElementRef,
//   EventEmitter,
//   Input,
//   Output,
//   TemplateRef,
//   ViewChild,
// } from "@angular/core";

// @Component({
//   selector: 'app-rounded-container',
//   templateUrl: './rounded-container.component.html',
//   styleUrls: ['./rounded-container.component.css']
// })
// export class RoundedContainerComponent implements AfterViewInit {
//   @Input() contentTemplate!: TemplateRef<any>;
//   @Input() panelHeight: string = "285px";
//   @Output() endScrollEvent = new EventEmitter<boolean>(false);
//   @Input() floatingButton: boolean = true;
//   @Input() showButtonEditable: boolean = false;
//   @ViewChild("myIdentifier") myIdentifier!: ElementRef;
//   @Input() scrollToTop: boolean = false;
//   @Output() eventToTop = new EventEmitter<boolean>(false);

//   endScroll: boolean = false;
//   disableScroll: boolean = false;

//   onScroll(event: any) {
//     const { offsetHeight, scrollTop, scrollHeight } = event.target;
//     if(this.disableScroll) return;
//     if (
//       offsetHeight + scrollTop >= scrollHeight - 1
//     ) {
//       this.endScroll = true;
//     } else {
//       this.endScroll = false;
//     }
//     this.endScrollEvent.emit(this.endScroll);
//     console.log('scroll....', offsetHeight, scrollTop, scrollHeight, this.endScroll);
//   }

//   ngOnInit() {
//     if (this.scrollToTop) {
//       this.myIdentifier.nativeElement.scrollTop = 0;
//       this.eventToTop.emit(true);
//     }
//   }

//   ngAfterViewInit() {
//     console.log('#init', this.myIdentifier.nativeElement.scrollTop);
//   }

// }