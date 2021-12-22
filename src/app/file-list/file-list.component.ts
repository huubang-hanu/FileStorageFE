import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { File } from './file.model';
import { FileService } from './file.service';

@Component({
  selector: 'app-file-list',
  templateUrl: './file-list.component.html',
  styleUrls: ['./file-list.component.css'],
})
export class FileListComponent implements OnInit {
  public files: File[];

  constructor(private fileService: FileService) {}

  ngOnInit(): void {
    this.getFiles();
  }

  public getFiles(): void {
    this.fileService.getFiles().subscribe({
      next: (response: File[]) => {
        this.files = response;
        console.log(this.files);
        
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      },
    });
  }
}
