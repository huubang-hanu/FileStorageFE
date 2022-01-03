import { HttpErrorResponse, HttpEvent, HttpEventType } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { CustomeFile } from './file.model';
import { FileService } from './file.service';
import { saveAs } from 'file-saver';
import { SettingComponent } from '../setting/setting.component';
import {ConfirmationService, MessageService } from 'primeng/api';
import { FileUpload } from 'primeng/fileupload';
import { SettingService } from '../setting/setting.service';
import { Setting } from '../setting/setting.model';


@Component({
  selector: 'app-file-list',
  templateUrl: './file-list.component.html',
  styleUrls: ['./file-list.component.css'],
})
export class FileListComponent implements OnInit {
  
  @ViewChild('appSetting', {static:true}) appSetting: SettingComponent;
  @ViewChild('fileUpload', {static:true}) fileUpload: FileUpload;
  maxFileSize: number;
  fileTypeAllowed: string;

  public files: CustomeFile[];
  currentPg: number = 1;
  noItems: number =4;
  fileStatus={
    status:'',
    requestType: '',
    percent: 0
  };



  constructor(private fileService: FileService, 
              private messageService: MessageService,
              private confirmationService: ConfirmationService,
              private settingService: SettingService ) {}

  ngOnInit(): void {
    this.getFiles();
    this.getSetting();
  }

  public getFiles(): void {
    this.fileService.getFiles().subscribe({
      next: (response: CustomeFile[]) => {
        if(response.length > 0){
          this.files = response.slice()
                                .reverse()
                                .filter(file => file.numberOfVersion >=1);
          this.files.map(file =>{
                                  file.fileVersions.sort((version1, version2) => version1.id - version2.id)
                                });
            
        }
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      },
    });
  }

  getSetting(){
    this.settingService.getSetting().subscribe({
      next: resp => {
        this.maxFileSize = resp.maxFileSize * 1000000;
        this.fileTypeAllowed = resp.mimeTypeAllowed;
        console.log("Setting",resp);
        
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      },
    })
  }
  
  onSettingChange(setting: Setting){
      this.maxFileSize = setting.maxFileSize * 1000000;
      this.fileTypeAllowed = setting.mimeTypeAllowed;
    
  }

  onDeleteFile(filename: string, fileVersionId:number){
    this.fileService.deleteFile(filename, fileVersionId)
                    .subscribe({
                      next: data =>{
                        this.getFiles()
                      },
                      error: (error: HttpErrorResponse) =>{
                        alert(error.message);
                      },
                      complete: ()=>{
                        this.messageService.add({severity:'info',
                                                  summary:'Confirmed',
                                                  life: 1500,
                                                  detail:'Delete file success'})
                      }
                    })
  }

  uploadFileHandler(event: any){
    const files: File[] = event.files;
    const formData = new FormData();
    if(files && files.length > 0){

      formData.append('file', files[0], files[0].name);
      this.fileService.uploadFile(formData)
                      .subscribe({
                        next : event => {
                          this.getFiles();
                        },
                        error: (err: HttpErrorResponse) => {
                          console.log(err);
                        },
                        complete: () =>{
                          this.fileUpload.clear()
                          this.messageService.add({severity:'success',
                                                  summary:'Success',
                                                  life: 1500,
                                                  detail:'Upload file success'})
                        }
                      });
    }
  }


  onConfirmDelete(event: Event, filename: string, versionId: number){
    this.confirmationService.confirm({
      target: event.target!,
      message: "Do you want to delete this file version ?",
      icon: 'pi pi-exclamation-triangle',
      accept: () =>{
        this.onDeleteFile(filename, versionId)
      },
      reject: () =>{
        this.messageService.add({severity:'error',
                                                  summary:'Rejected',
                                                  life: 1500,
                                                  detail:'You have rejected'})
      }
    })
  }

  onDownloadFile(filename: string, fileVersionId: number): void{

   this.fileService.downloadFile(filename, fileVersionId)
                    .subscribe({
                      next : event => {
                        this.resportProgress(event);
                        this.getFiles();
                      },
                      error: (err: HttpErrorResponse) => {
                        console.log(err);
                      }
                    });
    
  }

  private resportProgress(httpEvent: HttpEvent<string | Blob>): void {
    switch(httpEvent.type) {
      case HttpEventType.Response:
        if (httpEvent.headers.get('File-Name')) {
          saveAs(new File([httpEvent.body!], httpEvent.headers.get('File-Name')!, 
          {type: `${httpEvent.headers.get('Content-Type')};charset=utf-8`}));
        }
        break;
      default:
        console.log(httpEvent);
        break;
      
    }
  }


  inc(){
    if(this.noItems < this.files.length)
      this.noItems +=1;
  }

  dec(){
    if(this.noItems > 1)
      this.noItems -=1
  }

  toggleSetting(event: any){
    this.appSetting.toggleDisplay(event);
  }
}
