import { Body, Controller, Delete, Get, Post, Put, Query } from '@nestjs/common';
import { Types } from 'mongoose';
import { Test } from 'src/repository/test/test.schema';
import { TestService } from 'src/repository/test/test.service';

@Controller('test')
export class TestController {

    constructor(private readonly testService: TestService) { }

    @Get()
    async getTest(@Query('_id') _id: string) {
        return await this.testService.find(_id ? { _id } : {});
    }

    @Post()
    async postTest(@Body() test: Partial<Test>) {
        return await this.testService.insert(test);
    }

    @Put()
    async putTest(@Query('_id') _id: string, @Body() test: Partial<Test>) {
        return this.testService.update({ _id }, test);
    }

    @Delete()
    async deleteTest(@Query('_id') _id: string) {
        return this.testService.remove({ _id });
    }

}
