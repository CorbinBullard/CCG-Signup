import Loader from "./Loader";

export function LoadingItemState(isLoading, isError, event) {
  if (isLoading) return <Loader />;
  // Make Error Page?
  if (isError || !event) return <div>Item not found</div>;
}