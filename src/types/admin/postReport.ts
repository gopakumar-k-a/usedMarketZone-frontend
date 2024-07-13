import { NormalBackendRes } from "../login";
//post reports
export interface PostReport {
  _id: string;
  reporterId: string;
  reason: string;
  reasonType: string;
  actionTaken: boolean;
  postOwnerId: string;
  postId: string;
  postImageUrl: string[];
  reporterName: string;
  postOwnerName: string;
  postIsBidding: boolean;
  postIsBlocked:boolean;

}

export interface PostReportRes extends NormalBackendRes {
  postReports: PostReport[];
}
