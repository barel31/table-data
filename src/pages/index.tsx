import Table from '@/components/Table';
import { TableProvider } from '@/components/TableProvider';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  return (
    <main
      className={`min-h-screen items-center justify-between ${inter.className}`}>
      <TableProvider>
        <Table />
      </TableProvider>
    </main>
  );
}
