import { redirect } from 'next/navigation';

import AuthForm from '@/components/auth-form.tsx';
import { AuthMode, queryParamsDefault } from '@/types/home-page-params.ts';

const Home = async (props: PageProps<'/'>): Promise<React.ReactElement> => {
  const { searchParams } = props;
  const query = await searchParams;
  const hasMode = 'authmode' in query ? 'authmode' : redirect(`/${queryParamsDefault}`);
  const authmode: AuthMode = query[hasMode] as AuthMode;

  return (
    <AuthForm authmode={authmode} />
  );
};

export default Home;
