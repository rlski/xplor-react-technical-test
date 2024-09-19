import Sheet from "@mui/joy/Sheet";
import Select from "@mui/joy/Select";
import Option from "@mui/joy/Option";
import Chip from "@mui/joy/Chip";
import useFetch from "./useFetch";
import type { Issue, IssueUser } from "../types/types";
import { Dispatch } from "react";
import { Typography } from "@mui/joy";

type SidebarProps = {
  setSelectedIssue: Dispatch<Issue["number"] | null>;
  issueUsers: IssueUser[];
};

export default function Sidebar({ setSelectedIssue, issueUsers }: SidebarProps) {
  const issues = useFetch<Issue[]>({ url: "https://api.github.com/repos/facebook/react/issues?per_page=50" });

  return (
    <Sheet
      className="Sidebar"
      sx={{
        position: "sticky",
        transition: "transform 0.4s, width 0.4s",
        height: "100dvh",
        top: 0,
        p: 2,
        flexShrink: 0,
        display: "flex",
        flexDirection: "column",
        gap: 2,
        borderRight: "1px solid",
        borderColor: "divider",
      }}
    >
      <Select
        placeholder="Select an issue"
        onChange={(_, issueNumber: Issue["number"] | null) => setSelectedIssue(issueNumber)}
      >
        {issues?.data?.map((issue) => (
          <Option key={issue.id} value={issue.number}>
            {issue.title}
          </Option>
        ))}
      </Select>

      {issueUsers.length > 0 && (
        <>
          <Typography fontWeight="lg" fontSize="lg" component="h2">
            Issue users
          </Typography>
          {issueUsers.map((user) => (
            <Typography
              key={user.login}
              component="span"
              endDecorator={
                <Chip
                  variant="outlined"
                  size="sm"
                  color="neutral"
                  sx={{
                    borderRadius: "sm",
                  }}
                >
                  {user.commentsCount}
                </Chip>
              }
            >
              {user.login}
            </Typography>
          ))}
        </>
      )}
    </Sheet>
  );
}
