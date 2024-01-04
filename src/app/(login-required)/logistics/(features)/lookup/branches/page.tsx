import { getOrder } from '@/actions/order/getOrder';

export default async function BranchesPage() {
    const { data: order } = await getOrder();
    return (
        <div className='p-4'>
            <h1>Branches</h1>
            <pre>{JSON.stringify(order, null, 2)}</pre>
        </div>
    );
}
