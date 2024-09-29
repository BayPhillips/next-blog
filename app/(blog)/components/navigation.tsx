import { SettingsQueryResult } from '@/sanity.types.js';
import Link from "next/link";

export default function Navigation(props: { settings: SettingsQueryResult }) {
  const { settings } = props;
  return (
    <nav className="md:mt-16 mb-8 md:mb-16">
      <ul className="font-medium flex flex-row justify-center md:justify-end">
        {settings?.navigation?.map(item => 
          <li key={item._key} className="ml-8">
            <Link href={item.path || ''}>{item.title || 'title'}</Link>
          </li>
        )}
      </ul>
    </nav>
  );
}