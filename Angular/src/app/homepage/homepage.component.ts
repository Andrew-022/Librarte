import { Component } from '@angular/core';
import {NavbarComponent} from "../navbar/navbar.component";
import {SearchComponent} from "../search/search.component";
import {RouterOutlet} from "@angular/router";

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [
    NavbarComponent,
    SearchComponent,
    RouterOutlet
  ],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})
export class HomepageComponent {

}
