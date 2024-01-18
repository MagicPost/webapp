import WrappedOrderChart from './WrappedOrderChart';
import WrappedKpiCard from './WrappedKpiCard';
import WrappedTopCharts from './WrappedTopCharts';
import {
  CountryPackageStats,
  getCountryPackageStats,
} from '@/actions/statistics/country/getCountryPackageStats';
import {
  LeadingBranches,
  getLeadingBranches,
} from '@/actions/statistics/country/getLeadingBranches';
import { getPackageStatsOfYear } from '@/actions/statistics/country/getPackageStatsOfYear';

export default async function CountryTab() {
  const [kpiRes, leadingBranchesRes, packageOfYearRes] = await Promise.all([
    getCountryPackageStats(),
    getLeadingBranches(),
    getPackageStatsOfYear(),
  ]);

  const kpiData = kpiRes.data as CountryPackageStats;
  const leadingBranchesData = leadingBranchesRes.data as LeadingBranches;
  const packageOfYearData = packageOfYearRes.data as CountryPackageStats;

  return (
    <div className='mt-4 w-full'>
      <WrappedKpiCard data={kpiData} />
      <div className='mt-8 flex w-full flex-col gap-2 md:flex-row'>
        <div className='flex w-full flex-1 flex-col rounded-lg border p-4'>
          <WrappedOrderChart data={packageOfYearData} />
        </div>
        <WrappedTopCharts data={leadingBranchesData} />
      </div>
    </div>
  );
}
