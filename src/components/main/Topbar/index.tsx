import ProfileMenu from '../ProfileMenu';
import SearchBar from '../SearchBar';

export default function Topbar() {
  return (
    <div className='flex h-topbar items-center justify-between border-b-2 px-4'>
      <SearchBar placeholder='Search...' />
      <ProfileMenu />
    </div>
  );
}
