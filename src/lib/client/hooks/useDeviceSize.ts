import { useState, useEffect, useCallback } from "react";

// --- BREAKPOINT DEFINITIONS ---
// Define standard Tailwind CSS breakpoints in pixels
const BREAKPOINTS = {
  "2xl": 1536,
  xl: 1280,
  lg: 1024,
  md: 768,
  sm: 640,
  base: 0,
};

// Define the possible device sizes
export type DeviceSize = keyof typeof BREAKPOINTS;

// Mapping sizes to a numerical value for easy comparison
const SIZE_ORDER: Record<DeviceSize, number> = {
  base: 0,
  sm: 1,
  md: 2,
  lg: 3,
  xl: 4,
  "2xl": 5,
};

// New type for the comparison function
export type DeviceSizeComparator = (targetSize: DeviceSize) => boolean;

/**
 * Custom hook to determine the current active Tailwind CSS breakpoint.
 * Returns an object containing the current size and a comparator function.
 * * @returns {{size: DeviceSize, isGreaterOrEqual: DeviceSizeComparator}} The current active breakpoint and a comparison function.
 */
export const useDeviceSize = (): {
  size: DeviceSize;
  isGreaterOrEqual: DeviceSizeComparator;
} => {
  const [deviceSize, setDeviceSize] = useState<DeviceSize>("base");

  // Function to calculate the active breakpoint based on window width
  const calculateDeviceSize = useCallback(() => {
    const width = window.innerWidth;
    let newSize: DeviceSize = "base";

    // Iterate through breakpoints from largest to smallest
    const sortedBreakpoints = Object.entries(BREAKPOINTS).sort(
      ([, a], [, b]) => b - a
    );

    for (const [size, minWidth] of sortedBreakpoints) {
      if (width >= minWidth) {
        newSize = size as DeviceSize;
        break;
      }
    }

    setDeviceSize(newSize);
  }, []);

  // Simple debounce function
  const debounce = (func: () => void, delay: number) => {
    let timeoutId: NodeJS.Timeout;
    return () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(func, delay);
    };
  };

  /**
   * Checks if the current screen size is greater than or equal to the target size.
   */
  const isGreaterOrEqual: DeviceSizeComparator = useCallback(
    (targetSize: DeviceSize): boolean => {
      // Check if both sizes exist in the order map for safety
      if (
        SIZE_ORDER[deviceSize] === undefined ||
        SIZE_ORDER[targetSize] === undefined
      ) {
        console.error(
          `Invalid device size provided to comparator: ${targetSize}`
        );
        return false;
      }
      return SIZE_ORDER[deviceSize] >= SIZE_ORDER[targetSize];
    },
    [deviceSize]
  ); // Dependency on deviceSize ensures it uses the latest value

  useEffect(() => {
    // 1. Set initial size
    calculateDeviceSize();

    // 2. Setup debounced resize listener
    const debouncedHandleResize = debounce(calculateDeviceSize, 150);

    window.addEventListener("resize", debouncedHandleResize);

    // 3. Cleanup listener
    return () => {
      window.removeEventListener("resize", debouncedHandleResize);
    };
  }, [calculateDeviceSize]);

  // Return both the current size and the comparator
  return { size: deviceSize, isGreaterOrEqual };
};

// You would typically export only the hook and the type
// export default useDeviceSize;
