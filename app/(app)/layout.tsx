import Nav from '@/components/layout/Nav';

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen">
      <Nav />
      {children}
    </div>
  );
}
