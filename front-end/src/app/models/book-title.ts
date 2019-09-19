import { Author } from './author';
import { Subject } from './subject';

export interface BookTitle {
    id: number;
    bookTitleName: string;
    edition: string;
    page: number;
    size: number;
    publishingInfo: string;
    callNumber: string;
    ISBN: string;
    description: string;
    image: string;
    authors: [Author];
    subjects: [Subject];
}
