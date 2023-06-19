export interface createWorkOrderDto {
    workOrderPriority: string;
    name: string;
    workOrderStatus: string;
    startDate: Date;
    dueDate: Date;
    notes: string;
    lastStatusChangeDate: Date;
    contactId: number;
    jobId: number;
}