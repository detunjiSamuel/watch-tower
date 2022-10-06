import Head from "next/head";
import Footer from "../components/Footer";

import { useSession, signIn, signOut } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();
  return (
    <div className="container">
      <Head>
        <title>Next.js Starter!</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <p className="description">
          {!session ? (
            <>
              <p>Not signed in</p>
              <br />
              <button onClick={() => signIn()}>Sign in</button>
            </>
          ) : (
            <div>
              <h4>Signed in as {session.user.name}</h4>
              <button onClick={() => signOut()}>Sign out</button>
            </div>
          )}
        </p>
      </main>

      <Footer />
    </div>
  );
}
