import Head from 'next/head';
import Link from 'next/link';
import Layout from '../components/layout';
import { getSortedList } from '../lib/posts';
import { getSortedThingList } from '../lib/data-things';

export async function getStaticProps() {
  const allData = await getSortedList();
  const allThingData = await getSortedThingList();
  return {
    props: {
      allData,
      allThingData
    },
    revalidate: 60
  }
}
export default function Home({ allData, allThingData }) {
  return (
      <Layout home>
        <h1>List of Names</h1>
        <div className="list-group">
          {allData.map(({ id, name }) => (
            <Link key={id} href={`/posts/${id}`}>
              <a className="list-group-item list-group-item-action">{name}</a>
            </Link>
          ))}
        </div>
        <h1>List of Things</h1>
        <div className="list-group">
          <a href="https://dev-renee-week14.pantheonsite.io/?book=a-court-of-thorns-and-roses" target="_blank" rel="noopener noreferrer">
          </a>
                    <a href="https://dev-renee-week14.pantheonsite.io/?movie=22" target="_blank" rel="noopener noreferrer">
          </a>
                    <a href="https://dev-renee-week14.pantheonsite.io/?shows=chernobyl" target="_blank" rel="noopener noreferrer">
          </a>
          {allThingData.map(({ id, thing_description }) => (
            <Link key={id} href={`/things/${id}`}>
              <a className="list-group-item list-group-item-action">{thing_description}</a>
            </Link>
          ))}
        </div>
      </Layout>
  );
}