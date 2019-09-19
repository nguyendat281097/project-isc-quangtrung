import { Component, OnInit, ViewChild } from '@angular/core';
import { Librarian } from '../../models/librarian';
import { LibrarianService } from '../../services/librarian.service';
import { PnotifyService } from '../../utils/pnotify.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalDirective } from 'ngx-bootstrap';
import { FormBuilder } from '@angular/forms';
@Component({
  selector: 'app-librarian',
  templateUrl: './librarian.component.html',
  styleUrls: ['./librarian.component.scss']
})
export class LibrarianComponent implements OnInit {
  @ViewChild('editModal', { static: false }) editModal: ModalDirective;
  closeResult: string;
  librarians: [Librarian];
  librarian: Librarian = {} as Librarian;
  libForm: FormGroup;
  action: string;
  constructor(private librarianService: LibrarianService, private pnotifyService: PnotifyService, private fb: FormBuilder ) {
    this.loadDatas();
   }
    // route: lay tham so , routeService chuyen huong
  ngOnInit() {
    //
    this.librarian = {id: 0} as Librarian;
    this.loadForm();
  }
  // load form
  loadForm() {
    this.libForm = new FormGroup ({
      fullName: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      phone: new FormControl('', Validators.required),
      userName: new FormControl('',
          Validators.required),
      password: new FormControl('', Validators.required),
    });
  }

  // load list
  loadDatas() {
    this.librarianService.list().subscribe(res => {
      this.librarians = res.data;
    });
  }
  setForm() {
    this.libForm.controls['fullName'].setValue(this.librarian.fullName);
    this.libForm.controls['email'].setValue(this.librarian.email);
    this.libForm.controls['phone'].setValue(this.librarian.phone);
    this.libForm.controls['userName'].setValue(this.librarian.userName);
  }
  loadData() {
    this.librarian.fullName = this.fullName;
    this.librarian.email = this.email;
    this.librarian.phone = this.phone;
    this.librarian.userName = this.userName;
    this.librarian.password = this.password;
  }
  get fullName() { return this.libForm.get('fullName').value; }
  get email() { return this.libForm.get('email').value; }
  get phone() { return this.libForm.get('phone').value; }
  get userName() { return this.libForm.get('userName').value; }
  get password() { return this.libForm.get('password').value; }
  // save
  save() {
    this.loadData();
    this.librarianService.save(this.librarian).subscribe(( res => {
      if (res.errorCode === 0) {
        this.pnotifyService.success('Info', this.action + ' successfuly');
        this.editModal.hide();
        this.loadDatas();
        this.librarian = {} as Librarian;
      } else {
        this.pnotifyService.error('Info', res.message);
      }
    }), err => {
      this.pnotifyService.error('Info', this.action + ' failed');
    });
  }

  // delete
  delete(event, id) {
    event.preventDefault();
    this.pnotifyService.showConfirm('Warnning', 'Are you sure?', yes => {
      if (yes) {
        this.librarianService.delete(id).subscribe( res => {
          if ( res.errorCode === 0) {
            this.pnotifyService.success('Info', 'Delete susess');
            const arow = this.librarians.find(x => x.id === id);
            if (arow) {
              this.librarians.splice(this.librarians.findIndex(x => x.id === id), 1);
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
  // modals
  hideModal() {
    this.editModal.hide();
  }
  openAdd() {
    this.action = 'Add';
    this.librarian = { id: 0 } as Librarian;
    this.setForm();
    this.libForm.controls['userName'].enable();
    this.editModal.show();
  }
  openEdit(event, id) {
    event.preventDefault();
    this.action = 'Edit';
    // load data here by id, then show dialog
    this.librarianService.get(id).subscribe( res => {
      this.librarian = res.data;
      // modify form
      if (this.librarian.id > 0) {
        this.libForm.controls['userName'].disable();
        this.setForm();
      }
      this.editModal.show();
    });
  }
}
