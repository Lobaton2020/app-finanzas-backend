import { registerAs, ConfigService } from '@nestjs/config'

interface IEnvAppConfig {
    HTTP_PORT: number
};

export type IAppConfig = IEnvAppConfig & ConfigService;

export default registerAs('app', () => ({
    httpPort: process.env.HTTP_PORT || 3000,
}));