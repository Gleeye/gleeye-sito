import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const page_slug = searchParams.get('page');

  const query = supabase.from('site_content').select('*').order('section_key').order('field_key');
  if (page_slug) query.eq('page_slug', page_slug);

  const { data, error } = await query;
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { page_slug, section_key, field_key, content } = body;

  const { data, error } = await supabase
    .from('site_content')
    .upsert({ page_slug, section_key, field_key, content }, { onConflict: 'page_slug,section_key,field_key' })
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

export async function DELETE(req: NextRequest) {
  const { id } = await req.json();
  const { error } = await supabase.from('site_content').delete().eq('id', id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
