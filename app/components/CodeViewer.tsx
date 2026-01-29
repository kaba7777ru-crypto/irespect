'use client';

import { useState, useEffect } from 'react';

interface RepoInfo {
  name: string;
  fullName: string;
  description: string;
  url: string;
  stars: number;
  forks: number;
  language: string;
  updatedAt: string;
  commits: Commit[];
  branches: Branch[];
}

interface Commit {
  sha: string;
  message: string;
  author: string;
  date: string;
  url: string;
}

interface Branch {
  name: string;
  protected: boolean;
}

interface FileContent {
  type: 'file';
  name: string;
  path: string;
  content: string;
  size: number;
  url: string;
}

interface DirectoryContent {
  type: 'directory';
  path: string;
  items: DirectoryItem[];
}

interface DirectoryItem {
  name: string;
  path: string;
  type: string;
  size: number;
  url: string;
}

export default function CodeViewer() {
  const [owner, setOwner] = useState('');
  const [repo, setRepo] = useState('');
  const [repoInfo, setRepoInfo] = useState<RepoInfo | null>(null);
  const [currentPath, setCurrentPath] = useState('');
  const [content, setContent] = useState<FileContent | DirectoryContent | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const loadRepo = async () => {
    if (!owner || !repo) {
      setError('Введите owner и repo');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch(`/api/github/repo?owner=${owner}&repo=${repo}`);
      const data = await response.json();

      if (data.success) {
        setRepoInfo(data.data);
        loadContent('');
      } else {
        setError(data.error || 'Ошибка загрузки репозитория');
      }
    } catch (err) {
      setError('Ошибка подключения к API');
    } finally {
      setLoading(false);
    }
  };

  const loadContent = async (path: string) => {
    if (!owner || !repo) return;

    setLoading(true);
    setError('');

    try {
      const response = await fetch(
        `/api/github/contents?owner=${owner}&repo=${repo}&path=${path}`
      );
      const data = await response.json();

      if (data.success) {
        setContent(data.data);
        setCurrentPath(path);
      } else {
        setError(data.error || 'Ошибка загрузки содержимого');
      }
    } catch (err) {
      setError('Ошибка подключения к API');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">GitHub Code Viewer</h2>

        <div className="flex gap-3 mb-4">
          <input
            type="text"
            placeholder="owner (e.g., facebook)"
            value={owner}
            onChange={(e) => setOwner(e.target.value)}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <input
            type="text"
            placeholder="repo (e.g., react)"
            value={repo}
            onChange={(e) => setRepo(e.target.value)}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button
            onClick={loadRepo}
            disabled={loading}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-medium rounded-lg transition-colors"
          >
            {loading ? 'Загрузка...' : 'Загрузить'}
          </button>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
            {error}
          </div>
        )}
      </div>

      {repoInfo && (
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-2xl font-bold text-gray-900">{repoInfo.name}</h3>
              <p className="text-gray-600">{repoInfo.description}</p>
            </div>
            <a
              href={repoInfo.url}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors"
            >
              Открыть на GitHub
            </a>
          </div>

          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-sm text-gray-500">Звезд</p>
              <p className="text-2xl font-bold text-gray-900">{repoInfo.stars}</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-sm text-gray-500">Форков</p>
              <p className="text-2xl font-bold text-gray-900">{repoInfo.forks}</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-sm text-gray-500">Язык</p>
              <p className="text-2xl font-bold text-gray-900">{repoInfo.language}</p>
            </div>
          </div>

          <div className="mb-6">
            <h4 className="text-lg font-bold text-gray-900 mb-3">Последние коммиты</h4>
            <div className="space-y-2">
              {repoInfo.commits.slice(0, 5).map((commit) => (
                <div
                  key={commit.sha}
                  className="bg-gray-50 rounded-lg p-3 hover:bg-gray-100 transition-colors"
                >
                  <p className="text-sm font-medium text-gray-900">{commit.message}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    {commit.author} • {new Date(commit.date).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {content && (
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
          <div className="mb-4">
            <p className="text-sm text-gray-500 mb-2">Путь:</p>
            <p className="font-mono text-sm text-gray-900">
              {currentPath || '/'}
            </p>
          </div>

          {content.type === 'directory' && (
            <div className="space-y-2">
              {content.items.map((item) => (
                <button
                  key={item.path}
                  onClick={() => loadContent(item.path)}
                  className="w-full text-left px-4 py-3 bg-gray-50 hover:bg-blue-50 rounded-lg transition-colors flex items-center gap-3"
                >
                  <span className="text-2xl">
                    {item.type === 'dir' ? '📁' : '📄'}
                  </span>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{item.name}</p>
                    <p className="text-xs text-gray-500">
                      {item.type === 'file' && `${(item.size / 1024).toFixed(2)} KB`}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          )}

          {content.type === 'file' && (
            <div className="border border-gray-200 rounded-lg overflow-hidden">
              <div className="bg-gray-800 text-white px-4 py-2 flex justify-between items-center">
                <span className="font-mono text-sm">{content.name}</span>
                <span className="text-xs text-gray-400">
                  {(content.size / 1024).toFixed(2)} KB
                </span>
              </div>
              <pre className="bg-gray-900 text-gray-100 p-4 overflow-x-auto text-sm">
                <code>{content.content}</code>
              </pre>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
