export type UserRole = 'user' | 'admin_lab';
export type ReportType = 'lost' | 'found';
export type ReportStatus =
  | 'diajukan'
  | 'menunggu_validasi'
  | 'aktif'
  | 'potensi_cocok'
  | 'diklaim'
  | 'dikembalikan'
  | 'ditolak'
  | 'kedaluwarsa';

export type ClaimStatus =
  | 'diajukan'
  | 'menunggu_jawaban'
  | 'ditinjau_admin'
  | 'disetujui'
  | 'diambil'
  | 'ditolak'
  | 'dibatalkan';

export interface CreateReportDTO {
  type: ReportType;
  category: string;
  public_description: string;
  zone_id: string;
  occurred_at: string;
  image_url?: string;
}

export interface AdminValidateFoundDTO {
  report_id: string;
  secret_notes: string;
  custody_code: string;
  verification_question?: string;
}

export interface SubmitClaimDTO {
  match_id: string;
  answer: string;
}

export interface AdminHandoverDTO {
  claim_id: string;
  pickup_code: string;
}
