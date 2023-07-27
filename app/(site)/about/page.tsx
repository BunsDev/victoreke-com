import Image from "next/image";
import { Metadata } from "next";
import { getProfile } from "@/lib/sanity.query";
import type { ProfileType } from "@/types";
import { PortableText } from "@portabletext/react";
import { BiEnvelope, BiFile } from "react-icons/bi";
import { urlFor } from "@/lib/sanity.image";

export const metadata: Metadata = {
  title: "About | Victor Eke",
  metadataBase: new URL("https://victoreke.com/about"),
  description:
    "Learn more about my skills, experience and technical background",
  openGraph: {
    title: "About | Victor Eke",
    url: "https://victoreke.com/about",
    description:
      "Learn more about my skills, experience and technical background",
  },
};

export default async function About() {
  const profile: ProfileType[] = await getProfile();

  return (
    <main className="lg:max-w-7xl mx-auto max-w-3xl md:px-16 px-6">
      {profile &&
        profile.map((data) => (
          <div key={data._id}>
            <section className="grid lg:grid-cols-2 grid-cols-1 gap-x-6 justify-items-center">
              <div className="order-2 lg:order-none">
                <h1 className="lg:text-5xl text-4xl lg:leading-tight basis-1/2 mb-8 font-black font-blender tracking-tight">
                  I&apos;m {data.fullName}. I live in {data.location}, where I
                  build the future.
                </h1>

                <div className="flex flex-col gap-y-3 dark:text-zinc-400 text-zinc-600 leading-relaxed">
                  <PortableText value={data.fullBio} />
                </div>
              </div>

              <div className="flex flex-col lg:justify-self-center justify-self-start gap-y-8 lg:order-1 order-none mb-12">
                <div>
                  <Image
                    className="rounded-2xl mb-4 object-cover max-h-96 min-h-96 bg-top"
                    src={data.profileImage.image}
                    width={400}
                    height={400}
                    quality={100}
                    alt={data.profileImage.alt}
                    placeholder="blur"
                    blurDataURL={urlFor(data.profileImage.image)
                      .width(100)
                      .height(100)
                      .blur(50)
                      .fit("max")
                      .url()}
                  />

                  <a
                    href={`${data.resumeURL}?dl=${data.fullName}_resume`}
                    className="flex items-center justify-center gap-x-2 dark:bg-[#1d1d20] bg-zinc-100 border border-transparent dark:hover:border-zinc-700 hover:border-zinc-200 rounded-md py-2 text-center cursor-cell font-black font-blender"
                  >
                    <BiFile className="text-base" /> Download Resumé
                  </a>
                </div>

                <ul>
                  <li>
                    <a
                      href={`mailto:${data.email}`}
                      className="flex items-center gap-x-2 hover:text-primary-color"
                    >
                      <BiEnvelope className="text-lg" />
                      {data.email}
                    </a>
                  </li>
                </ul>
              </div>
            </section>

            <section className="mt-24 max-w-2xl">
              <h2 className="text-4xl mb-4 font-black font-blender tracking-tight">
                Expertise
              </h2>
              <p className="dark:text-zinc-400 text-zinc-600 max-w-lg">
                I&apos;ve spent over 3 years working on some of my skills. In no
                particular order, they include:
              </p>

              <ul className="flex flex-wrap items-center gap-3 mt-8 font-blender font-medium text-xl tracking-tight">
                {data.skills.map((skill, id) => (
                  <li
                    key={id}
                    className="dark:bg-[#1d1d20] bg-zinc-100 border border-transparent dark:hover:border-zinc-700 hover:border-zinc-200 rounded-md px-2 py-1"
                  >
                    {skill}
                  </li>
                ))}
              </ul>
            </section>
          </div>
        ))}
    </main>
  );
}