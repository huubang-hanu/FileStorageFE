import { Component, OnInit, ViewChild, EventEmitter, Output } from '@angular/core';
import { Form } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { OverlayPanel } from 'primeng/overlaypanel';

import { SettingService } from './setting.service';
import { Setting } from './setting.model';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.css']
})
export class SettingComponent implements OnInit {
  @ViewChild('op', {static:true}) op: OverlayPanel;

  @Output() settingChange = new EventEmitter<Setting>();

  fileTypes = ['image/png','application/msword','audio/x-ms-wma','application/pdf'];


  maxFileSize: number;
  selectedType: string;
  constructor(
              private settingService: SettingService,
              private messageService: MessageService
              ) { }

  ngOnInit(): void {
    this.getSetting()
  }
  

  getSetting(){
    this.settingService.getSetting().subscribe({
      next: settingResponse => {
        this.maxFileSize = settingResponse.maxFileSize;
        this.selectedType = settingResponse.mimeTypeAllowed;
      },
      error: err => {
        console.log("Some error", err);
        
      }
    })
  }

  onSaveSetting(form: Form){
   this.settingService
        .updateSetting(
          {id: 1, 
          maxFileSize: this.maxFileSize, 
          mimeTypeAllowed: this.selectedType}
        ).subscribe({
          next: updatedSettingResp => {
            this.settingChange.emit(updatedSettingResp);
            
          },
          error: err => {
            alert(err)
          },
          complete: () =>{
            this.messageService.add({severity:'success',
                                                  summary:'Saved',
                                                  life: 1500,
                                                  detail:'Setting is saved'});
            this.op.hide();
            
          }
        })
  }

  toggleDisplay(event: any){
    this.op.toggle(event);
  }
}
