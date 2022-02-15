import Image from "next/image";
import imageLoader from "../../imageLoader";
import { useRouter } from "next/router";
import { Character } from "../../types";
import { GetServerSideProps } from "next";

function CharacterPage({ character }: { character: Character }) {
  const router = useRouter();
  console.log(router.query.id);
  return (
    <div>
      <h1>{character.name}</h1>
      <p>Gender: {character.gender}</p>
      <p>Location: {character.location.name}</p>
      <p>Species: {character.species}</p>
      <p>Status: {character.status}</p>

      <Image
        loader={imageLoader}
        unoptimized
        src={character.image}
        alt={character.name}
        width="200px"
        height="200px"
      />
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const res = await fetch(
    `https://rickandmortyapi.com/api/character/${context.query.id}`
  );
  const character = await res.json();

  return {
    props: {
      character,
    },
  };
};

export default CharacterPage;
