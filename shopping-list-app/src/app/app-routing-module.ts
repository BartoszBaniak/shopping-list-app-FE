import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { RegisterPageComponent } from "./components/register-page/register-page.component";
import { LoginPageComponent } from "./components/login-page/login-page.component";

const routes: Routes = [
    { 
        path: 'register', 
        component: RegisterPageComponent
    },
    {
        path: 'login',
        component: LoginPageComponent
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }