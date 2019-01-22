import { Component, OnInit, OnDestroy } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy{
	constructor(
		public afs: AngularFirestore,
    public authService: AuthService,
    public router: Router
	) {}

  uid: string;
  user;
  subscription1;
  subscription2;

  isAdmin: boolean = false;

  ngOnInit(){
    this.subscription1 = this.authService.isLoggedin().subscribe((user) => {
        console.log(user);
        if(user){
          this.isAdmin = true;
        }else{
          this.isAdmin = false;
        }
    });
  }

  goToFriendsList(){
    if(this.isAdmin){
      this.router.navigate(['friends-list']);
    }
  }

  signOut(){
    this.authService.logout().then(function() {
      console.log('Sign-out successful.');
    }, function(error) {
      console.log('An error happened.');
    });;
    this.router.navigate(['/login']);
  }

  signIn(){
    this.router.navigate(['/login']);
  }

  signUp(){
    this.router.navigate(['/signup']);
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
