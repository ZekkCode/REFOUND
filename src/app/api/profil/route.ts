import { NextResponse } from 'next/server';
import { supabaseKlien } from '@/pustaka/supabase/klien';

const mockProfilDB = {
  id: 'usr-mhs-current',
  nama: 'Budi Santoso',
  nim: '13519099',
  program_studi: 'Teknik Informatika',
  status_keanggotaan: 'Mahasiswa Aktif',
  email: 'budi.santoso@student.trunojoyo.ac.id',
  telepon: '0812-3456-7890',
  dua_faktor: false,
  fakultas: 'Fakultas Teknik',
  role: 'Mahasiswa',
  lab_affiliation: 'Laboratorium TIF',
};

export async function GET() {
  try {
    const { data: authData } = await supabaseKlien.auth.getUser();
    if (authData?.user) {
      const { data: profilDb, error } = await supabaseKlien
        .from('profil')
        .select('*')
        .eq('id', authData.user.id)
        .single();

      if (!error && profilDb) {
        return NextResponse.json({
          sukses: true,
          sumber_data: 'supabase_live',
          data: {
            id: profilDb.id,
            nama: profilDb.nama,
            nim: profilDb.nim,
            program_studi: profilDb.program_studi,
            status_keanggotaan: 'Mahasiswa Aktif',
            email: authData.user.email,
            telepon: profilDb.nomor_telepon || '0812-3456-7890',
            avatar_url: profilDb.avatar_url,
            fakultas: 'Fakultas Teknik',
            role: 'Mahasiswa',
            lab_affiliation: 'Laboratorium TIF',
          },
        });
      }
    }
  } catch (e) {
    console.warn('Query profil Supabase fallback ke mock:', e);
  }

  return NextResponse.json({
    sukses: true,
    sumber_data: 'fallback_lokal',
    data: mockProfilDB,
  });
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const { data: authData } = await supabaseKlien.auth.getUser();

    if (authData?.user) {
      const payload: any = {};
      if (body.telepon !== undefined) payload.nomor_telepon = body.telepon;
      if (body.nama !== undefined) payload.nama = body.nama;

      const { data: updateRes, error } = await supabaseKlien
        .from('profil')
        .update(payload)
        .eq('id', authData.user.id)
        .select()
        .single();

      if (!error && updateRes) {
        return NextResponse.json({
          sukses: true,
          sumber_data: 'supabase_live',
          pesan: 'Profil berhasil diperbarui di database Supabase.',
          data: {
            ...updateRes,
            fakultas: 'Fakultas Teknik',
            role: 'Mahasiswa',
            lab_affiliation: 'Laboratorium TIF',
          },
        });
      }
    }

    // Fallback update in-memory
    if (body.telepon !== undefined) mockProfilDB.telepon = body.telepon;
    if (body.dua_faktor !== undefined) mockProfilDB.dua_faktor = Boolean(body.dua_faktor);
    if (body.nama !== undefined) mockProfilDB.nama = body.nama;

    return NextResponse.json({
      sukses: true,
      sumber_data: 'fallback_lokal',
      pesan: 'Profil berhasil diperbarui.',
      data: mockProfilDB,
    });
  } catch {
    return NextResponse.json({ sukses: false, error: 'Format JSON request tidak valid.' }, { status: 400 });
  }
}
