export interface HealthStatus {
  status: string;
  timestamp: Date;
}

export const healthService = {
  checkHealth: (): HealthStatus => {
    return {
      status: 'OK',
      timestamp: new Date(),
    };
  },
};
