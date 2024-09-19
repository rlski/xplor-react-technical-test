import Sheet from "@mui/joy/Sheet";
import Select from "@mui/joy/Select";
import Option from "@mui/joy/Option";
import Chip from "@mui/joy/Chip";
import Checkbox from "@mui/joy/Checkbox";
import Typography from "@mui/joy/Typography";
import Avatar from "@mui/joy/Avatar";
import Stack from "@mui/joy/Stack";
import useFetch from "./useFetch";
import type { Issue, IssueUser, User } from "../types/types";
import type { Dispatch } from "react";

type SidebarProps = {
  setSelectedIssue: Dispatch<Issue["number"] | null>;
  issueUsers: IssueUser[];
  hiddenUsers: User["login"][];
  toggleUser: (user: User["login"]) => void;
};

export default function Sidebar({ setSelectedIssue, issueUsers, hiddenUsers, toggleUser }: SidebarProps) {
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
          <Typography
            fontWeight="lg"
            fontSize="xs"
            component="h2"
            textTransform="uppercase"
            sx={{ letterSpacing: 0.3 }}
          >
            Issue users
          </Typography>
          {issueUsers.map((issueUser) => (
            <Checkbox
              key={issueUser.user.login}
              variant="soft"
              size="sm"
              sx={{
                flexDirection: "row-reverse",
                alignItems: "center",
                marginTop: 0.1,
              }}
              checked={!hiddenUsers.includes(issueUser.user.login)}
              onChange={() => toggleUser(issueUser.user.login)}
              label={
                <Stack direction="row" alignItems="center">
                  <Avatar size="sm" variant="solid" src={issueUser.user.avatar_url} sx={{ marginRight: 1 }} />
                  {issueUser.user.login}
                  <Chip
                    variant="outlined"
                    size="sm"
                    color="neutral"
                    sx={{
                      borderRadius: "sm",
                      marginLeft: "auto",
                    }}
                  >
                    {issueUser.commentsCount}
                  </Chip>
                </Stack>
              }
            />
          ))}
        </>
      )}
    </Sheet>
  );
}
