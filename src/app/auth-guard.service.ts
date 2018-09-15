import { CanActivate, Router } from "@angular/router";
import { AuthService } from "./auth/auth.service";
import { Injectable } from "@angular/core";
@Injectable()
export class AuthGuardService implements CanActivate{
    constructor(private authService: AuthService, private router: Router) {}

    canActivate(): boolean {
        if (this.authService.isConnected()) {
            console.log('ok')

            return true;

        }
        else {
            confirm('you dont have permission to access')
            this.router.navigate(['/home'])
            return false
        }
    }
 }