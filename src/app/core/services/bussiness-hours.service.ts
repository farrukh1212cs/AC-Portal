import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class BussinessHoursService {
  constructor() {}

  // Bussiness Hours

  // addBussinessHours(bHours: BussinessHoursDto, id?: number): Observable<any> {
  //   const formData = new FormData();
  //   formData.append('day', bHours?.day?.toString() ?? "");
  //   formData.append('officeStartTime', bHours.officeStartTime?.toString() ?? "");
  //   formData.append('breakStartTime', bHours.breakStartTime?.toString() ?? "");
  //   formData.append('breakEndTime', bHours.breakEndTime?.toString() ?? "");
  //   formData.append('officeEndTime', bHours.officeEndTime?.toString() ?? "");
  //   formData.append('officeLocationId', bHours.officeLocationId?.toString() ?? "0");

  //   if(id?.toString()) {
  //     formData.append('id', id.toString());
  //     return this.http.put<any>(this.baseUrl + "/BussinessHours/Update", formData);
  //   } else {
  //     return this.http.post<any>(this.baseUrl + "/BussinessHours/Add", formData);
  //   }
  // }

  // deleteBussinessHours(id: number) {
  //   return this.http.delete<any>(this.baseUrl + "/BussinessHours/Add?Id=" + id);
  // }

  // getBussinessHoursById(id: number, OfficeLocationId: number) {
  //   return this.http.get<any>(this.baseUrl + "/BussinessHours/GetByid?id=" + id + "&OfficeLocationId=" + OfficeLocationId);
  // }

  // getPagedBussinessHours (pageIndex: number, pageSize: number, BussinessHoursId: number, sort: string, search: string) {
  //   return this.http.get<any>(this.baseUrl + "/BussinessHours/PagedBussinessHours?PageIndex=" + pageIndex + "&PageSize=" + pageSize + "&BussinessHoursId=" + BussinessHoursId + "&Sort=" + sort + "&Search=" + search);
  // }

  // allBussinessHours(OfficeLocationId: number, sort: string, search: string) {
  //   return this.http.get<any>(this.baseUrl + "/BussinessHours/AllBussinessHours?OfficeLocationId=" + OfficeLocationId + "&Sort=" + sort + "&Search=" + search);
  // }
}
