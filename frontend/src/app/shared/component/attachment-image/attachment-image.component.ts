import { Component, Input, EventEmitter, Output } from '@angular/core';
import * as FileSaver from 'file-saver';

export interface file{
  name?: any,
  size?: any,
  type?: any,
  base64?: any
}

@Component({
  selector: 'app-attachment-image',
  templateUrl: './attachment-image.component.html',
  styleUrls: ['./attachment-image.component.css']
})
export class AttachmentImageComponent {
  @Input() maxFileSize: number = 104857600;
  @Input() attachmentID?: string;
  @Input() previewWidth: string = "25vw";
  @Output() onChangeEvent = new EventEmitter<any>();
  
  acceptedFileType: string = ".png,.jpg,.jpeg";
  currentFile: any;
  isEmpty: boolean=true;
  fileUrl: any;
  base: any;
  imageFile!: file;

  // imageFileName: any;
  // imageFileSize: any;
  // imageFileType: any;
  // imageFileBase64: any;

  constructor() {}

  ngOnInit() {
    this.checkIsEmpty();
  }

  public getImageFile(){
    return this.imageFile;
  }

  async onUploadFile(e: any) {
    if(e.target.files){
      const reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = () => {
        this.base = (reader.result);
        this.imageFile.name = e.target.files[0].name;
        this.imageFile.size = e.target.files[0].size;
        this.imageFile.type = e.target.files[0].type;
        this.imageFile.base64 = this.base.substring(this.base.indexOf(';base64,') + 8);
      }
      this.isEmpty = false;
    }
  }

  async removeFile(){
    this.imageFile = {};
    this.isEmpty = true;
  }

  async checkIsEmpty(){
    if(!this.imageFile){
      this.isEmpty = true;
    }
    else{
      this.isEmpty = false;
    }
  }
}
