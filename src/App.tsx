import Box from "@mui/joy/Box";
import CssBaseline from "@mui/joy/CssBaseline";
import { CssVarsProvider } from "@mui/joy/styles";
import MessagesPane from "./MessagesPane";
import Sidebar from "./Sidebar";
import { useMemo, useState } from "react";
import type { Issue, Comment, IssueUser } from "../types/types";
import useFetch from "./useFetch";

function App() {
  const [selectedIssue, setSelectedIssue] = useState<Issue["number"] | null>(null);
  const issue = useFetch<Issue>(
    { url: `https://api.github.com/repos/facebook/react/issues/${selectedIssue}` },
    { enabled: selectedIssue !== null },
  );
  const comments = useFetch<Comment[]>({ url: issue.data?.comments_url }, { enabled: issue.isFetched });

  const issueUsers = useMemo(() => {
    if (!comments.data) return [];
    const users: IssueUser[] = [];

    comments.data.forEach((comment) => {
      const userIndex = users.findIndex((user) => user.login === comment.user.login);

      // If user is already in table, increment count
      if (userIndex > -1) {
        return (users[userIndex].commentsCount += 1);
      }

      // Otherwise create it
      users.push({
        login: comment.user.login,
        commentsCount: 1,
      });
    });

    return users;
  }, [comments?.data]);

  return (
    <CssVarsProvider disableTransitionOnChange>
      <CssBaseline />
      <Box sx={{ display: "flex", minHeight: "100dvh" }}>
        <Box component="aside" sx={{ width: 300 }}>
          <Sidebar setSelectedIssue={setSelectedIssue} issueUsers={issueUsers} />
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
