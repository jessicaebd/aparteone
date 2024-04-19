import { Component, EventEmitter, Input, Output } from '@angular/core';
import Swal from 'sweetalert2';
import { FacilityService } from '../service/facility.service';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-facility-list',
  templateUrl: './facility-list.component.html',
  styleUrls: ['./facility-list.component.css']
})
export class FacilityListComponent {
  @Input() listRequest!: any;
  @Input() errorMsg!: string;
  @Input() pagination: boolean = true;

  @Input() length!: number;
  @Input() pageSize: number = 10;
  @Input() pageIndex: number = 0;
  @Input() showPageSizeOptions?: boolean = true;
  @Input() pageSizeOptions?: any = [5, 10, 25];
  @Input() disabled?: any = false;
  @Input() hidePageSize?: boolean = true;
  @Output() onPageIndexEvent = new EventEmitter<number>; 
  @Output() onSubmitEvent = new EventEmitter<number>;

  constructor(private facilityService: FacilityService, private apps: AppComponent){}

  onClickPageIndex(e:any){
    this.onPageIndexEvent.emit(e.pageIndex);
  }

  onCancelEvent(id:any){
    Swal.fire({
      title: 'Are you sure?',
      icon: 'question',
      showCancelButton: true,
      cancelButtonColor: "#697988",
      confirmButtonColor: "#5025FA",
      confirmButtonText: 'Sure',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.value) {
        this.apps.loadingPage(true);
        this.submitRequest(id);
      }
    });
  }

  async submitRequest(id:any){
    let result = await this.updateFacilityRequest(id, 'Cancelled');
    this.apps.loadingPage(false);

    if(result==true){
      Swal.fire({
        title: 'Success',
        html: 'Cancelled Successfuly',
        icon: 'success',
        confirmButtonColor: '#5025FA'
      });
    }
    else {
      Swal.fire({
        title: 'Error',
        html: 'Failed Cancel Request',
        icon: 'error',
        confirmButtonColor: '#5025FA'
      });
    }

    this.onSubmitEvent.emit();
  }

  updateFacilityRequest(facilityRequestId:any, status:any): Promise<any>{
    return new Promise<any>(resolve => 
      this.facilityService.updateFacilityRequest(facilityRequestId, status).subscribe({
        next: async (response: any) => {
          console.log('Response: ', response);
          resolve(true);
        },
        error: (error: any) => {
          console.log('#error', error);
          resolve(error);
        }
      })
    )
  }
}
