import { useEffect, useState } from "react";

export default function useDimentions(
  containerRef: React.RefObject<HTMLElement>,
) {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const currenRef = containerRef.current;

    function getDimensions() {
      return {
        width: currenRef?.offsetWidth || 0,
        height: currenRef?.offsetHeight || 0,
      };
    }

    const resizeObserver = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (entry) {
        setDimensions(getDimensions());
      }
    });

    if (currenRef) {
      resizeObserver.observe(currenRef);
      setDimensions(getDimensions());
    }
    return () => {
      if (currenRef) {
        resizeObserver.unobserve(currenRef);
      }
      resizeObserver.disconnect();
    };
  }, [containerRef]);

  return dimensions;
}
