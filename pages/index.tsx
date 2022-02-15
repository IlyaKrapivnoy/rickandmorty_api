import type { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import styles from "../styles/Home.module.css";
import { Character, GetCharacterResults } from "../types";
import imageLoader from "../imageLoader";

const Home: NextPage<{ characters: Character[] }> = ({ characters }) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
      </Head>
      NEXT_PUBLIC_DB_CONNECT: {process.env.NEXT_PUBLIC_DB_CONNECT}
      <hr />
      {characters.map((character) => {
        return (
          <div key={character.id}>
            <Link href={`/characters/${character.id}`}>
              <a>
                <h3>{character.name}</h3>
              </a>
            </Link>
            <Image
              src={character.image}
              alt={character.name}
              width="200"
              height="200"
              loader={imageLoader}
              unoptimized
            />
          </div>
        );
      })}
    </div>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const res = await fetch("https://rickandmortyapi.com/api/character");
  const { results }: GetCharacterResults = await res.json();

  return {
    props: {
      characters: results,
    },
  };
};

export default Home;
