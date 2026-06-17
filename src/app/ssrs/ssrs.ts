import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { SsrsService } from './ssrs.service';

@Component({
  selector: 'app-ssrs',
  standalone: true,               
  imports: [CommonModule, FormsModule],
  templateUrl: './ssrs.html',
  styleUrl: './ssrs.scss',
})
export class Ssrs {
  reportUrl: SafeResourceUrl | null = null;

  constructor(
    private ssrsService: SsrsService,
    private sanitizer: DomSanitizer,
    private cdr: ChangeDetectorRef
  ) { }

  // ngOnInit(): void {
  //   this.ssrsService.getReportConfig().subscribe(config => {

  //     // const fullUrl =
  //     //   `${config.baseUrl}` +
  //     //   `&Department=${config.defaultParams.Department}` +
  //     //   `&Year=${config.defaultParams.Year}` +
  //     //   `&rs:Command=Render` +
  //     //   `&rs:Format=HTML5`;

  //     // console.log('Full URL:', fullUrl);

  //     // this.reportUrl =
  //     //   this.sanitizer.bypassSecurityTrustResourceUrl(fullUrl);

  //     // //  IMPORTANT: resolve ExpressionChanged error
  //     const url = config.baseUrl;
      
  //     this.reportUrl =
  //     this.sanitizer.bypassSecurityTrustResourceUrl(url);
  //   });
  //   this.cdr.detectChanges();
  // }




  // reportUrl!: SafeResourceUrl;

  // constructor(private sanitizer: DomSanitizer) {
  //   this.reportUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
  //     '/assets/mock-ssrs.html'
  //   );
  // }


  ngOnInit(): void {
    this.ssrsService.getReportConfig().subscribe(config => {

      // Build dynamic URL with query params
      const url =
        `/assets/mock-ssrs.html` +
        `?Department=${config.defaultParams.Department}` +
        `&Year=${config.defaultParams.Year}`;

      // Make URL Angular-safe
      this.reportUrl =
        this.sanitizer.bypassSecurityTrustResourceUrl(url);
        this.cdr.detectChanges();
    });
  }
}