export interface CreateEvetDto {
    eventType?: string;
    eventPriority?: string;
    eventName?: string;
    eventStatus?: string;
    startDate?: Date;
    endDate?: Date;
    estimatedDuration?: string;
    description?: string;
    tags?: string;
    lastStatusChangeDate?: Date;
    jobId?: number;
}