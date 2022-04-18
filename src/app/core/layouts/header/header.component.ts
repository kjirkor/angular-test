import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  selectedLanguage: string = "MK";

  constructor(private translate: TranslateService) { }

  ngOnInit(): void {
  }

  useLanguage(language: string) {
    this.selectedLanguage = language.toUpperCase();
    this.translate.use(language);
  }

}
