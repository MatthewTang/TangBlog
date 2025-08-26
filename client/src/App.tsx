import { Switch, Route } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { PostHogProvider } from "@/components/PostHogProvider";
import Home from "@/pages/home";
import BlogPost from "@/pages/blog-post";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/blog/:slug" component={BlogPost} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <PostHogProvider>
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </PostHogProvider>
    </QueryClientProvider>
  );
}

export default App;
