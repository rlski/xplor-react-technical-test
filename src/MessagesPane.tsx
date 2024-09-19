import Chip from "@mui/joy/Chip";
import Sheet from "@mui/joy/Sheet";
import Stack from "@mui/joy/Stack";
import Typography from "@mui/joy/Typography";
import ChatBubble from "./ChatBubble";
import type { Issue, Comment, IssueUser } from "../types/types";

type MessagesPaneProps = {
  issue: Issue;
  comments?: Comment[];
  hiddenUsers: IssueUser["login"][];
};

export default function MessagesPane({ issue, comments, hiddenUsers }: MessagesPaneProps) {
  return (
    <Sheet
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "background.level1",
      }}
    >
      {issue && (
        <Stack
          direction="column"
          justifyContent="space-between"
          sx={{
            borderBottom: "1px solid",
            borderColor: "divider",
            backgroundColor: "background.body",
          }}
          py={{ xs: 2, md: 2 }}
          px={{ xs: 1, md: 2 }}
        >
          <Typography
            fontWeight="lg"
            fontSize="lg"
            component="h2"
            noWrap
            endDecorator={
              <Chip
                variant="outlined"
                size="sm"
                color="neutral"
                sx={{
                  borderRadius: "sm",
                }}
              >
                #{issue.number}
              </Chip>
            }
          >
            {issue.title}
          </Typography>
          <Typography level="body-sm">{issue.user.login}</Typography>
        </Stack>
      )}
      {comments && (
        <Stack spacing={2} justifyContent="flex-end" px={2} py={3}>
          <ChatBubble variant="solid" {...issue!} />
          {comments.map((comment) => {
            const isHidden = hiddenUsers.includes(comment.user.login);
            if (isHidden) return null;

            return (
              <ChatBubble
                key={comment.id}
                variant={comment.user.login === issue!.user.login ? "solid" : "outlined"}
                {...comment}
              />
            );
          })}
        </Stack>
      )}
    </Sheet>
  );
}
