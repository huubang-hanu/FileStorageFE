import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from "@angular/common/http";

import { AppComponent } from './app.component';
import { FileListComponent } from './file-list/file-list.component';
import { NavigationComponent } from './navigation/navigation.component';
import { FileSizePipe } from './share/file-size.pipe';
import { NgxPaginationModule } from "ngx-pagination";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { FileUploadModule } from "primeng/fileupload";
import { SettingComponent } from './setting/setting.component';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { TooltipModule } from 'primeng/tooltip';
import {InputNumberModule} from 'primeng/inputnumber';
import {ToastModule} from "primeng/toast";
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ConfirmationService, MessageService } from 'primeng/api';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
    FileListComponent,
    NavigationComponent,
    FileSizePipe,
    SettingComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgxPaginationModule,
    BrowserAnimationsModule,
    FileUploadModule,
    OverlayPanelModule,
    TooltipModule,
    InputNumberModule,
    ToastModule,
    ConfirmPopupModule,
    FormsModule
  ],
  providers: [MessageService, ConfirmationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
