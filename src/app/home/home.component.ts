import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { Observable } from 'rxjs-compat';
import { map } from 'rxjs-compat/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
	items: Observable<any[]>;
	afs:AngularFirestore;
	db: AngularFireDatabaseModule;

	constructor(
		afs: AngularFirestore,
		db: AngularFireDatabaseModule
	) {
		this.afs = afs;
	    // this.items = db.collection('/groups').valueChanges();
	    this.db = db;
	}

	ngOnInit(){
		console.log(this.afs);
		console.log(this.db);
	}
}
