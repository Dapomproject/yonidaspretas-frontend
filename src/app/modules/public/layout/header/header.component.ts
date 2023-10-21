import { Component, OnInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  scrollPosition: any;

  constructor(
    private renderer: Renderer2
  ) { }

  ngOnInit(): void {
    this.renderer.listen(window, 'scroll', ($event) => {
      this.scrollPosition = window.scrollY;
    });
  }

}
