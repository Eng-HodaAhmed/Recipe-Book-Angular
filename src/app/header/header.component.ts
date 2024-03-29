import { Component, EventEmitter, OnDestroy, OnInit, Output } from "@angular/core";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { Subscription,map } from "rxjs";
import { AuthService } from "../auth/auth.service";
import { DataStorageService } from "../shared/data-storage.service";
import { AppState } from "../store/app.reducer";

@Component({
    selector:"app-header",
    templateUrl:"header.component.html"

})
export class HeaderComponent implements OnInit,OnDestroy{
    constructor(private dataStorage:DataStorageService,private authService:AuthService,
        private store:Store<AppState>,private router:Router){}
    authsub:Subscription;
    isAuthenticated=false;
    ngOnInit(): void {
       //this.authsub=this.authService.user.subscribe(user=>{
        this.authsub=this.store.select('auth').pipe(map(authState=>{
        return authState.user}))
        .subscribe(user=>{
            this.isAuthenticated=!!user;
        })
    }
    ngOnDestroy(): void {
        this.authsub.unsubscribe();
    }
   onSaveData(){
    this.dataStorage.storeData()
   }
   onFechData(){
    this.dataStorage.fechRecipes().subscribe()
   }
   onLogOut(){
    this.authService.logOut();
    this.router.navigate(['/auth'])

   }

}