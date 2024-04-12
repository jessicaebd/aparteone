import { Location } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { Column } from 'src/app/shared/component/table/table.component';
import { FacilityCategory, FacilityCategoryTime, FacilityRequest } from './facility.interface';
import { FacilityService } from './service/facility.service';

@Component({
  selector: 'app-facility',
  templateUrl: './facility.component.html',
  styleUrls: ['./facility.component.css']
})
export class FacilityComponent {
  isResident: boolean = false;
  isManagement: boolean = true;

  errorListCategory: string = "";
  errorListRequest: string = "";

  tableCategory: any;
  tableRequest: any;
  allDataCategory: any;
  allDataRequest: any;
  errorMsgCategory?: string;
  errorMsgRequest?: string;
  sortReqCol?: string = 'status';
  sortReqDir?: string = 'desc';
  sortCatCol?: string = 'created_date';
  sortCatDir?: string = 'desc';
  colCategory: Column[] = [];
  colRequest: Column[] = [];
  dataCategory: FacilityCategory = {};
  dataRequest: FacilityRequest = {};

  @ViewChild('closeModal') modalClose: any;

  constructor(private location: Location,private facilityService: FacilityService){}
  
  ngOnInit(): void {
    
    if(this.isManagement){
      this.colRequest = [{name: 'facility_category', displayName: 'Category'}, {name: 'request_date', displayName: 'Request Date'}, {name: 'residentId', displayName:'Requested By'}, {name: 'assigned_to', displayName: 'Assign To'}, {name: 'status', displayName: 'Status'}, {name:"ActionCol", displayName:"Action", align:"center"}];
      this.colCategory = [{name: 'Category Name', displayName: 'Category Name'}, {name: 'description', displayName: 'Description'}, {name: 'Status', displayName: 'Status'}, {name:"ActionCol", displayName:"Action", align:"center"}];
  
      this.getFacilityAllCategory(1, 10, 0, this.sortCatCol, this.sortCatDir);
      // this.getFacilityAllRequest(1, 10, 0, this.sortReqCol, this.sortReqCol);
    }
    else if (this.isResident){
      this.getFacilityAllCategory(1, 1000, 0, this.sortCatCol, this.sortCatDir);
      // this.getFacilityResidentRequest(4, 3, 0, this.sortReqCol, this.sortReqDir);
    }
  }

  getFacilityAllCategory(apartementId:any, size:any, page:any, sortBy: any, sortDir:any): Promise<any>{
    return new Promise<any>(resolve => 
      this.facilityService.getFacilityAllCategory(apartementId, size, page, sortBy, sortDir).subscribe({
        next: async (response: any) => {
          console.log('Response: ', response);
          if(response.data.length > 0){
            let result = await this.setFacilityCategory(response.data);
            this.tableCategory = result;
            console.log(result);
            this.allDataCategory = response.totalElements;
          }
          else{
            this.errorMsgCategory = 'No Data Found!'
            this.errorListCategory = 'No Data Found!'
          }
          resolve(true);
        },
        error: (error: any) => {
          console.log('#error', error);
          this.errorMsgCategory = 'No Data Found!'
          this.errorListCategory = 'No Data Found!'
          resolve(error);
        }
      }))
  }

  getFacilityAllRequest(apartementId:any, size:any, page:any, sortBy: any, sortDir:any): Promise<any>{
    return new Promise<any>(resolve => 
      this.facilityService.getFacilityAllRequest(apartementId, size, page, sortBy, sortDir).subscribe({
        next: async (response: any) => {
          console.log('Response: ', response);
          if(response.data.length > 0){
            this.tableRequest = response.data;
            this.allDataRequest = response.totalElements;
          }
          else{
            this.errorMsgRequest = 'No Data Found!'
          }
          resolve(true);
        },
        error: (error: any) => {
          console.log('#error', error);
          this.errorMsgRequest = 'No Data Found!'
          resolve(error);
        }
      }))
  }

  getFacilityResidentRequest(residentId:any, size:any, page:any, sortBy: any, sortReqDir:any): Promise<any>{
    return new Promise<any>(resolve => 
      this.facilityService.getFacilityResidentRequest(residentId, size, page, sortBy, sortReqDir).subscribe({
        next: async (response: any) => {
          console.log('Response: ', response);
          if(response.data.length > 0){
            this.tableRequest = response.data;
            this.allDataRequest = response.totalElements;
          }
          else{
            this.errorListRequest = 'No Data Found!'
          }
          resolve(true);
        },
        error: (error: any) => {
          console.log('#error', error);
          this.errorListRequest = 'No Data Found!'
          resolve(error);
        }
      }))
  }

