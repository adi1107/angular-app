import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AngularFirestore } from 'angularfire2/firestore';
import { AuthService } from './auth.service';
import { ActivatedRoute, Params, Router } from '@angular/router';


@Injectable()
export class DataService {
	constructor(
		public afs: AngularFirestore,
	    public authService: AuthService,
	    public router: Router
	) {}

	friends;

	getAllFriends(){
		return this.afs.collection('/friends').valueChanges();
	}

}