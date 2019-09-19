import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { BookTitle } from '../../models/book-title';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { BookTitleService } from '../../services/book-title.service';
import { PnotifyService } from '../../utils/pnotify.service';
import { Subject } from '../../models/subject';
import { Author } from '../../models/author';
import { AuthorService } from '../../services/author.service';
import { SubjectService } from '../../services/subject.service';
import { Book } from '../../models/book';
import { BookService } from '../../services/book.service';
import { Page } from '../../models/page';

@Component({
  selector: 'app-book-title',
  templateUrl: './book-title.component.html',
  styleUrls: ['./book-title.component.scss']
})
export class BookTitleComponent implements OnInit {
  @ViewChild('editModal', { static: false }) editModal: ModalDirective;
  @ViewChild('detailModal', { static: false }) detailModal: ModalDirective;

  // collapse
  isDescripton = true;
  isAuthors = true;
  isSubjects = true;
  isBooks = true;

  closeResult: string;
  bookTitles: [BookTitle];
  bookTitle: BookTitle = {} as BookTitle;
  bookTForm: FormGroup;
  action: string;

  subjects: [Subject];
  subject: Subject = {} as Subject;
  authors: [Author];
  author: Author = {} as Author;

  books: [Book];
  book: Book = {} as Book;

  page: Page = { pageNumber: 0, pageSize: 5} as Page;
  constructor(private bookTitleService: BookTitleService, private pnotifyService: PnotifyService,
    private fb: FormBuilder, private authorService: AuthorService,
    private subjectService: SubjectService, private bookService: BookService ) {
    this.loadDatas();
   }
    // route: lay tham so , routeService chuyen huong
  ngOnInit() {
    //
    this.bookTitle = {id: 0} as BookTitle;
    this.loadForm();
  }
  // load form
  loadForm() {
    this.bookTForm = this.fb.group ({
      bookTitleName: ['', Validators.required],
      edition:  ['', Validators.required],
      page: ['', Validators.required],
      size:  ['', Validators.required],
      publishingInfo:  ['', Validators.required],
      callNumber:  ['', Validators.required],
      ISBN:  ['', Validators.required],
      description:  ['', Validators.required],
      image:  ['', Validators.required],
      authors: this.fb.group({
        authorName:  ['', Validators.required],
      }),
      subjects: this.fb.group ({
        subjectName:  ['', Validators.required],
      })
    });
  }

  // load list
  loadDatas(page = null) {
    if ( page != null) {
      this.page.pageNumber = page.offset;
    }
    this.bookTitleService.list(this.page).subscribe(res => {
      this.bookTitles = res.data;
      this.bookTitles.forEach(element => {
        this.authorService.getByBookTitle(element.id).subscribe(resA => {
          element.authors = resA.data;
        });
        this.subjectService.getByBookTitle(element.id).subscribe(resS => {
          element.subjects = resS.data;
        });
      });
    });
  }
  loadData(id) {
    this.bookTitleService.get(id).subscribe( res => {
      this.bookTitle = res.data;
      this.authorService.getByBookTitle(id).subscribe( resA => {
        this.bookTitle.authors = resA.data;
        this.authors = resA.data;
      });
      this.subjectService.getByBookTitle(id).subscribe( resT => {
        this.bookTitle.subjects = resT.data;
        this.subjects = resT.data;
      });
    });
  }
  setForm() {
    this.bookTForm.controls['bookTitleName'].setValue(this.bookTitle.bookTitleName);
    this.bookTForm.controls['edition'].setValue(this.bookTitle.edition);
    this.bookTForm.controls['page'].setValue(this.bookTitle.page);
    this.bookTForm.controls['size'].setValue(this.bookTitle.size);
    this.bookTForm.controls['publishingInfo'].setValue(this.bookTitle.publishingInfo);
    this.bookTForm.controls['callNumber'].setValue(this.bookTitle.callNumber);
    this.bookTForm.controls['ISBN'].setValue(this.bookTitle.ISBN);
    this.bookTForm.controls['description'].setValue(this.bookTitle.description);
    this.bookTForm.controls['image'].setValue(this.bookTitle.image);
  }
  getDataForm() {
    this.bookTitle.bookTitleName = this.bookTitleName;
    this.bookTitle.edition = this.edition;
    this.bookTitle.page = this.bookTForm.get('page').value;
    this.bookTitle.size = this.size;
    this.bookTitle.publishingInfo = this.publishingInfo;
    this.bookTitle.callNumber = this.callNumber;
    this.bookTitle.ISBN = this.ISBN;
    this.bookTitle.description = this.description;
    this.bookTitle.image = this.image;
  }
  get bookTitleName() { return this.bookTForm.get('bookTitleName').value; }
  get edition() { return this.bookTForm.get('edition').value; }
  get size() { return this.bookTForm.get('size').value; }
  get publishingInfo() { return this.bookTForm.get('publishingInfo').value; }
  get callNumber() { return this.bookTForm.get('callNumber').value; }
  get ISBN() { return this.bookTForm.get('ISBN').value; }
  get description() { return this.bookTForm.get('description').value; }
  get image() { return this.bookTForm.get('image').value; }
  // save
  save() {
    this.getDataForm();
    this.bookTitleService.save(this.bookTitle).subscribe(( res => {
      if (res.errorCode === 0) {
        this.pnotifyService.success('Info', this.action + ' successfuly');
        this.editModal.hide();
        this.loadDatas();
        this.bookTitle = {} as BookTitle;
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
        this.bookTitleService.delete(id).subscribe( res => {
          if ( res.errorCode === 0) {
            this.pnotifyService.success('Info', 'Delete susess');
            const arow = this.bookTitles.find(x => x.id === id);
            if (arow) {
              this.bookTitles.splice(this.bookTitles.findIndex(x => x.id === id), 1);
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

  addAuthor() {
    this.author.id = 0;
    this.author.BOT_ID = this.bookTitle.id;
    this.author.authorName = this.bookTForm.get('authors').get('authorName').value;
    this.authorService.save(this.author).subscribe( res => {
      this.loadData(this.bookTitle.id);
      this.loadDatas();
      this.bookTForm.reset();
    });
  }

  addSubject() {
    this.subject.id = 0;
    this.subject.BOT_ID = this.bookTitle.id;
    this.subject.subjectName = this.bookTForm.get('subjects').get('subjectName').value;
    this.subjectService.save(this.subject).subscribe( res => {
      this.loadData(this.bookTitle.id);
      this.loadDatas();
      this.bookTForm.reset();
    });
  }

  listBook() {
    this.bookService.getByBookTitle(this.bookTitle.id).subscribe(resS => {
      this.books = resS.data;
    });
  }
  // collapse
  showCollapse(event) {
    event.preventDefault();
  }

  // modals
  hideModal() {
    this.isDescripton = true;
    this.isAuthors = true;
    this.isSubjects = true;
    this.isBooks = true;
    this.editModal.hide();
    this.detailModal.hide();
  }
  openDetail(event, id) {
    event.preventDefault();
    this.action = 'Detail';
    this.bookTitle = { id: 0 } as BookTitle;
    this.loadData(id);
    this.detailModal.show();
  }
  openAdd() {
    this.action = 'Add';
    this.bookTitle = { id: 0 } as BookTitle;
    this.setForm();
    this.editModal.show();
  }
  openEdit(event, id) {
    event.preventDefault();
    this.action = 'Edit';
    // load data here by id, then show dialog
    this.bookTitleService.get(id).subscribe( res => {
      this.bookTitle = res.data;
      // modify form
      this.setForm();
      this.editModal.show();
    });
  }


}
