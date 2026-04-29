import Nav from '@/components/layout/Nav';

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-temple-bg">
      <Nav />
      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
        {children}
      </main>
    </div>
  );
}
