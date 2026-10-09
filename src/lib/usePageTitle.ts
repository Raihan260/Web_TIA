import { useEffect } from 'react';

const DEFAULT_TITLE = 'Fathia Kids - Grosir Denim Anak, Gamis Anak & Gamis Dewasa';

// Memberi judul tab/Google yang berbeda untuk tiap halaman.
export function usePageTitle(title?: string) {
  useEffect(() => {
    document.title = title ? `${title} | Fathia Kids` : DEFAULT_TITLE;
    return () => {
      document.title = DEFAULT_TITLE;
    };
  }, [title]);
}
