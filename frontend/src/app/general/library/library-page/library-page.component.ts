import { Breadcrumbs } from './../../../shared/component/breadcrumb/breadcrumb.component';
import { RadioButtonItems } from './../../../shared/component/radio-button/radio-button.component';
import { listItems } from './../../../shared/component/dropdown/dropdown.component';
import { CheckboxListItems } from 'src/app/shared/component/checkbox-list/checkbox-list.component';
import { Component, OnInit } from '@angular/core';
import { Column } from 'src/app/shared/component/table/table.component';
import * as XLSX from 'xlsx';

export interface object1 {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

@Component({
  selector: 'app-library-page',
  templateUrl: './library-page.component.html',
  styleUrls: ['./library-page.component.css']
})
export class LibraryPageComponent implements OnInit{
  exampleCheckbox1: CheckboxListItems[] = [];
  exampleCheckbox2: CheckboxListItems[] = [];
  exampleRadioButton1: RadioButtonItems[] = [];
  exampleRadioButton2: RadioButtonItems[] = [];
  exampleDropdown: listItems[] = [
    {code:"Drop1", value:"Value1"},
    {code:"Drop2", value:"Value2"},
    {code:"Drop3", value:"Value3"}];
  dataChecked?: string;
  dataRadioChecked?: string;
  selectedDropdown?: string;
  rowValue?: any;
  rangeValue?: any;
  flagAlert1?: boolean = false;
  flagAlert2?: boolean = false;
  flagAlert3?: boolean = false;
  flagAlert4?: boolean = false;
  flagAlert5?: boolean = false;

  data: object1[] = [];
  col1: Column[] = [];
  col2: Column[] = [];
  col3: Column[] = [];
  breadcrumbs: Breadcrumbs[] = [];

  ngOnInit(): void {
    this.exampleCheckbox1 = [{name: "Vertical1", checked: true}, {name: "Vertical2"}, {name: "Vertical3"}];
    this.exampleCheckbox2 = [{name: "Horizontal1", checked:true}, {name: "Horizontal2"}, {name: "Horizontal3"}];
    this.exampleRadioButton1 = [{name: "Vertical1"}, {name: "Vertical2"}, {name: "Vertical3"}];
    this.exampleRadioButton2 = [{name: "Horizontal1", checked:true}, {name: "Horizontal2"}, {name: "Horizontal3"}];
    this.breadcrumbs = [{name: "Page 1"}, {name: "Page 2"}, {name: "Page 3"}]

    this.data = [
      {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
      {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
      {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
      {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
      {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
      {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
      {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
      {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
      {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
      {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
    ]

    this.col1 = [{name:"position", displayName:"No. ", align:"center"}, {name:"name", displayName:"Name"}, {name:"Jabatan", displayName:"Jabatan"}, {name:"symbol", displayName:"Symbol"}, {name:"Company", displayName:"Company"}, {name:"weight", displayName:"Weight"}];
    this.col2 = [{name:"position", displayName:"No. ", align:"center"}, {name:"name", displayName:"Name"}, {name:"symbol", displayName:"Symbol"}, {name:"weight", displayName:"Weight"}, {name:"ActionCol", displayName:"Action", align:"center"}];
    this.col3 = [{name:"ActionCol", displayName:"Action", align:"center"}, {name:"name", displayName:"Name"}, {name:"symbol", displayName:"Symbol"}, {name:"weight", displayName:"Weight"}];
  }

  onShowAlert(e:any){
    if(e===1){
      this.flagAlert1 = true;
      setTimeout(() => {
        this.flagAlert1 = false;
      }, 5000);
    }
    else if(e===2){
      this.flagAlert2 = true;
      setTimeout(() => {
        this.flagAlert2 = false;
      }, 5000);
    }
    else if(e===3){
      this.flagAlert3 = true;
      setTimeout(() => {
        this.flagAlert3 = false;
      }, 5000);
    }
    else if(e===4){
      this.flagAlert4 = true;
      setTimeout(() => {
        this.flagAlert4 = false;
      }, 5000);
    }
    else if(e===5){
      this.flagAlert5 = true;
      setTimeout(() => {
        this.flagAlert5 = false;
      }, 5000);
    }
  }

  onButtonClick(){
    alert('Button Clicked');
  }

  onCheckboxListChange(e:any){
    this.dataChecked = e;
    // alert(e);
  }

  onRadioButtonChange(e:any){
    this.dataRadioChecked = e;
    // alert(e);
  }

  onDropdownValue(e:any){
    this.selectedDropdown = e;
  }

  OnRowClick(e:any){
    const entries = Object.entries(e);
    this.rowValue = entries;
  }

  onRangeValue(e:any){
    this.rangeValue = e;
    // console.log(this.rangeValue);
  }

  onSwitch(e:any){
    // console.log(e);
    if(e){
      alert('Toggle On!');
    }
    else{
      alert('Toggle Off!');
    }
  }

  jsonResponse = '[{"name": "John", "age": 30}, {"name": "Jane", "age": 25}]';
  dataConvert = Object.entries(this.data);

  exportToExcel() {
    const data = JSON.parse(this.jsonResponse);
    const columns = this.getColumns(data);
    const worksheet = XLSX.utils.json_to_sheet(data, { header: columns });
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
    XLSX.writeFile(workbook, 'data.xlsx');
  }

  getColumns(data: any[]): string[] {
    const columns: string[] = [];
    data.forEach(row => {
      Object.keys(row).forEach(col => {
        if (!columns.includes(col)) {
          columns.push(col);
        }
      });
    });
    return columns;
  }
}
