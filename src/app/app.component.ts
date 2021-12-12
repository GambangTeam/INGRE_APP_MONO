import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'final-project';


  isLoggedIn(): boolean {
    return ((sessionStorage.getItem('token') && sessionStorage.getItem('username') && sessionStorage.getItem('kodeKey')) !== null)
  }

  sidebar = false


  toggleSidebar() {
    console.log(this.sidebar)
    this.sidebar = !this.sidebar
  }
}
