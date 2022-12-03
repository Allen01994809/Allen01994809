import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MiddlewareComponent } from "../utils/applyMiddleware";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const client = new QueryClient();

const ReqctQueryMiddleware: MiddlewareComponent = ({ children }) => {
  return (
    <QueryClientProvider client={client}>
      {children}
      <ReactQueryDevtools />
    </QueryClientProvider>
  )
}

export default ReqctQueryMiddleware;

