import { NextRequest, NextResponse } from 'next/server';

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const GITHUB_API = 'https://api.github.com';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const owner = searchParams.get('owner');
    const repo = searchParams.get('repo');

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

    // Получаем информацию о репозитории
    const repoResponse = await fetch(`${GITHUB_API}/repos/${owner}/${repo}`, { headers });

    if (!repoResponse.ok) {
      return NextResponse.json(
        { success: false, error: 'Repository not found' },
        { status: 404 }
      );
    }

    const repoData = await repoResponse.json();

    // Получаем последние коммиты
    const commitsResponse = await fetch(
      `${GITHUB_API}/repos/${owner}/${repo}/commits?per_page=10`,
      { headers }
    );
    const commitsData = await commitsResponse.json();

    // Получаем ветки
    const branchesResponse = await fetch(
      `${GITHUB_API}/repos/${owner}/${repo}/branches`,
      { headers }
    );
    const branchesData = await branchesResponse.json();

    return NextResponse.json({
      success: true,
      data: {
        name: repoData.name,
        fullName: repoData.full_name,
        description: repoData.description,
        url: repoData.html_url,
        stars: repoData.stargazers_count,
        forks: repoData.forks_count,
        language: repoData.language,
        updatedAt: repoData.updated_at,
        defaultBranch: repoData.default_branch,
        commits: commitsData.slice(0, 10).map((commit: any) => ({
          sha: commit.sha,
          message: commit.commit.message,
          author: commit.commit.author.name,
          date: commit.commit.author.date,
          url: commit.html_url
        })),
        branches: branchesData.map((branch: any) => ({
          name: branch.name,
          protected: branch.protected
        }))
      }
    });
  } catch (error) {
    console.error('GitHub API error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch repository data' },
      { status: 500 }
    );
  }
}
