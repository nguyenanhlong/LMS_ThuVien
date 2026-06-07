import { Page } from './sharedScreen';

export default function StatisticsCharts() {
  const bars = [60, 92, 75, 110, 88, 130, 105, 96];

  return (
    <Page title="Bieu do thong ke" description="Truc quan hoa luot muon, sach pho bien va tien phat." crumbs={['Bao cao', 'Bieu do']}>
      <div className="grid grid-cols-1 xl:grid-cols-[1.4fr_0.8fr] gap-6">
        <section className="bg-white rounded-3xl p-6 card-shadow">
          <h2 className="text-lg font-semibold text-slate-950">Luot muon theo tuan</h2>
          <div className="mt-8 h-72 grid grid-cols-8 items-end gap-4">
            {bars.map((bar, index) => (
              <div key={index} className="rounded-t-2xl bg-primary-container/80" style={{ height: `${bar * 0.75}%` }} title={`${bar} luot`} />
            ))}
          </div>
        </section>
        <section className="bg-white rounded-3xl p-6 card-shadow">
          <h2 className="text-lg font-semibold text-slate-950">Co cau the loai</h2>
          {['CNTT 34%', 'Kinh te 22%', 'Van hoc 18%', 'Khac 26%'].map((item) => (
            <div key={item} className="mt-4 rounded-2xl bg-slate-50 p-4 text-sm font-semibold text-slate-800">{item}</div>
          ))}
        </section>
      </div>
    </Page>
  );
}
