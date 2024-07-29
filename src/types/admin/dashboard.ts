import { NormalBackendRes } from "../login";

export interface AdminStatistics {
  numberOfReports: number;
  numberOfProducts: number;
  numberOfUsers: number;
  numberOfNonBidProducts:number;
  numberOfBidProducts:number;
}

export interface AdminStatisticsRes extends NormalBackendRes{
    statistics:AdminStatistics
}
