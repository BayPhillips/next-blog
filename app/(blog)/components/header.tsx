import { SettingsQueryResult } from "@/sanity.types";
import Navigation from "./navigation";
import PortableText from "./portable-text";

function Intro(props: { title: string | null | undefined; description: any }) {
  const title = props.title ;
  const description = props.description;

  return (
    <section className="mt-16 mb-8 md:mb-16 flex flex-col items-left lg:mb-12 lg:flex-column lg:justify-between">
      <h1 className="font-serif text-balance text-6xl font-bold leading-tight tracking-tighter lg:text-8xl">
        {title}
      </h1>
      <h2 className="text-pretty mt-5 text-left text-lg">
        <PortableText
          className="prose-lg"
          value={description}
        />
      </h2>
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