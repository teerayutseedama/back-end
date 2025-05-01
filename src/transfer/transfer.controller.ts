import { Body, Controller, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Transfer, TransferItem } from '../../generated/prisma';
import { CreateTransferDto, CreateTransferItemDto } from './dto/create-transfer.dto';
import { UpdateTransferDto } from './dto/update-transfer.dto';
import { TransferService } from './transfer.service';

@ApiTags('transfers')
@Controller('transfers')
export class TransferController {
    constructor(private readonly transferService: TransferService) {}

    @Post()
    @ApiOperation({ summary: 'Create a new transfer' })
    @ApiResponse({ 
      status: 201, 
      description: 'The transfer has been successfully created.',
    })
    @ApiResponse({ status: 400, description: 'Bad Request.' })
    async createTransfer(
        @Body() createTransferDto: CreateTransferDto
    ): Promise<Transfer & { transferItem: TransferItem[] }> {
        return this.transferService.create(createTransferDto);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Update an existing transfer' })
    @ApiParam({ name: 'id', description: 'Transfer ID' })
    @ApiResponse({ 
      status: 200, 
      description: 'The transfer has been successfully updated.',
    })
    @ApiResponse({ status: 404, description: 'Transfer not found.' })
    async updateTransfer(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateTransferDto: UpdateTransferDto
    ): Promise<Transfer & { transferItem: TransferItem[] }> {
        return this.transferService.update({ id, data: updateTransferDto });
    }

    @Post(':id/items')
    @ApiOperation({ summary: 'Add an item to an existing transfer' })
    @ApiParam({ name: 'id', description: 'Transfer ID' })
    @ApiResponse({ 
      status: 201, 
      description: 'The item has been successfully added to the transfer.',
    })
    @ApiResponse({ status: 404, description: 'Transfer not found.' })
    async addTransferItem(
        @Param('id', ParseIntPipe) transferId: number,
        @Body() item: CreateTransferItemDto
    ): Promise<TransferItem> {
        return this.transferService.addTransferItem({ transferId, item });
    }

   
}