  async onListItemClick(type: string, e:any){
    if(type=='request'){
      let data = await this.setDataRequest(e);
      console.log('Data Request:', data);
    }
    else if(type=='category'){
      let data = await this.setDetailCategory(e);
      console.log('Category:', data);
    }
  }

  setFacilityCategory(response:any): Promise<any>{
    return new Promise<any> (resolve => {
      let arrObj: FacilityCategory[] = [];
      for(let x of response){
        let time = x.facility_times;
        let arrTimes: FacilityCategoryTime[] = [];
        for(let y of time){
          let objTime: FacilityCategoryTime = {
            'ID': y.id,
            'Start Time': y.startTime,
            'End Time': y.endTime,
            'Is Active': y.isActive
          }
          arrTimes.push(objTime);
        }

        let obj: FacilityCategory = {
          'ID': x.facility.id,
          'Apartment ID': x.facility.apartmentId,
          'Category Name' : x.facility.category,
          'Category Desc' : x.facility.description,
          'Category Image' : x.facility.imageId,
          'Created Date': x.facility.createdDate,
          'Modified Date': x.facility.modifiedDate,
          'Category Time' : arrTimes,
          'Status' : x.facility.isActive
        }
        arrObj.push(obj);
      }
      resolve(arrObj);
    });
  }

  setDetailCategory (response: any): Promise<any>{
    return new Promise<any> (resolve => {
      // this.dataCategory['ID'] = response.id;
      // this.dataCategory['Apartment ID'] = response.apartmentId;
      // this.dataCategory['Category Name'] = response.category;
      // this.dataCategory['Category Desc'] = response.description;
      // this.dataCategory['Category Image'] = response.image;
      // this.dataCategory['Status'] = response.isActive? 'Active': 'In-Active';
      // this.dataCategory['Created Date'] = response.createdDate;
      // this.dataCategory['Modified Date'] = response.modifiedDate;
      resolve(this.dataCategory);
    });
  }

  setDataRequest(response: any): Promise<any>{
    return new Promise<any> (resolve => {
      // this.dataRequest['ID'] = response.id;
      // this.dataRequest['Resident Name'] = response.resident;
      // this.dataRequest['Facility ID'] = response.Facility_id;
      // this.dataRequest['Facility Category'] = response.Facility_category;
      // this.dataRequest['Book Date'] = response.FacilityDetail;
      // this.dataRequest['Book Time'] = response.FacilityDetail;
      // this.dataRequest['Status'] = response.status;
      // this.dataRequest['Request Date'] = response.request_date;
      // this.dataRequest['Assigned Name'] = response.assigned_to;
      // this.dataRequest['Assigned Date'] = response.assigned_date;
      // this.dataRequest['Completed Date'] = response.completed_date;
      // this.dataRequest['Canceled Date'] = response.cancelled_date;
      resolve(this.dataRequest);
    });
  }

  onLoadData(type:any, e:any){
    console.log("Onload Page Index: ", e);
    if(type=='category'){
      this.getFacilityAllCategory(1, 10, e, this.sortCatCol, this.sortCatDir);
    }
    else if(type=='request'){
      this.getFacilityAllRequest(1, 10, e, this.sortReqCol, this.sortReqDir);
    }
  }

  async onSortData(type:any, e:any){
    console.log("OnSort: ", e);
    let arr = await this.onSplitSortEvent(e);
    console.log(arr);
    if(type=='category'){
      this.getFacilityAllCategory(1, 10, 0, this.sortCatCol, this.sortCatDir);
    }
    else if(type=='request'){
      this.getFacilityAllRequest(1, 10, 0, this.sortReqCol, this.sortReqDir);
    }
  }

  onSplitSortEvent(e:any): Promise<any>{
    return new Promise<any> (resolve => {
      let arr = e.split(";", 2); 
      this.sortReqCol = arr[0];
      this.sortReqDir = arr[1];
      resolve(arr);
    });
  }
  
  backButton(){
    this.location.back();
  }
  
  onCloseModal(){
    this.modalClose.nativeElement.click();
  }

  onHistoryClick(){
    window.location.replace('/facility/history');
  }

  onAllRequest(){
    window.location.replace('/facility/list');
  }
}
