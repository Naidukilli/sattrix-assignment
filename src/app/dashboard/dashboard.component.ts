import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";

import { AuthService, DashboardRegister } from "../auth.service";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
})
export class DashboardComponent implements OnInit {
  activeItem = "register";
  registerForm: FormGroup = {} as FormGroup;
  userList: DashboardRegister = {} as DashboardRegister;
  isLoading = false;
  errorMessage: string = "";

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.activatedRoute.queryParams.subscribe((params: any) => {
      if (params?.type) {
        this.activeItem = params?.type;
      }
      if (this.activeItem === "list") {
        this.getList();
      }
    });
  }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      name: ["", Validators.required],
      email: ["", Validators.required],
      phone: ["", Validators.required],
      city: ["", Validators.required],
    });
  }

  onSubmitRegister() {
    if (this.registerForm.invalid) {
      return;
    }

    this.isLoading = true;
    this.errorMessage = "";
    const name = this.registerForm.controls["name"].value;
    const email = this.registerForm.controls["email"].value;
    const phone = this.registerForm.controls["phone"].value;
    const city = this.registerForm.controls["city"].value;

    const payload = { name, email, phone, city };
    this.authService.dashboardRegister(payload).subscribe(
      (response) => {
        this.isLoading = false;
        this.router.navigate(["dashboard"], { queryParams: { type: "list" } });
      },
      (error) => {
        this.isLoading = false;
        this.errorMessage = error.message;
      }
    );
  }

  getList() {
    this.authService.getList().subscribe(
      (response) => {
        this.userList = response;
      },
      (error) => {
        this.errorMessage = error.message;
      }
    );
  }

  edit() {
    this.getList();
    this.router.navigate(["dashboard"], {
      queryParams: { type: "register" },
    });
  }

  delete() {
    this.authService.deleteUserData().subscribe(
      (response) => {
        this.getList();
        this.router.navigate(["dashboard"], {
          queryParams: { type: "register" },
        });
      },
      (error) => {
        this.isLoading = false;
        this.errorMessage = error.message;
      }
    );
  }
}
