import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  BadRequestException,
  UploadedFile,
} from '@nestjs/common';
import { BookService } from './book.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { storage } from './file-storage';

@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: storage,
      limits: {
        fileSize: 1024 * 1024 * 5,
      },
      fileFilter(req, file, callback) {
        if (file.mimetype.match(/\/(jpg|jpeg|png|gif)$/)) {
          // Accept the file
          callback(null, true);
        } else {
          // Reject the file
          callback(new BadRequestException('只能上传图片'), false);
        }
      },
    }),
  )
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    return file.path;
  }

  @Get('list')
  async list() {
    return this.bookService.list();
  }

  @Get('detail/:id')
  async detail(@Param('id') id: string) {
    return this.bookService.detail(id);
  }
  @Post('create')
  async create(@Body() createBookDto: CreateBookDto) {
    return this.bookService.create(createBookDto);
  }

  @Patch('update/:id')
  async update(@Param('id') id: string, @Body() updateBookDto: UpdateBookDto) {
    return this.bookService.update(id, updateBookDto);
  }
  @Delete('delete/:id')
  async remove(@Param('id') id: string) {
    return this.bookService.remove(id);
  }
}
