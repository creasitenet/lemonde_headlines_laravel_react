import { AxiosStatic } from 'axios';

declare global {
    interface Window {
        axios: AxiosStatic;
    }
} 