import Head from 'next/head';
import Layout from '../components/layout';
import Date from '../components/date';
import utilStyles from '../styles/utils.module.css';
import { getAllIds, getData } from '../lib/posts';

export async function getStaticProps({ params }) {
  const postData = await getData(params.id);
  return {
    props: {
      postData
    },
  };
}

export async function getStaticPaths() {
  const paths = await getAllIds();
  return {
    paths,
    fallback: false,
  };
}

export default function Entry({ postData }) {
  return (
    <Layout>
      <Head>
        <title>{postData.post_title}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{postData.post_title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={postData.post_date.slice(0, 10)} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: postData.post_content }} />
      </article>
    </Layout>
  );
}