export interface HealthStatus {
  status: string;
  timestamp: string;
}

export const healthService = {
  checkHealth: (): HealthStatus => {
    return {
      status: 'OK',
      timestamp: new Date().toISOString(),
    };
  },
};
