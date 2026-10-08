'use client';
import { SettingsQueryResult } from '@/sanity.types.js';
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navigation(props: { settings: SettingsQueryResult }) {
  const { settings } = props;
  const pathname = usePathname();

  return (
    <nav className="md:mbs-16 mbe-8 md:mbe-16 max-w-xs mx-auto md:mx-0 rounded-sm md:rounded-0 border md:border-0">
      <ul className="font-medium flex flex-row justify-between md:justify-end">
        {settings?.navigation?.map(item => 
          <li key={item._key} className={`md:ms-8 text-center w-24 ${item.path == pathname ? 'bg-accent' : ''}`}>
            <Link href={item.path || ''}>{item.title || 'title'}</Link>
          </li>
        )}
      </ul>
    </nav>
  );
}