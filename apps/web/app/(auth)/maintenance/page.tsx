import { MaintenanceView } from '@/components/maintenance-view';
import { redirect } from 'next/navigation';

export default function MaintenancePage() {
    if (process.env.MAINTENANCE_MODE === 'false') {
        redirect('/chat');
    }
    return <MaintenanceView type="maintenance" />;
}
