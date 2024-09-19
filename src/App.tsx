import Box from "@mui/joy/Box";
import CssBaseline from "@mui/joy/CssBaseline";
import { CssVarsProvider } from "@mui/joy/styles";
import MessagesPane from "./MessagesPane";
import Sidebar from "./Sidebar";
import { useState } from "react";
import type { Issue, Comment } from "../types/types";
import useFetch from "./useFetch";

function App() {
  const [selectedIssue, setSelectedIssue] = useState<Issue["number"] | null>(null);
  const issue = useFetch<Issue>(
    { url: `https://api.github.com/repos/facebook/react/issues/${selectedIssue}` },
    { enabled: selectedIssue !== null },
  );
  const comments = useFetch<Comment[]>({ url: issue.data?.comments_url }, { enabled: issue.isFetched });

  return (
    <CssVarsProvider disableTransitionOnChange>
      <CssBaseline />
      <Box sx={{ display: "flex", minHeight: "100dvh" }}>
        <Box component="aside" sx={{ width: 300 }}>
          <Sidebar setSelectedIssue={setSelectedIssue} />
        </Box>
        {issue.data && (
          <Box component="main" sx={{ flex: 1 }}>
            <MessagesPane issue={issue.data} comments={comments?.data} />
          </Box>
        )}
      </Box>
    </CssVarsProvider>
  );
}

export default App;
