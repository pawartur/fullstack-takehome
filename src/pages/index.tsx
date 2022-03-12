import { useFormData } from 'hooks/useFormData';
import type { NextPage } from 'next';
import Head from 'next/head';
import { JobForm } from 'components';

const App: NextPage = () => {
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
              <JobForm job={job} /> :
              <>Loading error...</>
        }
      </main>
    </div>
  );
};

export default App;
