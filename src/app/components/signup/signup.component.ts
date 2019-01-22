import { Component, OnInit, ViewEncapsulation, OnDestroy } from '@angular/core';
import { AngularFireAuthModule  } from 'angularfire2/auth';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class SignupComponent implements OnInit, OnDestroy{
	error: any;
    constructor(
    	public af: AngularFireAuth,
    	private router: Router,
    	public authService: AuthService,
    	public snackBar: MatSnackBar
    ){
    	console.log(this.af);
	}

	name: string;
	designation: string;
	phone_number: number;
	email: string;
	pass: string;

	subscription1;
	subscription2;

	ngOnInit(){
		this.subscription1 = this.authService.isLoggedin().subscribe((user) => {
			if(user){
				this.router.navigate(['/home']);
			}
		});
	}

	signUp(){
		if(!this.validateFields()){
			return false;
		}
		this.subscription2 = this.authService.isLoggedin().subscribe((user) => {
			if(!user){
				this.authService.signup(this.email, this.pass).then(
					(res) => {
						console.log(res);
						let req = {
							name: this.name,
							designation: this.designation,
							phone_number: this.phone_number,
							email: this.email,
							uid: res.user.uid
						}
					}).catch(
					(err) => {
						console.log(err);
						this.error = err;
					})
			}else{
				console.log('user already logged in..');
			}
		});
	}

	validateFields(){
		if(!this.email || !this.pass || !this.name || !this.designation || !this.phone_number){
			this.snackBar.open('Please enter all fields', 'Close', {
	            duration: 4000,
	        });
	        return false;
		}else if(!this.email.includes(".com")){
			this.snackBar.open('Enter your valid email', 'Close', {
	            duration: 4000,
	        });
	        return false;
		}
		return true;
	}

	ngOnDestroy(){
		if(this.subscription1){
	      this.subscription1.unsubscribe();
	    }
	    if(this.subscription2){
	      this.subscription2.unsubscribe();
	    }
	}
}
