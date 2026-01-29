import { NextRequest, NextResponse } from 'next/server';

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const GITHUB_API = 'https://api.github.com';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const owner = searchParams.get('owner');
    const repo = searchParams.get('repo');
    const path = searchParams.get('path') || '';
    const ref = searchParams.get('ref') || 'main';

    if (!owner || !repo) {
      return NextResponse.json(
        { success: false, error: 'Owner and repo parameters are required' },
        { status: 400 }
      );
    }

    const headers: HeadersInit = {
      'Accept': 'application/vnd.github.v3+json',
    };

    if (GITHUB_TOKEN) {
      headers['Authorization'] = `token ${GITHUB_TOKEN}`;
    }

    const url = `${GITHUB_API}/repos/${owner}/${repo}/contents/${path}?ref=${ref}`;
    const response = await fetch(url, { headers });

    if (!response.ok) {
      return NextResponse.json(
        { success: false, error: 'Content not found' },
        { status: 404 }
      );
    }

    const data = await response.json();

    // Если это файл, декодируем содержимое
    if (!Array.isArray(data) && data.content) {
      const content = Buffer.from(data.content, 'base64').toString('utf-8');
      return NextResponse.json({
        success: true,
        data: {
          type: 'file',
          name: data.name,
          path: data.path,
          content,
          size: data.size,
          url: data.html_url,
          downloadUrl: data.download_url
        }
      });
    }

    // Если это директория, возвращаем список файлов
    if (Array.isArray(data)) {
      return NextResponse.json({
        success: true,
        data: {
          type: 'directory',
          path,
          items: data.map((item: any) => ({
            name: item.name,
            path: item.path,
            type: item.type,
            size: item.size,
            url: item.html_url
          }))
        }
      });
    }

    return NextResponse.json({
      success: false,
      error: 'Unknown content type'
    }, { status: 400 });

  } catch (error) {
    console.error('GitHub API error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch content' },
      { status: 500 }
    );
  }
}
