import { Injectable } from "@nestjs/common";
import { Transfer, TransferItem } from "../../generated/prisma";
import { PrismaService } from "../prisma.service";

@Injectable()
export class TransferService {
    constructor(private prismaService: PrismaService) {}

    async create(data: {
        from: string;
        to: string;
        amount: number;
        items: Array<{
            qty: number;
            itemName: string;
        }>;
    }): Promise<Transfer & { transferItem: TransferItem[] }> {
        const { from, to, amount, items } = data;
        
        return this.prismaService.transfer.create({
            data: {
                from,
                to,
                amount,
                transferItem: {
                    create: items.map(item => ({
                        qty: item.qty,
                        itemName: item.itemName
                    }))
                }
            },
            include: {
                transferItem: true
            }
        });
    }

    async update(params: {
        id: number;
        data: {
            from?: string;
            to?: string;
            amount?: number;
            items?: Array<{
                id?: number;
                qty: number;
                itemName: string;
            }>;
        };
    }): Promise<Transfer & { transferItem: TransferItem[] }> {
        const { id, data } = params;
        const { items, ...transferData } = data;

        // If there are items to update
        if (items && items.length > 0) {
            // Separate items into new and existing based on presence of id
            const newItems = items.filter(item => !item.id);
            const existingItems = items.filter(item => item.id);

            return this.prismaService.transfer.update({
                where: { id },
                data: {
                    ...transferData,
                    transferItem: {
                        // Create new items
                        create: newItems.map(item => ({
                            qty: item.qty,
                            itemName: item.itemName
                        })),
                        // Update existing items
                        update: existingItems.map(item => ({
                            where: { id: item.id },
                            data: {
                                qty: item.qty,
                                itemName: item.itemName
                            }
                        }))
                    }
                },
                include: {
                    transferItem: true
                }
            });
        }

        // If no items to update, just update transfer data
        return this.prismaService.transfer.update({
            where: { id },
            data: transferData,
            include: {
                transferItem: true
            }
        });
    }

  
    async addTransferItem(params: {
        transferId: number;
        item: {
            qty: number;
            itemName: string;
        };
    }): Promise<TransferItem> {
        const { transferId, item } = params;
        return this.prismaService.transferItem.create({
            data: {
                qty: item.qty,
                itemName: item.itemName,
                transferId
            }
        });
    }
}
