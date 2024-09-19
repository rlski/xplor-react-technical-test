import Box from "@mui/joy/Box";
import CssBaseline from "@mui/joy/CssBaseline";
import { CssVarsProvider } from "@mui/joy/styles";
import MessagesPane from "./MessagesPane";
import Sidebar from "./Sidebar";
import { useEffect, useMemo, useState } from "react";
import type { Issue, Comment, IssueUser, Event } from "../types/types";
import useFetch from "./useFetch";

function App() {
  const [selectedIssue, setSelectedIssue] = useState<Issue["number"] | null>(null);
  const issue = useFetch<Issue>(
    { url: `https://api.github.com/repos/facebook/react/issues/${selectedIssue}` },
    { enabled: selectedIssue !== null },
  );
  const comments = useFetch<Comment[]>({ url: issue.data?.comments_url }, { enabled: issue.isFetched });
  const events = useFetch<Event[]>({ url: issue.data?.events_url }, { enabled: issue.isFetched });

  // Gets all comments and event is a chronoligal order timeline. We can distinguish events from comments by the `event` key on events.
  const timeline = useMemo(() => {
    if (!comments.data || !events.data) return [];

    return [...comments.data, ...events.data].sort(
      (a, b) => new Date(a.created_at).valueOf() - new Date(b.created_at).valueOf(),
    );
  }, [comments, events]);

  const [hiddenUsers, setHiddenUsers] = useState<IssueUser["login"][]>([]);

  function toggleUser(user: IssueUser["login"]) {
    setHiddenUsers((hiddenUsers) => {
      if (hiddenUsers.includes(user)) return hiddenUsers.filter((currentUser) => currentUser !== user);
      return [...hiddenUsers, user];
    });
  }

  useEffect(() => {
    setHiddenUsers([]);
  }, [issue?.data?.number]);

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
          <Sidebar
            setSelectedIssue={setSelectedIssue}
            issueUsers={issueUsers}
            hiddenUsers={hiddenUsers}
            toggleUser={toggleUser}
          />
        </Box>
        {issue.data && (
          <Box component="main" sx={{ flex: 1 }}>
            <MessagesPane issue={issue.data} timeline={timeline} hiddenUsers={hiddenUsers} />
          </Box>
        )}
      </Box>
    </CssVarsProvider>
  );
}

export default App;
