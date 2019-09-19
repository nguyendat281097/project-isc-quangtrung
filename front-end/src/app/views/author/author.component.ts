import { Component, OnInit } from '@angular/core';
import { Author } from '../../models/author';
import { AuthorService } from '../../services/author.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router, ActivatedRoute } from '@angular/router';
import { PnotifyService } from '../../utils/pnotify.service';

@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.scss']
})
export class AuthorComponent implements OnInit {
  closeResult: string;
  authors: [Author];
  author: Author;
  constructor(private authorService: AuthorService,
     private modalService: NgbModal, private routerService: Router,
      private route: ActivatedRoute, private pnotifyService: PnotifyService ) { }
    // route: lay tham so , routeService chuyen huong
  ngOnInit() {
    //
    this.author = {id: 0} as Author;
    this.loadDatas();
  }
  // load list
  loadDatas() {
    this.authorService.list().subscribe(res => {
      this.authors = res.data;
    });
  }
  // load a data
  loadData(id) {
    this.authorService.get(id).subscribe( res => {
      this.author = res.data;
    });
  }
  // save
  save() {
    this.authorService.save(this.author).subscribe(( res => {
      if (res.errorCode === 0) {
        this.modalService.dismissAll();
        this.loadDatas();
        this.author = {} as Author;
        this.pnotifyService.success('Info', 'Update susess');
      } else {
        this.pnotifyService.error('Info', 'Update failed');
      }
    }), err => {
      this.pnotifyService.error('Info', 'Update failed');
    });
  }

  // delete
  delete(id) {
    this.pnotifyService.showConfirm('Warnning', 'Are you sure?', yes => {
      if (yes) {
        this.authorService.delete(id).subscribe( res => {
          if ( res.errorCode === 0) {
            this.pnotifyService.success('Info', 'Delete susess');
            const arow = this.authors.find(x => x.id === id);
            if (arow) {
              this.authors.splice(this.authors.findIndex(x => x.id === id), 1);
            }
          } else {
            if ( res.errorCode === 200) {
              this.pnotifyService.error('Info', 'Delete failed. Data is associated with other objects.');
            } else {
              this.pnotifyService.error('Info', 'Delete failed');
            }
          }
        });
      }
    });
  }

  // show modal
  open(content, id) {
    if (id !== 0) {
      this.loadData(id);
    } else {
      this.author = {id: 0} as Author;
    }
    this.modalService.open(content);
  }
}

