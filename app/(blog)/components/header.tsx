import { SettingsQueryResult } from "@/sanity.types";
import Navigation from "./navigation";
import PortableText from "./portable-text";
import Link from "next/link";

function Intro(props: { title: string | null | undefined; description: any }) {
  const title = props.title ;
  const description = props.description;

  return (
    <section className="mbs-16 mbe-8 md:mbe-16 flex flex-col items-left lg:mbe-12 lg:flex-column lg:justify-between">
      <Link href={'/'}>
        <h2 className="font-serif text-balance text-display font-bold leading-tight tracking-tighter">
          {title}
        </h2>
      </Link>
      <h3 className="text-pretty mbs-5 text-start text-lg">
        <PortableText
          className="prose-lg"
          value={description}
        />
      </h3>
    </section>
  );
}

export default function Header(props: { settings: SettingsQueryResult }) {
  const { settings } = props;
  return (
    <div className="flex flex-col md:flex-row justify-between">
      <Intro title={settings?.title} description={settings?.description} />
      <Navigation settings={settings} />
    </div>
  )
}