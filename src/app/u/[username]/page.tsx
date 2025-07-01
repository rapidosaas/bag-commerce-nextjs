import ProfilePage from '@/components/ProfilePage';

export default async function Page({
    params,
  }: Readonly<{
    params: Promise<{ username: string }>
  }>) {

    const username = (await params).username;    

    return (
    <main className="m-auto my-10 flex max-w-5xl flex-col items-center gap-5 px-3 md:flex-row md:items-start">
        <ProfilePage username={username} />
    </main>
    );
}