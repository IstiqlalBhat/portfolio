const getConnection = () => {
    if (typeof navigator === 'undefined') return null;
    return navigator.connection || navigator.mozConnection || navigator.webkitConnection || null;
};

export const getNetworkInfo = () => {
    const connection = getConnection();
    return {
        saveData: Boolean(connection?.saveData),
        effectiveType: connection?.effectiveType,
        downlink: typeof connection?.downlink === 'number' ? connection.downlink : undefined,
        rtt: typeof connection?.rtt === 'number' ? connection.rtt : undefined,
    };
};

export const isSlowNetwork = () => {
    const { saveData, effectiveType, downlink, rtt } = getNetworkInfo();

    if (saveData) return true;
    if (effectiveType === 'slow-2g' || effectiveType === '2g') return true;
    if (typeof downlink === 'number' && downlink > 0 && downlink < 1.5) return true;
    if (typeof rtt === 'number' && rtt > 300) return true;

    return false;
};

export const prefersReducedMotion = () => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

export const getDeviceInfo = () => {
    if (typeof navigator === 'undefined') {
        return { deviceMemory: undefined, hardwareConcurrency: undefined };
    }
    return {
        deviceMemory: typeof navigator.deviceMemory === 'number' ? navigator.deviceMemory : undefined,
        hardwareConcurrency: typeof navigator.hardwareConcurrency === 'number' ? navigator.hardwareConcurrency : undefined,
    };
};

export const getDeviceTier = () => {
    const { deviceMemory, hardwareConcurrency } = getDeviceInfo();

    const isVeryLowMemory = typeof deviceMemory === 'number' && deviceMemory > 0 && deviceMemory <= 2;
    const isLowMemory = typeof deviceMemory === 'number' && deviceMemory > 0 && deviceMemory <= 4;
    const isVeryLowCpu = typeof hardwareConcurrency === 'number' && hardwareConcurrency > 0 && hardwareConcurrency <= 2;
    const isLowCpu = typeof hardwareConcurrency === 'number' && hardwareConcurrency > 0 && hardwareConcurrency <= 4;

    if (isVeryLowMemory || isVeryLowCpu) return 'very-low';
    if (isLowMemory || isLowCpu) return 'low';
    return 'normal';
};

export const shouldPrefetch = () => !isSlowNetwork();

export const shouldEnableWebGL = () => {
    const { saveData } = getNetworkInfo();
    if (prefersReducedMotion()) return false;
    if (saveData) return false;
    return true;
};
