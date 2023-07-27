import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <main>
      Home!
      <Link href="yoyo">Go Yoyo</Link>
      <Link href="/dynamic/test">Go Dynamic</Link>
    </main>
  );
}
