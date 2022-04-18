import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  
  constructor(private translateService: TranslateService){
      // this language will be used as a fallback when a translation isn't found in the current language
      translateService.setDefaultLang('mk');
}
}
