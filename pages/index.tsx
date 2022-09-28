import Head from "next/head";
import Footer from "../components/Footer";

import { useUser } from "@clerk/nextjs";
export default function Home() {
  const user = useUser();
  console.log(user);
  return (
    <div className="container">
      <Head>
        <title>Next.js Starter!</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <p className="description">
          Get started by editing <code>pages/index.js</code>
        </p>
      </main>

      <Footer />
    </div>
  );
}
