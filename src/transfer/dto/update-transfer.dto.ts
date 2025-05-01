import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateTransferDto, CreateTransferItemDto } from './create-transfer.dto';

export class UpdateTransferItemDto extends CreateTransferItemDto {
  @ApiProperty({
    description: 'The ID of the existing transfer item',
    required: false,
    example: 1
  })
  id?: number;
}

export class UpdateTransferDto extends PartialType(CreateTransferDto) {
  @ApiProperty({
    description: 'The items included in the transfer',
    type: [UpdateTransferItemDto],
    required: false
  })
  items?: UpdateTransferItemDto[];
}