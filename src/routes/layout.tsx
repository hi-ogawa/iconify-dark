import { useRouteError } from "react-router-dom";

export function ErrorBoundary() {
  const error = useRouteError();

  return (
    <div className="flex flex-col items-center p-4">
      <div className="flex flex-col gap-3 w-full max-w-2xl">
        <div>
          <a href="/" className="antd-btn antd-btn-default px-2 py-1">
            Back to Home
          </a>
        </div>
        <pre suppressHydrationWarning>
          {error instanceof Error
            ? error.stack ?? error.message
            : JSON.stringify(error, null, 2)}
        </pre>
      </div>
    </div>
  );
}
