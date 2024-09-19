import Chip from "@mui/joy/Chip";
import Sheet from "@mui/joy/Sheet";
import Stack from "@mui/joy/Stack";
import Typography from "@mui/joy/Typography";
import ChatBubble from "./ChatBubble";
import type { Issue, IssueUser } from "../types/types";

type MessagesPaneProps = {
  issue: Issue;
  hiddenUsers: IssueUser["login"][];
  timeline: any[];
};

export default function MessagesPane({ issue, hiddenUsers, timeline }: MessagesPaneProps) {
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

      {timeline && (
        <Stack spacing={2} justifyContent="flex-end" px={2} py={3}>
          <ChatBubble variant="solid" {...issue!} />

          {timeline.map((comment) => {
            if (comment.event) {
              return (
                // @TODO Make a component that displays icon and details from the event
                <ChatBubble
                  key={comment.id}
                  variant="outlined"
                  created_at={comment.created_at}
                  body={comment.event}
                  user={comment.actor}
                />
              );
            }

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
