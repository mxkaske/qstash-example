export enum Integrations {
  SLACK = "slack",
  DISCORD = "discord",
}

const config = {
  name: "QStash Webhook Bot",
  url: "https://picsum.photos/200", // random image
};

export const notify = (integration: Integrations, text: string) => {
  switch (integration) {
    case Integrations.SLACK:
      return notifySlack(text);
    case Integrations.DISCORD:
      return notifyDiscord(text);
    default:
      const _exhaustiveCheck: never = integration;
      return _exhaustiveCheck;
  }
};

const notifySlack = (text: string) => {
  return fetch(process.env.SLACK_WEBHOOK!, {
    method: "POST",
    // Slack defaults to JSON
    // headers: {
    //   "Content-Type": "application/json",
    // },
    body: JSON.stringify({
      username: config.name,
      icon_url: config.url, // icon_emoji: ":ghost:",
      text,
    }),
  });
};

const notifyDiscord = (content: string) => {
  return fetch(process.env.DISCORD_WEBHOOK!, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: config.name,
      avatar_url: config.url,
      content,
    }),
  });
};
