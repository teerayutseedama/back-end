import { ApiProperty } from '@nestjs/swagger';

export class CreateTransferItemDto {
  @ApiProperty({
    description: 'The quantity of items',
    minimum: 1,
    example: 5
  })
  qty: number;

  @ApiProperty({
    description: 'The name of the item',
    example: 'Product A'
  })
  itemName: string;
}

export class CreateTransferDto {
  @ApiProperty({
    description: 'The sender of the transfer',
    example: 'user_a'
  })
  from: string;

  @ApiProperty({
    description: 'The receiver of the transfer',
    example: 'user_b'
  })
  to: string;

  @ApiProperty({
    description: 'The amount to transfer',
    minimum: 0,
    example: 1000
  })
  amount: number;

  @ApiProperty({
    description: 'The items included in the transfer',
    type: [CreateTransferItemDto]
  })
  items: CreateTransferItemDto[];
}