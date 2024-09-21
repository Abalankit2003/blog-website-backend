import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-logout-button",
  template: `
    <button type="button" class="btn btn-danger" (click)="logout()">
      Logout
    </button>
  `,
  styleUrls: ["./logout-button.component.css"],
})
export class LogoutButtonComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  logout() {
    // Implement your logout logic here
    // For example, you can clear session/local storage, redirect to login page, etc.
    console.log("Logout clicked");
  }
}
