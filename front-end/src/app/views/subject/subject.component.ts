import { Component, OnInit } from '@angular/core';
import { Subject } from '../../models/subject';
import { SubjectService } from '../../services/subject.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router, ActivatedRoute } from '@angular/router';
import { PnotifyService } from '../../utils/pnotify.service';

@Component({
  selector: 'app-subject',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.scss']
})
export class SubjectComponent implements OnInit {
  closeResult: string;
  subjects: [Subject];
  subject: Subject;
  constructor(private subjectService: SubjectService,
     private modalService: NgbModal, private routerService: Router,
      private route: ActivatedRoute, private pnotifyService: PnotifyService ) { }
    // route: lay tham so , routeService chuyen huong
  ngOnInit() {
    //
    this.subject = {id: 0} as Subject;
    this.loadDatas();
  }
  // load list
  loadDatas() {
    this.subjectService.list().subscribe(res => {
      this.subjects = res.data;
    });
  }
  // load a data
  loadData(id) {
    this.subjectService.get(id).subscribe( res => {
      this.subject = res.data;
    });
  }
  // save
  save() {
    this.subjectService.save(this.subject).subscribe(( res => {
      if (res.errorCode === 0) {
        this.modalService.dismissAll();
        this.loadDatas();
        this.subject = {} as Subject;
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
        this.subjectService.delete(id).subscribe( res => {
          if ( res.errorCode === 0) {
            this.pnotifyService.success('Info', 'Delete susess');
            const arow = this.subjects.find(x => x.id === id);
            if (arow) {
              this.subjects.splice(this.subjects.findIndex(x => x.id === id), 1);
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
      this.subject = {id: 0} as Subject;
    }
    this.modalService.open(content);
  }
}
