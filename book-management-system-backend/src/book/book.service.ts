import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { DbService } from 'src/db/db.service';
import { Book } from './entities/book.entity';
import { randomUUID } from 'crypto';

@Injectable()
export class BookService {
  @Inject()
  dbService: DbService;

  async create(createBookDto: CreateBookDto) {
    const books: Book[] = await this.dbService.read();
    const book = new Book();
    book.id = randomUUID();
    book.name = createBookDto.name;
    book.author = createBookDto.author;
    book.description = createBookDto.description;
    book.cover = createBookDto.cover;
    books.push(book);
    await this.dbService.write(books);
    return book;
  }
  async update(id: string, updateBookDto: UpdateBookDto) {
    const books: Book[] = await this.dbService.read();
    const foundOne = books.find((item) => item.id === updateBookDto.id);
    if (!foundOne) {
      throw new BadRequestException('书籍不存在');
    }
    foundOne.name = updateBookDto.name;
    foundOne.author = updateBookDto.author;
    foundOne.description = updateBookDto.description;
    foundOne.cover = updateBookDto.cover;
    await this.dbService.write(books);
    return `This action updates a #${id} book`;
  }
  async remove(id: string) {
    const books: Book[] = await this.dbService.read();
    const newbooks = books.filter((item) => item.id !== id);
    await this.dbService.write(newbooks);
    return '移除成功';
  }
  async detail(id: string) {
    const books: Book[] = await this.dbService.read();
    const book = books.find((item) => item.id === id);
    if (!book) {
      throw new BadRequestException('书籍不存在');
    } else {
      return book;
    }
  }
  async list() {
    const books: Book[] = await this.dbService.read();
    return books;
  }
}
