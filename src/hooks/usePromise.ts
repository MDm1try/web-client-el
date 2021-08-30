import { useState, useCallback, useEffect, useRef } from "react";

type UsePromiseResult = {
  data?: any;
  error?: Error;
  isPending: boolean;
  isResolved: boolean;
  isRejected: boolean;
  isSettled: boolean;
};

function usePromise(): [UsePromiseResult, (promise: any) => Promise<any>] {
  const [result, setResult] = useState({
    data: undefined,
    error: undefined,
    isPending: false,
    isResolved: false,
    isRejected: false,
    isSettled: false,
  });

  const hasUnmounted = useRef(false);

  useEffect(
    () => () => {
      hasUnmounted.current = true;
    },
    [],
  );

  const dispatch = useCallback(
    async (promise: Promise<any>) => {
      try {
        setResult({
          data: undefined,
          error: undefined,
          isPending: true,
          isResolved: false,
          isRejected: false,
          isSettled: true,
        });

        const data = await promise;

        if (hasUnmounted.current === false) {
          setResult({
            data,
            error: undefined,
            isPending: false,
            isResolved: true,
            isRejected: false,
            isSettled: true,
          });
        }

        return data;
      } catch (error) {
        if (hasUnmounted.current === false) {
          setResult({
            error,
            data: undefined,
            isPending: false,
            isResolved: false,
            isRejected: true,
            isSettled: true,
          });
        }
      }
    },
    [hasUnmounted],
  );

  return [result, dispatch];
}

export default usePromise;
