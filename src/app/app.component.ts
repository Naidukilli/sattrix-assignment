import { Component } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { AuthService } from "./auth.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  title = "assignment";
  constructor(
    private router: Router,
    private authService: AuthService,
  ) {}
  logout() {
    this.authService.deleteUserData().subscribe((response) => {
      this.router.navigate([""]);
    });
  }
}
