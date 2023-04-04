import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, of } from "rxjs";
export interface Login {
  username: string;
  password: string;
}
export interface Register {
  username: string;
  email: string;
  password: string;
  confirmpassword: string;
}
export interface DashboardRegister {
  name: string;
  email: string;
  phone: string;
  city: string;
}
@Injectable({
  providedIn: "root",
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(payload: Login): Observable<boolean> {
    sessionStorage.setItem("username", payload.username);
    sessionStorage.setItem("token", payload.password);
    return of(true);
  }

  logout(): Observable<boolean> {
    sessionStorage.removeItem("username");
    sessionStorage.removeItem("email");
    sessionStorage.removeItem("phone");
    sessionStorage.removeItem("city");
    sessionStorage.removeItem("token");
    return of(true);
  }

  register(payload: Register): Observable<boolean> {
    sessionStorage.setItem("username", payload.username);
    sessionStorage.setItem("email", payload.email);
    sessionStorage.setItem("token", payload.password);
    return of(true);
  }

  dashboardRegister(payload: DashboardRegister): Observable<boolean> {
    sessionStorage.setItem("username", payload.name);
    sessionStorage.setItem("email", payload.email);
    sessionStorage.setItem("phone", payload.phone);
    sessionStorage.setItem("city", payload.city);
    return of(true);
  }

  getList(): Observable<any> {
    const name = sessionStorage.getItem("username");
    const email = sessionStorage.getItem("email");
    const phone = sessionStorage.getItem("phone");
    const city = sessionStorage.getItem("city");
    return of({ name, email, phone, city });
  }

  deleteUserData(): Observable<boolean> {
    sessionStorage.removeItem("username");
    sessionStorage.removeItem("email");
    sessionStorage.removeItem("phone");
    sessionStorage.removeItem("city");
    return of(true);
  }
}
