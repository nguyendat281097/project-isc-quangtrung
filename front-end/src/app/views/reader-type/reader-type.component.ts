import { Component, OnInit } from '@angular/core';
import { ReaderType } from '../../models/reader-type';
import { ReaderTypeservice } from '../../services/reader-type.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PnotifyService } from '../../utils/pnotify.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-reader-type',
  templateUrl: './reader-type.component.html',
  styleUrls: ['./reader-type.component.scss']
})
export class ReaderTypeComponent implements OnInit {
  closeResult: string;
  readerTypes: [ReaderType];
  readerType: ReaderType;
  constructor(private readerTypeService: ReaderTypeservice,
     private modalService: NgbModal, private routerService: Router,
      private route: ActivatedRoute, private pnotifyService: PnotifyService ) { }
    // route: lay tham so , routeService chuyen huong
  ngOnInit() {
    //
    this.readerType = {id: ''} as ReaderType;
    this.loadDatas();
  }
  // load list
  loadDatas() {
    this.readerTypeService.list().subscribe(res => {
      this.readerTypes = res.data;
    });
  }
  // load a data
  loadData(id) {
    this.readerTypeService.get(id).subscribe( res => {
      this.readerType = res.data;
    });
  }
  // save
  save() {
    this.readerTypeService.get(this.readerType.id).subscribe( res => {
      console.log(res);
      if ( res.errorCode === 0) {
        this.readerTypeService.put(this.readerType).subscribe( (resPut => {
          if (resPut.errorCode === 0) {
            this.modalService.dismissAll();
            this.loadDatas();
            this.readerType = {} as ReaderType;
            this.pnotifyService.success('Info', 'Update susess');
          } else {
            this.pnotifyService.error('Info', 'Update failed');
          }
        }), err => {
          this.pnotifyService.error('Info', 'Update failed');
        });
      } else {
        console.log( res.errorCode );
        this.readerTypeService.post(this.readerType).subscribe( (resPost => {
          if (resPost.errorCode === 0) {
            this.modalService.dismissAll();
            this.loadDatas();
            this.readerType = {} as ReaderType;
            this.pnotifyService.success('Info', 'Update susess');
          } else {
            this.pnotifyService.error('Info', 'Update failed');
          }
        }), err => {
          this.pnotifyService.error('Info', 'Update failed');
        });
      }
    });
  }

  // delete
  delete(id) {
    this.pnotifyService.showConfirm('Warnning', 'Are you sure?', yes => {
      if (yes) {
        this.readerTypeService.delete(id).subscribe( res => {
          if ( res.errorCode === 0) {
            this.pnotifyService.success('Info', 'Delete susess');
            const arow = this.readerTypes.find(x => x.id === id);
            if (arow) {
              this.readerTypes.splice(this.readerTypes.findIndex(x => x.id === id), 1);
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
    if (id !== '') {
      this.loadData(id);
    } else {
      this.readerType = {id} as ReaderType;
    }
    this.modalService.open(content);
  }
}
