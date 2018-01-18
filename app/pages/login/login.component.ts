import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { User } from "../../shared/user/user";
import { Page } from "ui/page";

import { UserService } from "../../shared/user/user.service";

@Component({
  selector: "my-app",
  providers: [UserService],
  templateUrl: 'pages/login/login.html',
  styleUrls: ['pages/login/login-common.css', 'pages/login/login.css']
})
export class LoginComponent implements OnInit {

  user: User;
  isLoggingIn = true;

  constructor (
    private userService: UserService,
    private router: Router,
    private page: Page
  ) {
      this.user = new User();
    }

  ngOnInit() {
    this.page.actionBarHidden = true;
    this.page.backgroundImage = 'res://bg_login';
  }

  submit() {
    this.isLoggingIn ? this.login() : this.signUp();
  }

  login() {
    this.userService.login(this.user)
      .subscribe(
        () => this.router.navigate(["/list"]),
        (error) => alert("Unfortunately we could not find your account.")
      );
  }

  signUp() {
    this.userService.register(this.user)
      .subscribe(
        () => {
          alert("Your account was successfully created.");
          this.toggleDisplay();
        },
        () => alert("Unfortunately we were unable to create your account.")
      );
  }

  toggleDisplay() {
    this.isLoggingIn = !this.isLoggingIn;
  }
}
