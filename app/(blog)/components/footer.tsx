import { SettingsQueryResult } from '@/sanity.types';
import PortableText from "./portable-text";
import { PortableTextBlock } from 'next-sanity';
import Link from 'next/link';

export function Footer(props: { settings: SettingsQueryResult }) {
  const { settings } = props;
  const footer = settings?.footer || [];

  return (
    <footer className="text-white py-12 mt-8 w-full">
      <div className="max-w-screen-2xl mx-auto px-5">
        <div className="text-center">
          <p className="text-sm text-white">
            {footer.length > 0 ? (
              <PortableText value={footer as PortableTextBlock[]} />
            ) : null
            }
          </p>
        </div>
      </div>
    </footer>
  )
}
