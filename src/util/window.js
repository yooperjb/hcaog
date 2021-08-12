export const useViewPort = () => {
  const { innerWidth: width, innerHeight: height } = window;
  return { width, height };
};