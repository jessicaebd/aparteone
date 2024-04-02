import { Input, Component, Output, EventEmitter } from '@angular/core';
import * as FileSaver from 'file-saver';

export interface file{
  id?: any,
  attachment_id?: any, 
  name: any,
  size: any,
  type: any,
  base64: any
}

@Component({
  selector: 'app-attachment',
  templateUrl: './attachment.component.html',
  styleUrls: ['./attachment.component.css']
})
export class AttachmentComponent {
  // @Input() uploadedFiles: any[] = [];
  // @Input() disabled: boolean = true;
  // @Input() isViewOnly: boolean = false;
  
  @Input() acceptedFileType: string = ".xls,.xlsx,.pdf,.mp4,.doc,.docx,.zip";
  @Input() fileLimit: number = 10;
  @Input() maxFileSize: number = 104857600;
  index: any;
  isEmpty: boolean=true;
  
  listFile: file[] = [];
  
  @Output() onChangeEvent = new EventEmitter<any>();
  
  fileUrl: any;
  base: any;

  constructor() {}

  ngOnInit() {
    this.index = this.listFile.length;
    this.checkIsEmpty();
  }

  public getListFiles(){
    return this.listFile;
  }

  async onUploadFile(e: any) {
    if(e.target.files){
      console.log('Target Files Length: ', e.target.files.length);

      for(let i=0; i<e.target.files.length; i++){
        const reader = new FileReader();
        reader.readAsDataURL(e.target.files[i]);
        reader.onload = () => {
          this.base = (reader.result);
          console.log('Loop Index: ', this.index);
          this.listFile.push({
            id: this.index,
            name: e.target.files[i].name,
            size: e.target.files[i].size,
            type: e.target.files[i].type,
            base64: this.base.substring(this.base.indexOf(';base64,') + 8)
          });
          this.index++;
        }
      };
      this.isEmpty = false;
    }
    console.log(this.listFile);
  }

  public base64toBlob(base64Data:string, contentType:any): Blob {
    contentType = contentType || '';
    const sliceSize = 1024;
    const byteCharacters = window.atob(base64Data);
    const bytesLength = byteCharacters.length;
    const slicesCount = Math.ceil(bytesLength / sliceSize);
    const byteArrays = new Array(slicesCount);

    for (let sliceIndex = 0; sliceIndex < slicesCount; ++sliceIndex) {
      const begin = sliceIndex * sliceSize;
      const end = Math.min(begin + sliceSize, bytesLength);

      const bytes = new Array(end - begin);
      for (let offset = begin, i = 0; offset < end; ++i, ++offset) {
        bytes[i] = byteCharacters[offset].charCodeAt(0);
      }
      byteArrays[sliceIndex] = new Uint8Array(bytes);
    }
    return new Blob(byteArrays, { type: contentType });
  }

  downloadFile(id: any){
    const blob = this.base64toBlob(this.listFile[id].base64, this.listFile[id].type);
    FileSaver.saveAs(blob, this.listFile[id].name);
  }

  async removeFile(id:any){
    this.listFile.splice(id, 1);
    await this.checkIsEmpty();
    console.log(this.listFile);
  }

  async checkIsEmpty(){
    console.log('Length: ', this.listFile.length);
    if(this.listFile.length==0){
      this.isEmpty = true;
    }
    else{
      this.isEmpty = false;
    }
  }
}