import { PageProps as AppPageProps } from './';
import { route as ziggyRoute } from 'ziggy-js';

declare global {
    /* eslint-disable no-var */
    var route: typeof ziggyRoute;

    interface Window {
        axios: import('axios').AxiosInstance;
    }
}

declare module '@inertiajs/core' {
    interface PageProps extends InertiaPageProps, AppPageProps {}
}
