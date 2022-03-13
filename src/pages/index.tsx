import { useFormData } from 'hooks/useFormData';
import type { NextPage } from 'next';
import Head from 'next/head';
import { JobForm } from 'components';

export async function getServerSideProps(context: any) {
  const { req, query, res, asPath, pathname } = context;
  // TODO: Don't encode http scheme
  return {
    props: {
      absoluteURL: `http://${req.headers.host}`
    }
  }
}

const App: NextPage = ({ absoluteURL }: any) => {
  const { status, job } = useFormData();

  return (
    <div>
      <Head>
        <title>Frontier Exercise</title>
        <meta name="description" content="" />
      </Head>

      <main>
        {status === 'loading' ?
            <>Loading...</> :
            job ?
              <JobForm 
                absoluteURL={absoluteURL}
                job={job}
              /> :
              <>Loading error...</>
        }
      </main>
    </div>
  );
};

export default App;
